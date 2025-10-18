import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";
import sendMail from "@/lib/sendMail";

export async function PUT(request) {
    try {
          const auth = await isAuthenticated('admin')
                if (!auth.isAuth) {
                    return response(false, 403, 'Unauthorized.')
                }
        await connectDB()
        const {_id, status} = await request.json()

        if (!_id || !status) {
            return response(false, 400, 'Order id and status are required.')
        }

        const orderData = await OrderModel.findById(_id)

        if (!orderData) {
            return response(false, 404, 'Order not found.')
        }

                const oldStatus = orderData.status
                orderData.status = status
                await orderData.save()

                // Send status update email to user (fire-and-forget)
                try {
                        const subject = `Your order ${orderData.order_id} is now ${status}`
                        const html = `
                            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
                                <h2 style="margin:0 0 8px 0">Order Status Updated</h2>
                                <p style="margin:0 0 12px 0">Hello ${orderData.firstName || ''},</p>
                                <p style="margin:0 0 12px 0">Your order <strong>${orderData.order_id}</strong> status has changed from <strong style="text-transform:capitalize">${oldStatus}</strong> to <strong style="text-transform:capitalize">${status}</strong>.</p>
                                <p style="margin:0 0 12px 0">You can view your order details here: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/order-details/${orderData.order_id}">View Order</a></p>
                                ${orderData.couponCode ? `<p style="margin:0 0 12px 0">Coupon used: <strong>${orderData.couponCode}</strong> (saved ${Number(orderData.couponDiscountAmount||0).toLocaleString('en-PK',{style:'currency',currency:'PKR'})})</p>` : ''}
                                <p style="margin-top:16px">Thanks for shopping with us!</p>
                            </div>
                        `
                        await sendMail(subject, orderData.email, html)
                } catch (e) {
                        console.log('Order status email failed:', e?.message)
                }

        return response(true, 200, 'Order status updated successfully.', orderData)


    } catch (error) {
        return catchError(error)
    }
}