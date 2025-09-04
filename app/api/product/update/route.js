import { isAuthenticated } from "@/lib/authentication"
import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import { zSchema } from "@/lib/zodSchema"
import ProductModel from "@/models/Product.model"

export async function PUT(request) {
  try {
    const auth = await isAuthenticated('admin')
    if (!auth.isAuth) {
      return response(false, 403, 'Unauthorized.')
    }

    await connectDB()
    const payload = await request.json()
    
    const schema = zSchema.pick({
      name: true,
      slug: true,
      category: true,
      subCategory: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      media: true,
      description: true,
    });

    const validate = schema.safeParse(payload)
    if (!validate.success) {
      return response(false, 400, 'Invalid or missing field.', validate.error)
    }

    const validatedData = validate.data

    const getProduct = await ProductModel.findOne({deletedAt: null, _id })
    if(!getProduct) {
      return response(false, 404, 'Data not found.')
    }


    getProduct.name = validatedData.name
    getProduct.slug = validatedData.slug
    getProduct.category = validatedData.category
    getProduct.subCategory = validatedData.subCategory
    getProduct.mrp = validatedData.mrp
    getProduct.sellingPrice = validatedData.sellingPrice
    getProduct.discountPercentage = validatedData.discountPercentage
    getProduct.media = validatedData.media
    getProduct.description = encode(validatedData.description)

    await getProduct.save()
    return response(true, 200, 'Product Updated successfully.')

  } catch (error) {
    return catchError(error)

  }
}