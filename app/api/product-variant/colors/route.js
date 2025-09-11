import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import ProductVariantModel from "@/models/ProductVariant.model"

export async function GET() {
    try {
        await connectDB()

        const getColor = await ProductVariantModel.distinct('color')


        if (!getColor) {
            return response(false, 404, 'Color not found.')
        }
        return response(true, 200, 'Color found.', getColor)

    } catch (error) {
        return catchError(error)
    }
}

// // code check by gpt
// import { connectDB } from "@/lib/databaseConnection"
// import { catchError, response } from "@/lib/helperFunction"
// import ProductVariantModel from "@/models/ProductVariant.model"

// export async function GET() {
//     try {
//         await connectDB()

//         const getColor = await ProductVariantModel.distinct("color")

//         if (!getColor.length) {
//             return response(false, 404, "Color not found.")
//         }

//         return response(true, 200, "Color found.", getColor)
//     } catch (error) {
//         return catchError(error)
//     }
// }
