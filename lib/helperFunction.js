import { NextResponse } from "next/server"

export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({
        success, statusCode, message, data
    })
}

export const catchError = (error, customMessage) => {
    // handling duplicate key error (db k ander ata hai)
    if(error.code === 11000){
        const keys = Object.keys(error.keyPattern).join(',')
        error.message = `Duplicate field: ${keys}. These fields value must be unique`
    }
    
    let errorObj = {}

    if(process.env.NODE_ENV === 'development'){
        errorObj = {
            message: error.message,
            error
        }
    } else {
        errorObj = {
            message: customMessage || 'Internal Server Error.' ,
        }
    }

    return NextResponse.json({
    success: false,
    statusCode: error?.code || 500,
    ...errorObj
});
// return response(false, error.code || 500, errorObj.message, errorObj.error || {})
}

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    return otp
}