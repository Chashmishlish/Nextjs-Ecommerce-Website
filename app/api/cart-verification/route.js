import { connectDB } from '@/lib/databaseConnection';
import { catchError, response } from '@/lib/helperFunction';
import ProductVariantModel from '@/models/ProductVariant.model';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // ✅ FIX: body agar array hai to use lo, warna body.data lo
    const payload = Array.isArray(body) ? body : (body.data || []);

    // console.log("🛒 Incoming payload (API):", payload);

    if (!Array.isArray(payload) || payload.length === 0) {
      return response(true, 200, "Cart is empty.", []);
    }

    const verifiedCartData = await Promise.all(
      payload.map(async (cartItem) => {
        if (!cartItem?.variantId) return null;

        const variant = await ProductVariantModel.findById(cartItem.variantId)
          .populate('product')
          .populate('media', 'secure_url')
          .lean();

        if (!variant) return null;

        return {
          productId: variant.product._id,
          variantId: variant._id,
          name: variant.product.name,
          url: variant.product.slug,
          size: variant.size,
          color: variant.color,
          mrp: variant.mrp,
          sellingPrice: variant.sellingPrice,
          media: variant?.media?.[0]?.secure_url || null,
          qty: cartItem.qty, // qty frontend se preserve karo
        };
      })
    );

    const filteredData = verifiedCartData.filter(Boolean);

    // console.log("🛒 Parsed Cart Items:", filteredData);

    return response(true, 200, "Verified Cart Data.", filteredData);
  } catch (error) {
    return catchError(error);
  }
}



// import { connectDB } from '@/lib/databaseConnection';
// import { catchError, response } from '@/lib/helperFunction';
// import ProductVariantModel from '@/models/ProductVariant.model';

// export async function POST(request) {
//   try {
//     await connectDB();
//     const body = await request.json();
//     const payload = body.data || []; // ✅ expecting {data: [...]}

//      console.log("🛒 Incoming payload:", payload);
     
//     if (!Array.isArray(payload) || payload.length === 0) {
//       return response(true, 200, "Cart is empty.", []);
//     }

//     const verifiedCartData = await Promise.all(
//       payload.map(async (cartItem) => {
//         if (!cartItem?.variantId) return null;

//         const variant = await ProductVariantModel.findById(cartItem.variantId)
//           .populate('product')
//           .populate('media', 'secure_url')
//           .lean();

//         if (!variant) return null;

//         return {
//           productId: variant.product._id,
//           variantId: variant._id,
//           name: variant.product.name,
//           url: variant.product.slug,
//           size: variant.size,
//           color: variant.color,
//           mrp: variant.mrp,
//           sellingPrice: variant.sellingPrice,
//           media: variant?.media?.[0]?.secure_url || null,
//           qty: cartItem.qty, // qty frontend se preserve karo
//         };
//       })
//     );

//     const filteredData = verifiedCartData.filter(Boolean);

//     return response(true, 200, "Verified Cart Data.", filteredData);
//   } catch (error) {
//     return catchError(error);
//   }
// }



// // import { connectDB } from '@/lib/databaseConnection';
// // import { catchError, response } from '@/lib/helperFunction';
// // import ProductVariantModel from '@/models/ProductVariant.model';

// // export async function POST(request) {
// //   try {
// //     await connectDB();
// //     const body = await request.json();
// // const payload = Array.isArray(body) ? body : []; // 👈 accept array


// //     console.log("🛒 Incoming payload:", payload);


// //     if (!payload || !Array.isArray(payload) || payload.length === 0) {
// //   return response(true, 200, "Cart is empty.", []);
// // }


// //   const verifiedCartData = await Promise.all(
// //   payload.map(async (cartItem) => {
// //     if (!cartItem?.variantId) return null;

// //     const variant = await ProductVariantModel.findById(cartItem.variantId)
// //       .populate('product')
// //       .populate('media', 'secure_url')
// //       .lean();

// //     if (!variant) return null;

// //     return {
// //       productId: variant.product._id,
// //       variantId: variant._id,
// //       name: variant.product.name,
// //       url: variant.product.slug,
// //       size: variant.size,
// //       color: variant.color,
// //       mrp: variant.mrp,
// //       sellingPrice: variant.sellingPrice,
// //       media: variant?.media[0]?.secure_url || null,
// //       qty: cartItem.qty,
// //     };
// //   })
// // );

// // // null values hata do
// // const filteredData = verifiedCartData.filter(Boolean);

// // if (filteredData.length === 0) {
// //   return response(true, 200, "Cart is empty.", []);
// // }

// // return response(true, 200, "Verified Cart Data.", filteredData);

// //   } catch (error) {
// //     return catchError(error);
// //   }
// // }


// // // By instructor
// // // import { connectDB } from '@/lib/databaseConnection';
// // // import { catchError } from '@/lib/helperFunction';
// // // import ProductVariantModel from '@/models/ProductVariant.model';
// // // import { NextResponse } from 'next/server';

// // // export async function POST(request) {
// // //   try {
// // //     await connectDB();
// // //     // const payload = await request.json();
// // //     const payload = await request.json();
// // //     console.log("Incoming Payload (API):", payload); // <-- yaha lagana hai


// // //     const verifiedCartData = await Promise.all(
// // //       payload.map(async (cartItem) => {
// // //         const variant = await ProductVariantModel.findById(cartItem.variantId).populate('product').populate('media', 'secure_url').lean();
// // //         if (variant) {
// // //           return {
// // //             productId: variant.product._id,
// // //             variantId: variant._id,
// // //             name: variant.product.name,
// // //             url: variant.product.slug,
// // //             size: variant.size,
// // //             color: variant.color,
// // //             mrp: variant.mrp,
// // //             sellingPrice: variant.sellingPrice,
// // //             media: variant?.media?.secure_url,
// // //             qty: cartItem.qty,
// // //           };
// // //         }
// // //                 return null;

// // //       })
// // //     );
// // //         const filteredData = verifiedCartData.filter(Boolean);


// // //     return NextResponse.json({
// // //   success: true,
// // //   statusCode: 200,
// // //   message: 'Verified Cart Data.',
// // //   data: verifiedCartData
// // // });
// // // // return response (true, 200, 'Verified Card Data.' , verifiedCartData )
// // //   } catch (error) {
// // //         console.error("Cart Verification Error:", error);

// // //     return catchError(error);
// // //   }
// // // }
