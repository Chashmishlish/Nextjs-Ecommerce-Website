import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import { z } from "zod";

function response(success, status, message, data = null) {
  let safeData = data;

  if (data?.issues) {
    safeData = data.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
  }

  return new Response(
    JSON.stringify({ success, status, message, data: safeData }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    console.log("👉 Incoming Payload:", payload);

    const validationSchema = zSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string().min(1, "Password is required."),
      });

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      console.log("❌ Validation Failed:", validatedData.error);
      return response(
        false,
        400,
        "Invalid or missing input field.",
        validatedData.error
      );
    }

    const { email, password } = validatedData.data;
    console.log("👉 Validated Email:", email);
    console.log("👉 Entered Password:", password);

    // get user data
    const getUser = await UserModel.findOne({ email }).select("+password");
    console.log("👉 DB User Found:", getUser);

    if (!getUser) {
      console.log("❌ No user found with this email");
      return response(false, 400, "Invalid login credentials.");
    }

    // resend email verification link if not verified
    if (!getUser.isEmailVerified) {
      console.log("❌ Email not verified for:", getUser.email);
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({ userID: getUser._id.toString() })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail(
        "Email Verification request from Smilish Store",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );
      return response(
        false,
        401,
        "Your email is not verified. We have sent a verification link to your registered email address."
      );
    }

    console.log("👉 Stored Password Hash:", getUser.password);
    const isPasswordVerified = await getUser.comparePassword(password);
    console.log("👉 Password Match Result:", isPasswordVerified);

    if (!isPasswordVerified) {
      console.log("❌ Password did not match");
      return response(false, 400, "Invalid login credentials.");
    }

    // OTP generation
    await OTPModel.deleteMany({ email });
    const otp = generateOTP();
    console.log("👉 Generated OTP:", otp);

    const newOtpData = new OTPModel({ email, otp });
    await newOtpData.save();
    console.log("👉 OTP saved in DB");

    const otpemailStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp)
    );
    console.log("👉 OTP Email Status:", otpemailStatus);

    if (!otpemailStatus.success) {
      await OTPModel.deleteOne({ email, otp });
      console.log("❌ Failed to send OTP, rolling back");
      return response(false, 500, "Failed to send OTP.");
    }

    console.log("✅ Login flow successful, OTP sent");
    return response(
      true,
      200,
      "Please verify your device with the OTP sent to your email.",
      { email }
    );
  } catch (error) {
    console.log("❌ Unexpected Error:", error);
    return catchError(error);
  }
}