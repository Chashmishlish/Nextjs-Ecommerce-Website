import { catchError } from "@/lib/helperFunction"
import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/authentication"
import { connectDB } from "@/lib/databaseConnection"
import { response } from "@/lib/helperFunction"
import ProductModel from "@/models/Product.model"


export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()

        const searchParams = request.nextUrl.searchParams

        // Extract query parameters
        const start = parseInt(searchParams.get('start') || 0, 10)
        const size = parseInt(searchParams.get('size') || 10, 10)
        const filters = JSON.parse(searchParams.get('filters') || "[]")
        const globalFilter = searchParams.get('globalFilter') || ""
        const sorting = JSON.parse(searchParams.get('sorting') || "[]")
        const deleteType = searchParams.get('deleteType')

        // Build match query
        let matchQuery = {}
        if (deleteType === 'SD') {
            matchQuery = { deletedAt: null }
        } else if (deleteType === 'PD') {
            matchQuery = { deletedAt: { $ne: null } }
        }

        // Global search
        if (globalFilter) {
            matchQuery["$or"] = [
                { name: { $regex: globalFilter, $options: 'i' } },
                { slug: { $regex: globalFilter, $options: 'i' } },
                { "$categoryData.name": { $regex: globalFilter, $options: 'i' } }, // for searching data in search bar
                {   
                    $expr: {
                        $regexMatch: {
                            input: {$toString: "$mrp"} ,
                            regex: globalFilter,
                            options: "1"
                        }
                    }
                },
                {   
                    $expr: {
                        $regexMatch: {
                            input: {$toString: "$sellingPrice"} ,
                            regex: globalFilter,
                            options: "1"
                        }
                    }
                },
                {   
                    $expr: {
                        $regexMatch: {
                            input: {$toString: "$discountPercentage"} ,
                            regex: globalFilter,
                            options: "1"
                        }
                    }
                },
            ]
        }

        // column filteration
        filters.forEach(filter => {
            if(filter.id === 'mrp' || filter.id === 'sellingPrice' || filter.id === 'discountPercentage'){
                matchQuery[filter.id] = Number(filter.value)
            } else {
                matchQuery[filter.id] = { $regex: filter.value, $options: 'i' }
            }
        });

        // sorting 
        let sortQuery = {}
        sorting.forEach(sort => {
            sortQuery[sort.id] = sort.desc ? -1 : 1
        });

        // Aggregation pipeline
        const aggregatePipeline = [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $unwind: {
                    path: "$categoryData", preserveNullAndEmptyArrays: true
                }
            },
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    mrp: 1,
                    sellingPrice: 1,
                    discountPercentage: 1,
                    category: "$categoryData.name",
                    // subCategory: 1, 
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ]

        // Execute query
        const getProduct = await ProductModel.aggregate(aggregatePipeline)

        // Get total row count
        const totalRowCount = await ProductModel.countDocuments(matchQuery)

        return NextResponse.json({
            success: true,  // product>add>page.jsx => if(getCategory && getCategory.success){...
            data: getProduct,
            meta: { totalRowCount }
        })


    } catch (error) {
        return catchError(error)
    }
}
