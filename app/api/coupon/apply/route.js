import { connectDB } from '@/lib/databaseConnection';
import { catchError, response  } from '@/lib/helperFunction';
import { zSchema } from '@/lib/zodSchema';
import CouponModel from '@/models/Coupon.model';

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json()
    const couponFormSchema = zSchema.pick({
      code: true,
    //   minimumShoppingAmount: true,
    })
    
    const validate = couponFormSchema.safeParse(payload);
if (!validate.success) {
  return response(false, 400, 'Missing or invalid data.', validate.error);
}

// const { code, minimumShoppingAmount } = validate.data;
const { code } = validate.data;
const { subTotal } = payload; // ✅ frontend se sirf subTotal bhejna hai


const couponData = await CouponModel.findOne({ code }).lean();

if (!couponData) {
  return response(false, 400, 'Invalid or expired coupon code.')
}

if (new Date() > couponData.validity) {
  return response(false, 400, 'Coupon code expired.')
}

// 👇 yahan lagao logs
console.log("📦 subTotal (payload se):", subTotal, typeof subTotal);
console.log("🔍 minimumShoppingAmount (DB se):", couponData.minimumShoppingAmount, typeof couponData.minimumShoppingAmount);
console.log("🎯 discountPercent (DB se):", couponData.discountPercent, typeof couponData.discountPercent);

// Discount calculation ke liye
if (subTotal >= couponData.minimumShoppingAmount) {
  const discountAmount = (subTotal * couponData.discountPercent) / 100;
  console.log("💰 Calculated Discount:", discountAmount);

  const finalTotal = subTotal - discountAmount;
  console.log("🧾 Final Total after Discount:", finalTotal);
}


 // ✅ ab DB ki minimumShoppingAmount ke against check hoga
    if (subTotal < couponData.minimumShoppingAmount) {
      return response(
        false,
        400,
        `You need to shop at least Rs ${couponData.minimumShoppingAmount} to use this coupon.`
      );
    }
// if (minimumShoppingAmount < couponData.minimumShoppingAmount) {
//   return response(false, 400, 'In-sufficient shopping amount.')
// }

return response(true, 200, 'Coupon applied successfully.', { discountPercent: couponData.discountPercent })

  } catch (error) {
    return catchError(error);
  }
}