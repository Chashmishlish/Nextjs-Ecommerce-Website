import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";

export async function GET(request) {
    try {

        await connectDB()
        const searchParams = request.nextUrl.searchParams;

        // get filters from query params
        const size = searchParams.get('size');
        const color = searchParams.get('color');
        const minPrice = parseInt(searchParams.get('minPrice')) || 0;
        const maxPrice = parseInt(searchParams.get('maxPrice')) || 1000000;
        const categorySlug = searchParams.get('category');
        const search = searchParams.get('q')
