import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";
import UserModel from "@/models/user.model";

export async function POST(request) {
  try {
    await connectDB();
    const { token } = await request.json();

    if (!token) {
      return response(false, 400, "Missing token.");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jwtVerify(token, secret);

    // ✅ yahan sahi variable name lo
    const userID = decoded.payload.userID;

    if (!isValidObjectId(userID)) {
      return response(false, 400, "Invalid User ID.");
    }

    const user = await UserModel.findById(userID);
    if (!user) {
      return response(false, 404, "User not found.");
    }

    // Agar already verified hai to dobara update mat karo
    if (user.isEmailVerified) {
      return response(true, 200, "Email already verified.");
    }

    user.isEmailVerified = true;
    await user.save();

    return response(true, 200, "Email Verification Successful.");
  } catch (error) {
    return catchError(error);
  }
}
