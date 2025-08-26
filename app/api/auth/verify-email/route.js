import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
// import { catchError } from "@/lib/helperFunction";
import { jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";
import UserModel from "@/models/user.model";

export async function POST(request){
    try {
        await connectDB()
        const { token } = await request.json()

        if(!token){
            return response (false, 400, 'Missing token.')
        }
    // const secret = new TextEncoder().encoder(process.env.SECRET_KEY)
       const secret = new TextEncoder().encode(process.env.SECRET_KEY)

        const decoded = await jwtVerify(token, secret)
        // const userId = decoded.payload.userId
        const userId = decoded.payload.userID  
        // console.log({
        // payload: decoded.payload,
        // protectedHeader: decoded.protectedHeader
        // });

        // console.log("Issued At:", new Date(decoded.payload.iat * 1000));
        // console.log("Expires At:", new Date(decoded.payload.exp * 1000));

        // console.log(userId)
        if(!isValidObjectId(userId)){
            return response(false, 400, 'Invalid User ID.') 
        }

        //get user
        const user = await UserModel.findById(userId)
        if(!user){
            return response (false, 404, 'User not found.')
        }

        user.isEmailVerified = true
        await user.save()

        return response (true, 200, 'Email Verification Successful.')


    } catch (error) {
        return catchError(error)
    }
}

