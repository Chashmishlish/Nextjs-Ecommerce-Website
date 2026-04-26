import axios from 'axios'
import React from 'react'
import ProductDetails from '@/app/(root)/(website)/product/[slug]/ProductDetails'
import { headers } from 'next/headers'

const ProductPage = async ({ params, searchParams }) => {
    const { slug } = await params
    const { color, size } = await searchParams

    const requestHeaders = await headers()
    const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host')
    const protocol = requestHeaders.get('x-forwarded-proto') || 'https'
    const fallbackApiBaseUrl = host ? `${protocol}://${host}/api` : 'http://localhost:3000/api'
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') || fallbackApiBaseUrl

    let url = `${apiBaseUrl}/product/details/${slug}`

    if (color && size) {
        url += `?color=${color}&size=${size}`
    }

    try {
        const { data: getProduct } = await axios.get(url)

        if (!getProduct.success || !getProduct?.data?.product || !getProduct?.data?.variant) {
            return (
                <div className='flex justify-center items-center py-10 h-[300px]'>
                    <h1 className='text-4xl font-semibold'>Data not found.</h1>
                </div>
            )
        }

        return (
            <ProductDetails
                product={getProduct?.data?.product}
                variant={getProduct?.data?.variant}
                colors={getProduct?.data?.colors}
                sizes={getProduct?.data?.sizes}
                reviewCount={getProduct?.data?.reviewCount}
            />
        )
    } catch (error) {
        return (
            <div className='flex justify-center items-center py-10 h-[300px]'>
                <h1 className='text-4xl font-semibold'>Data not found.</h1>
            </div>
        )
    }
}

export default ProductPage