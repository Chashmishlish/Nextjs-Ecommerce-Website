import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const validationSchema = zSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid or Missing Input field", validatedData.error);
    }

    const { firstName, lastName, email, password } = validatedData.data;
    const name = `${firstName} ${lastName}`.trim();

    const checkUser = await UserModel.exists({ email });
    if (checkUser) return response(false, 409, "User already registered.");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new UserModel({ name, email, password });
     await newUser.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userID: newUser._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "Email Verification",
      email,
      emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
    );

    return response(true, 200, "Registration successful, Please verify your email address.");
  } catch (error) {
    return catchError(error);
  }
}