import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";  
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request){
    try {
        await connectDB()
        
        const payload = await request.json()
        const validationSchema = zSchema.pick({ otp: true, email: true })


        const validatedData = validationSchema.safeParse(payload)
        if(!validatedData.success){
            return response (false, 401, 'Invalid or missing input field', validatedData.error)
        }

        const {email, otp} = validatedData.data

        // const getOtpData = await OTPModel.findOne({email, otp})
        // if(!getOtpData){
        //     return response(false, 404, 'Invalid or expired OTP')
        // }
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)  // 10 minutes in milliseconds

        const getOtpData = await OTPModel.findOne({
            email,
            otp,
            createdAt: { $gte: tenMinutesAgo }  // only OTPs created within last 10 minutes
        })

        if (!getOtpData) {
            return response(false, 404, 'Invalid or expired OTP')
        }

        const getUser = await UserModel.findOne({ deletedAt: null, email}).lean()
        if(!getUser){
            return response(false, 404, 'User not found')
        }

        // set login user payload
        const loggedInUserData = {
            _id: getUser._id.toString(), // ensure string
            role: getUser.role,
            name: getUser.name,
            avatar: getUser.avatar,
        };

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT(loggedInUserData)
        .setIssuedAt()
        .setExpirationTime('24h')
        .setProtectedHeader({alg: 'HS256'})
        .sign(secret)

        //set cookie
        const cookieStore = await cookies()

        cookieStore.set({
            name: 'access_token',
            value: token,
            httpOnly: process.env.NODE_ENV === 'production',
            path: '/',
            // secure: false, // local test ke liye
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })

        // remove otp after validation
        await getOtpData.deleteOne()
        return response(true, 200, 'Login successful.' , loggedInUserData)

    } catch (error) {
        return catchError(error)
    }
}

