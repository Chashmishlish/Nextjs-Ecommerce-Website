import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: false,
        // required: true,
        unique: true,
        trim: true
    },
    discountPercent:{
        type: Number,
        // required: false,
        // required: true,
        trim: true
    },
    minimumShoppingAmount:{
        type: Number,
        trim: true
    },
    validity:{
        type: Date,
        required: true,
    },
    deletedAt:{
        type: Date,
        default: null, 
        index: true
    },
    
}, { timestamps: true })


const CouponModel = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema, 'coupons')
export default CouponModel
