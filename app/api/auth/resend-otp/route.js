import { connectDB } from "@/lib/databaseConnection"
import { catchError } from "@/lib/helperFunction"
import { zSchema } from "@/lib/zodSchema"
import UserModel from "@/models/user.model"
import OTPModel from "@/models/Otp.model"
import { response, generateOTP } from "@/lib/helperFunction"  // if generateOTP is there
import sendMail from "@/lib/sendMail"
import { SignJWT, jwtVerify } from "jose";


export async function POST(request){
    try {
        await connectDB()

        const payload = await request.json()
        const validationSchema = zSchema.pick({ email: true })
        const validatedData = validationSchema.safeParse(payload)
        if(!validatedDate.success){
            return response(false, 401, 'Invalid or missing input field', validatedData.error )
        }

        const {email} = validatedData.data

        const getUser = await UserModel.findOne({ email })
        // const getUser = await UserModel.findOne({ email, deletedAt: null })
        if(!getUser){
            return response(false, 404, 'User not found.')
        }


        //remove old otps
        await OTPModel.deleteMany({ email })
        const otp = generateOTP()
        const newOtpData = OTPModel({
            email,
            otp
        });

        await newOtpData.save()
        // return response(true, 200, 'OTP generated and sent successfully.')
        const otpSendStatus = await sendMail('Your login verification code.', email,
            otpEmail(otp))

            if(!otpSendStatus.success){
                return response(false, 400, 'Failed to resend otp.')
            }
            return response(true, 200, 'OTP generated and sent successfully.')
            


    } catch (error) {
        return catchError(error)
    }
}