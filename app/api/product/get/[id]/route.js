import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import { isValidObjectId } from "mongoose"
import { isAuthenticated } from "@/lib/authentication"
import CategoryModel from "@/models/Category.model"

export async function GET(request, {params}){
    try {

 // Authenticate user (admin only)
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()

        const getParams = await params
        const id = getParams.id;
        // // const id = params.id;
        //  const { id } = await params;
        // console.log("Fetched ID:", id);

        const filter = {
            deletedAt: null 
        }

        if(!isValidObjectId(id)){
            return response (false, 400, 'Invalid Object ID.')
        }

        filter._id = id

        const getCategory = await CategoryModel.findOne(filter).lean()

        
        if(!getCategory){
            return response (false, 404, 'Category not found.')
        }
        return response (true, 200, 'Category found.', getCategory)

    } catch (error) {
        return catchError(error)
    }
}