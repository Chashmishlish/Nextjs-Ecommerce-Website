import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";
import ProductVariantModel from "@/models/ProductVariant.model";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB()
    const auth = await isAuthenticated('user')
    if (!auth.isAuth) {
      return response(false, 401, 'Unauthorized')
    }

    // const userId = auth.userId
    const userId = new mongoose.Types.ObjectId(auth.userId)
    console.log("✅ Authenticated userId:", userId); // <-- server console me dikhega

    // get recent orders
const recentOrders = await OrderModel.find({ user: userId }).populate('products.productId', 'name slug').populate({
  path: 'products.variantId',
  populate: { path: 'media' }
}).limit(5).lean()

console.log("📝 Recent Orders Fetched:", recentOrders); // server console me dekho


// get total order count
const totalOrder = await OrderModel.countDocuments({ user: userId })

return response(true, 200, 'Dashboard info.', { recentOrders, totalOrder })

  } catch (error) {
    return catchError(error)
  }
}