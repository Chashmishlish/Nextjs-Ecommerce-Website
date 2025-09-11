import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";

export async function GET(request) {
    try {

        await connectDB()
        const searchParams = request.nextUrl.searchParams;

     