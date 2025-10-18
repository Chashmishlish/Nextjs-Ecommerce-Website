import { NextResponse } from "next/server";
import { orderNotification } from "@/email/orderNotification";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import sendMail from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OrderModel from '@/models/Order.model'
import z from "zod";
import mongoose from "mongoose";
// import mongoose from "mongoose"; // ✅ added for ObjectId conversion


export async function POST(request){
try {
    await connectDB()
    const payload = await request.json();
  // Debug: Trace coupon fields in payload
  console.log("📦 save-order payload: couponCode=", payload?.couponCode, " code=", payload?.code);

// Product data schema
const productSchema = z.object({
  productId: z.string().length(24, 'Invalid product id format'),
  variantId: z.string().length(24, 'Invalid variant id format'),
  name: z.string().min(1),
  qty: z.number().min(1),
  mrp: z.number().optional(),
  sellingPrice: z.number().nonnegative(),
});

// Form data schema
const orderSchema = zSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    altPhone: true,
    address: true,
    apartment: true,
    street: true,
    country: true,
    state: true,
    city: true,
    pincode: true,
    landmark: true,
    ordernote: true,
    paymentMethod: true,
  })
  .extend({
    user_id: z.string().optional(),
    subTotal: z.number().nonnegative(),
    discount: z.number().nonnegative(),
    couponDiscountAmount: z.number().nonnegative(),
    couponCode: z.string().optional(),
    // Fallback support if client sends `code` instead of `couponCode`
    code: z.string().optional(),
    totalAmount: z.number().nonnegative(),
    order_id: z.string(),   // 🔥 yeh bhi add karo
    products: z.array(productSchema),
  });

// Validate payload
const validate = orderSchema.safeParse(payload);
if (!validate.success) {
  return response(false, 400, 'Invalid or missing fields.', { error: validate.error });
}

const validatedData = validate.data;
// Debug validated coupon fields post-parse
console.log("🔎 validated: couponCode=", validatedData?.couponCode, " code=", validatedData?.code);
console.log("💡 Received userId:", validatedData.user_id);
//  // ✅ Convert productId & variantId to ObjectId before saving
//     const productsWithObjectId = validatedData.products.map(prod => ({
//       productId: mongoose.Types.ObjectId(prod.productId),
//       variantId: mongoose.Types.ObjectId(prod.variantId),
//       name: prod.name,
//       qty: prod.qty,
//       mrp: prod.mrp || 0,
//       sellingPrice: prod.sellingPrice
//     }));

// Create new order
const newOrder = await OrderModel.create({
  // user: validatedData.user_id,
  // user: validatedData.user_id ? new mongoose.Types.ObjectId(validatedData.user_id) : null,
    user: validatedData.user_id ? new mongoose.Types.ObjectId(validatedData.user_id) : undefined,
  firstName: validatedData.firstName,
  lastName: validatedData.lastName,
  email: validatedData.email,
  phone: validatedData.phone,
  altPhone: validatedData.altPhone,
  address: validatedData.address,
  apartment: validatedData.apartment,
  street: validatedData.street,
  country: validatedData.country,
  state: validatedData.state,
  city: validatedData.city,
  pincode: validatedData.pincode,
  landmark: validatedData.landmark,
 ordernote: validatedData.ordernote || '',
   products: validatedData.products,
  subTotal: validatedData.subTotal,
  discount: validatedData.discount,
  couponDiscountAmount: validatedData.couponDiscountAmount,
  couponCode: (
    validatedData?.couponCode ??
    validatedData?.code ??
    payload?.couponCode ??
    payload?.code ??
    null
  ),
  totalAmount: validatedData.totalAmount,
  order_id: validatedData.order_id,
  paymentMethod: validatedData.paymentMethod,
  status: 'pending',
});

// Debug: Confirm what got saved for coupon fields
try {
  console.log("✅ order saved: order_id=", newOrder?.order_id, " couponCode=", newOrder?.couponCode, " couponDiscountAmount=", newOrder?.couponDiscountAmount);
} catch (_) {}

// If couponCode still missing on the document instance, force-set it and verify
try {
  const desiredCode = (
    validatedData?.couponCode ??
    validatedData?.code ??
    payload?.couponCode ??
    payload?.code ??
    null
  )
  if (!newOrder?.couponCode && desiredCode) {
    await OrderModel.updateOne({ _id: newOrder._id }, { $set: { couponCode: desiredCode } })
    const verify = await OrderModel.findById(newOrder._id).select('order_id couponCode couponDiscountAmount').lean()
    console.log('🛠️ couponCode backfilled:', verify)
  }
} catch (e) {
  console.log('⚠️ couponCode backfill error:', e?.message)
}

 // Send order confirmation email
    try {
      const mailData = {
        order_id: validatedData.order_id,
        orderDetailsUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order-details/${validatedData.order_id}`,
      };

      await sendMail(
        "Order placed successfully.",
        validatedData.email,
        orderNotification(mailData)
      );
    } catch (error) {
      return catchError(error);
    }

    // FINAL RESPONSE (important!)
    return NextResponse.json(
      { success: true, message: "Order saved successfully", data: newOrder },
      { status: 200 }
    );
  } catch (error) {
    return catchError(error);
  }
}