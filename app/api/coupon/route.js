import { catchError } from "@/lib/helperFunction"
import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/authentication"
import { connectDB } from "@/lib/databaseConnection"
import { response } from "@/lib/helperFunction"
import CouponModel from "@/models/Coupon.model"


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
                { code: { $regex: globalFilter, $options: 'i' } },
                
                {   
                    $expr: {
                        $regexMatch: {
                            input: {$toString: "$minimumShoppingAmount"} ,
                            regex: globalFilter,
                            options: '1'
                        }
                    }
                },
                {   
                    $expr: {
                        $regexMatch: {
                            input: {$toString: "$discountPercent"} ,
                            regex: globalFilter,
                            options: '1'
                        }
                    }
                },
            ]
        }

        // column filteration
        filters.forEach(filter => {
            if(filter.id === 'minimumShoppingAmount' || filter.id === 'discountPercent'){
                matchQuery[filter.id] = Number(filter.value)
            } else if (filter.id === 'validity'){
                matchQuery[filter.id] = new Date(filter.value)
            }
            else {
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
           
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    code: 1,
                    minimumShoppingAmount: 1,
                    discountPercent: 1,
                    validity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ]

        // Execute query
        const getProduct = await CouponModel.aggregate(aggregatePipeline)

        // Get total row count
        const totalRowCount = await CouponModel.countDocuments(matchQuery)

        return NextResponse.json({
            success: true,  // coupon>add>page.jsx 
            data: getProduct,
            meta: { totalRowCount }
        })


    } catch (error) {
        return catchError(error)
    }
}
