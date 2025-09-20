// import { connectDB } from "@/lib/databaseConnection";
// import { zSchema } from "@/lib/zodSchema";

// export async function POST(request) {
//   try {
//     console.log("🚀 Request received at backend");

//     await connectDB();

//     const payload = await request.json();
//     console.log("📦 Payload received:", payload);

//     // Validate amount
//     const schema = zSchema.pick({ amount: true });
//     const validate = schema.safeParse(payload);

//     if (!validate.success) {
//       console.log("❌ Validation failed:", validate.error);
//       return new Response(JSON.stringify({
//         success: false,
//         message: "Invalid or missing fields",
//         error: validate.error,
//       }), { status: 400 });
//     }

//     const { amount } = validate.data;

//     // Generate a simple COD order ID
//     const orderId = "COD-" + Date.now();
//     console.log("✅ Generated Order ID:", orderId);

//     return new Response(JSON.stringify({
//       success: true,
//       data: orderId,
//     }), { status: 200 });

//   } catch (error) {
//     console.error("🔥 Backend Error:", error);
//     return new Response(JSON.stringify({
//       success: false,
//       message: error.message,
//     }), { status: 500 });
//   }
// }


import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";

export async function POST(request){
    try {

       console.log("Request received at backend"); // ✅ check request aa rahi hai ya nahi

        await connectDB()
        const payload = await request.json()
        console.log("Payload:", payload); // ✅ dekho amount aa raha hai ya nahi

        const schema = zSchema.pick({
            amount: true,
        })

        const validate = schema.safeParse(payload)
        if(!validate.success){
            return response(false, 400, 'Invalid or missing fields', validate.error)
        }

        const {amount} = validate.data

         // ✅ COD ke liye simple order ID generate karna
        const order_id = "COD-" + Date.now();
        return response(true, 200, "Order ID generated", order_id);


        // for third party 
        // const codInstance = new CodPay({

        // })

        // const codOption = {
        //     amount: Number(amount) * 100,
        //     currency: 'PKR'
        // }

        // const orderDetail = await codInstance.orders.create(codOption)
        // const order_id = orderDetail.id

        // return response(true, 200, 'Order Id generated' , order_id)


    

    } catch (error) {
        return catchError(error)
    }
}