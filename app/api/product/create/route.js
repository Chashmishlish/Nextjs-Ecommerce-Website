import { isAuthenticated } from "@/lib/authentication"
import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunction"
import { zSchema } from "@/lib/zodSchema"
import ProductModel from "@/models/Product.model"

export async function POST(request) {
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

    const productData = validate.data
    const newProduct = new ProductModel({ 
      name: productData.name,
      slug: productData.slug,
      category: productData.category,
      subCategory: productData.subCategory,
      mrp: productData.mrp,
      sellingPrice: productData.sellingPrice,
      discountPercentage: productData.discountPercentage,
      media: productData.media,
      description: productData.description
    })

    await newProduct.save()
    return response(true, 200, 'Product added successfully.')

  } catch (error) {
    // console.log("PRODUCT SAVE ERROR:", error);
    return catchError(error)

  }
}