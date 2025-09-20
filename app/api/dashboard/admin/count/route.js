import { isAuthenticated } from "@/lib/authentication"
import { catchError, response } from "@/lib/helperFunction"
import { connectDB } from "@/lib/databaseConnection"
import CategoryModel from "@/models/Category.model"
import ProductModel from "@/models/Product.model"
import UserModel from "@/models/user.model"
import OrderModel from "@/models/Order.model"

export async function GET() {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()

        const [category, product, customer, order] = await Promise.all([
            CategoryModel.countDocuments({ deletedAt: null }),
            ProductModel.countDocuments({ deletedAt: null }),
            UserModel.countDocuments({ deletedAt: null }),
            OrderModel.countDocuments({ deletedAt: null }),
        ])

        return response(true, 200, 'Dashboard count', {
            category,
            product,
            customers: customer,
            order
        })
    } catch (error) {
        return catchError(error)
    }
}
