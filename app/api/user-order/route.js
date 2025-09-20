import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import mongoose from "mongoose";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function GET() {
  try {
    await connectDB()
    const auth = await isAuthenticated('user')
    if (!auth.isAuth) {
      return response(false, 401, 'Unauthorized')
    }

    // const userId = auth.userId
    const userId = new mongoose.Types.ObjectId(auth.userId)

const orders = await OrderModel.find({ user: userId }).populate('products.productId', 'name slug').populate({
  path: 'products.variantId',
  populate: { path: 'media' }
}).lean()

return response(true, 200, 'Order info.', orders )

  } catch (error) {
    return catchError(error)
  }
}