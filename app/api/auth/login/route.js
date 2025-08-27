import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import { z } from "zod" ;

export async function POST(request){
    try {
        await connectDB()
        const payload = await request.json()

        const validationSchema = zSchema.pick({
            email: true
        }).extend({
            password: z.string()
        })

        const validatedData = validationSchema.safeParse(payload)
        if(!validatedData.success){
            return response (false, 401, 'Invalid or missing input field.',
                validationSchema.error)
        }
        
        const {email, password}  = validatedData.data

        //get user data
        const getUser = await UserModel.findOne({ deletedAt: null, email }).select("+password")
        if(!getUser){
            return response (false, 400, 'Invalid login credentials.',
                validationSchema.error)
        }

        // resend email verification link only if email is NOT verified
if(!getUser.isEmailVerified) {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY)
    const token = await new SignJWT({userID: getUser._id.toString()})
        .setIssuedAt()
        .setExpirationTime('1h')
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret)

    await sendMail(
        'Email Verification request from Smilish Store',
        email,
        emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
    )

    return response(false, 401, 'Your email is not verified. We have sent a verification link to your registered email address')
}


        // password verification
        const isPasswordVerified = await getUser.comparePassword(password)

        if(!isPasswordVerified){
            return response (false, 400, 'Invalid login credentials.',
                validationSchema.error)
        }



        // OTP generation
        await OTPModel.deleteMany ({ email }) //deleting old ogtp

        const otp = generateOTP()

        // storing otp into database
        const newOtpData = new OTPModel({
            email, otp
        })

        await newOtpData.save()

        //sending onto mail
     const otpemailStatus = await sendMail(
        'Your login verification code', 
        email, 
        otpEmail(otp)
        );

    if(!otpemailStatus.success){
        return response(false, 400, 'Failed to send OTP.')
    }

    return response(true, 200, 'Please verify your device.')

    } catch (error) {
        return catchError(error)
    }
}