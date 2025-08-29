import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { connectDB } from "@/lib/databaseConnection";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/user.model";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().min(4, "OTP must be at least 4 characters"),
});

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    console.log("Received payload:", payload);

    
    // payload could be { email, otp: "123456" }
    // or { email, otp: { otp: "123456", email: "..." } } or even { otp: { otp: "...", email: "..." } }
    const normalized = { email: null, otp: null };

    if (payload) {
      if (payload?.otp && typeof payload.otp === "object" && payload.otp !== null) {
        normalized.email = payload.email ?? payload.otp.email ?? null;
        normalized.otp = String(payload.otp.otp ?? "");
      } else {
        normalized.email = payload.email ?? null;
        normalized.otp = payload.otp != null ? String(payload.otp) : null;
      }
    }

    console.log("Normalized payload:", normalized);

    const parsed = verifySchema.safeParse(normalized);
    if (!parsed.success) {
      console.log("Validation failed:", parsed.error.issues);
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid or missing input field.",
          errors: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, otp } = parsed.data;

    // optional 10-minute guard 
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const otpDoc = await OTPModel.findOne({
      email,
      otp: String(otp),
      createdAt: { $gte: tenMinutesAgo },
    });

    console.log("Found OTP doc:", !!otpDoc);

    if (!otpDoc) {
      return NextResponse.json({ success: false, status: 404, message: "Invalid or expired OTP" }, { status: 404 });
    }

    const user = await UserModel.findOne({ email, deletedAt: null }).lean();
    if (!user) {
      return NextResponse.json({ success: false, status: 404, message: "User not found" }, { status: 404 });
    }

    // const loggedInUserData = {
    //   _id: user._id.toString(),
    //   role: user.role,
    //   name: user.name,
    //   avatar: user.avatar,
    // };

    // const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    // const token = await new SignJWT(loggedInUserData)
    //   .setIssuedAt()
    //   .setExpirationTime("24h")
    //   .setProtectedHeader({ alg: "HS256" })
    //   .sign(secret);

    // // delete otp after successful validation
    // await otpDoc.deleteOne();

    // const res = NextResponse.json(
    //   { success: true, status: 200, message: "Login successful.", data: loggedInUserData },
    //   { status: 200 }
    // );

    // // set cookie on response
    // res.cookies.set("access_token", token, {
    //   httpOnly: process.env.NODE_ENV === "production",
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   sameSite: "lax",
    // });

    // console.log("OTP verified, token set");
    // return res;

    // remove otp after validation
    await otpDoc.deleteOne();

    return NextResponse.json({
    success: true,
    status: 200,
    message: "OTP verified."
    });

  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ success: false, status: 500, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
