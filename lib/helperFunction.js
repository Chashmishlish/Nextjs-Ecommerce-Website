import { NextResponse } from "next/server"
import { cookies } from 'next/headers'; // ADD THIS
import { jwtVerify } from 'jose';


export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({
        success, statusCode, message, data
    })
}

export const catchError = (error, customMessage) => {
    // handling duplicate key error (db k ander ata hai)
    if (error.code === 11000) {
        const keys = Object.keys(error.keyPattern).join(',')
        error.message = `Duplicate field: ${keys}. These fields value must be unique`
    }

    let errorObj = {}

    if (process.env.NODE_ENV === 'development') {
        errorObj = {
            message: error.message,
            error
        }
    } else {
        errorObj = {
            message: customMessage || 'Internal Server Error.',
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

// to protect user & admin api route

export const isAuthenticated = async (role) => {

    try {
        const cookieStore = await cookies()
        if (!cookieStore.has('access_token')) {
            return {
                isAuth: false
            }
        }

        const access_token = cookieStore.get('access_token')
        const { payload } = await jwtVerify(access_token.value, new TextEncoder().
            encode(process.env.SECRET_KEY))

        if (payload.role !== role) {
            return {
                isAuth: false
            }
        }

        return {
            isAuth: true,
            userId: payload._id
        }

    } catch (error) {

        return {
            isAuth: false,
            error
        }
    }
}

// category
export const columnConfig = (column, isCreatedAt = false, isUpdatedAt = false, isDeletedAt = false) => {
    const newColumn = [...column]

    if (isCreatedAt) {
        newColumn.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            Cell: ({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if (isUpdatedAt) {
        newColumn.push({
            accessorKey: 'updatedAt',
            header: 'Updated At',
            Cell: ({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if (isDeletedAt) {
        newColumn.push({
            accessorKey: 'deletedAt',
            header: 'Deleted At',
            Cell: ({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    return newColumn
}