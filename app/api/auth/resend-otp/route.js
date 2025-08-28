import { connectDB } from "@/lib/databaseConnection"
import { catchError, response, generateOTP } from "@/lib/helperFunction"
import { zSchema } from "@/lib/zodSchema"
import UserModel from "@/models/user.model"
import OTPModel from "@/models/Otp.model"
import { otpEmail } from "@/email/otpVerificationLink"   // yeh zaroor import karo
import { sendMail } from "@/lib/sendMail"               // sendMail bhi properly import

export async function POST(request) {
    try {
        await connectDB();

        const payload = await request.json();
        const validationSchema = zSchema.pick({ email: true });
        const validatedData = validationSchema.safeParse(payload);

        if (!validatedData.success) {
            return response(false, 401, "Invalid or missing input field", validatedData.error);
        }

        const { email } = validatedData.data;

        const getUser = await UserModel.findOne({ email });
        if (!getUser) {
            return response(false, 404, "User not found.");
        }

        // Purane OTP delete 
        await OTPModel.deleteMany({ email });

        // New OTP generate
        const otp = generateOTP();
        const newOtpData = new OTPModel({
            email,
            otp
        });
        await newOtpData.save();

        //  OTP send via email
        const otpSendStatus = await sendMail(
            "Your login verification code",
            email,
            otpEmail(otp)
        );

        if (!otpSendStatus.success) {
            return response(false, 400, "Failed to resend OTP.");
        }

        return response(true, 200, "OTP generated and sent successfully.");
    } catch (error) {
        return catchError(error);
    }
}
