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

        

        // // pagination
        // const limit = parseInt(searchParams.get('limit')) || 9;
        // const page = parseInt(searchParams.get('page')) || 0;
        // const skip = page * limit;

        // pagination
        const limit = parseInt(searchParams.get('limit')) || 9;
        let page = parseInt(searchParams.get('page')) || 0; // start from 0
        if (page < 0) page = 0; // safeguard (kabhi negative na ho)
        const skip = page * limit;


        // sorting
        const sortOption = searchParams.get('sort') || 'default_sorting';
        let sortquery = {};
        if (sortOption === 'default_sorting') sortquery = { createdAt: -1 };
        if (sortOption === 'asc') sortquery = { name: 1 };
        if (sortOption === 'desc') sortquery = { name: -1 };
        if (sortOption === 'price_low_high') sortquery = { sellingPrice: 1 };
        if (sortOption === 'price_high_low') sortquery = { sellingPrice: -1 };

        // find category by slug
        let categoryId = [];
        if (categorySlug) {
            const slugs = categorySlug.split(",")
            const categoryData = await CategoryModel.find({
                deletedAt: null,
                slug: {$in: slugs},
            }).select('_id').lean();
            categoryId = categoryData.map(category => category._id)
        }

        