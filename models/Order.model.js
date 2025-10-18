
import { orderStatus } from "../lib/utils";
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
lastName: {
 type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
altPhone: {
    type: String,
    required: true
  },
address: {
    type: String,
    required: true
  },
apartment: {
 type: String,
    required: false
  }, 
street:{
  type: String,
    required: false
  }, 
country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: false
  },
  landmark: {
    type: String,
    required: true
  },
  ordernote: {
    type: String,
    required: false
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      mrp: { type: Number, required: true },
      sellingPrice: { type: Number, required: true }
    }
  ],
subTotal: {
  type: Number,
  required: true
},
discount: {
  type: Number,
  required: true
},
couponDiscountAmount: {
  type: Number,
  required: true
},
  // Coupon code applied on this order (if any)
  couponCode: {
    type: String,
    required: false,
    default: null,
    index: true,
  },
totalAmount: {
  type: Number,
  required: true
},
status: {
    type: String,
    enum: orderStatus,
    default: 'pending'
  },
paymentMethod: {
  type: String,
  required: true
},
order_id: {
  type: String,
  required: true
},
deletedAt: {
  type: Date,
default: null,
index: true,
}, 

}, {timestamps: true})
// In dev/hot-reload, ensure latest schema is used
if (mongoose.models.Order) {
  try {
    // Mongoose v7 provides deleteModel on connection
    if (mongoose.connection && typeof mongoose.connection.deleteModel === 'function') {
      mongoose.connection.deleteModel('Order')
    } else {
      // Fallback for older versions
      delete mongoose.models.Order
    }
  } catch (_) {
    // no-op
  }
}

const OrderModel = mongoose.model('Order', orderSchema, 'orders')
export default OrderModel