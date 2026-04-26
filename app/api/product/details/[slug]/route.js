import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import ProductModel from "@/models/Product.model"
import MediaModel from "@/models/Media.model"
import ProductVariantModel from "@/models/ProductVariant.model"
import ReviewModel from "@/models/Review.model"

export async function GET(request, { params }) {
    try {

        await connectDB()

        const getParams = await params;
        const slug = getParams.slug;

        const searchParams = request.nextUrl.searchParams;
        const size = searchParams.get('size');
        const color = searchParams.get('color');

        const filter = {
            deletedAt: null
        }

        if (!slug) {
            return response(false, 404, 'Product not found.');
        }

        filter.slug = slug;

        // get product
        const getProduct = await ProductModel.findOne(filter).populate('media', 'secure_url').lean()

        if (!getProduct) {
            return response(false, 404, 'Product not found.')
        }

        // get product variant
        const variantFilter = {
            product: getProduct._id,
            deletedAt: null
        }

        if (size) {
            variantFilter.size = size
        }
        if (color) {
            variantFilter.color = color
        }

        let variant = await ProductVariantModel.findOne(variantFilter).populate('media', 'secure_url').lean()

        // If a specific color/size combo doesn't exist, fallback to first available variant.
        if (!variant && (size || color)) {
            variant = await ProductVariantModel.findOne({
                product: getProduct._id,
                deletedAt: null
            }).populate('media', 'secure_url').lean()
        }

        if (!variant) {
            return response(false, 404, 'Product not found.')
        }

        // get color and size
        const getColor = await ProductVariantModel.distinct('color', {
            product: getProduct._id,
            deletedAt: null
        })

        // orderwise size {S, M, L, XL, XXL}
        const getSize = await ProductVariantModel.aggregate([
            { $match: { product: getProduct._id, deletedAt: null } },
            { $sort: { _id: 1 } },
            {
                $group: {
                    _id: "$size",
                    first: { $first: "$_id" }
                }
            },
            { $sort: { first: 1 } },
            { $project: { _id: 0, size: "$_id" } }
        ])

        // get review
        const review = await ReviewModel.countDocuments({ product: getProduct._id })

        const productData = {
            product: getProduct,
            variant: variant,
            colors: getColor,
            sizes: getSize.length ? getSize.map(item => item.size) : [],
            reviewCount: review
        }

        return response(true, 200, 'Product data found', productData)


    } catch (error) {
        return catchError(error)
    }
}