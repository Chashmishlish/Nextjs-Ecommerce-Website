import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/databaseConnection";
import UserModel from "@/models/user.model";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, status: 401, message: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const { email, name, image } = session.user;

    let user = await UserModel.findOne({ email, deletedAt: null });

    if (!user) {
      // Create minimal user for SSO sign-in
      user = await UserModel.create({
        name: name || email.split("@")[0],
        email,
        // random password; actual value is irrelevant for SSO
        password: Math.random().toString(36).slice(-12),
        isEmailVerified: true,
        avatar: image ? { url: image } : undefined,
      });
    } else {
      // Optionally sync display fields
      const needsUpdate = (name && name !== user.name) || (image && image !== user?.avatar?.url);
      if (needsUpdate) {
        user.name = name || user.name;
        if (image) user.avatar = { ...(user.avatar || {}), url: image };
        await user.save();
      }
    }

    const loggedInUserData = {
      _id: user._id.toString(),
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    };

    // Sign our app cookie
    const { SignJWT } = await import("jose");
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const res = NextResponse.json({ success: true, status: 200, message: "SSO bridged", data: loggedInUserData }, { status: 200 });
    res.cookies.set("access_token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    return res;
  } catch (error) {
    console.error("SSO bridge error:", error);
    return NextResponse.json({ success: false, status: 500, message: "Failed to bridge SSO" }, { status: 500 });
  }
}
