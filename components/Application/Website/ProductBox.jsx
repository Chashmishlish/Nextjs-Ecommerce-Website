import Image from 'next/image'
import React from 'react'
import imgPlaceholder from '@/public/assests/images/img-imgPlaceholder/webp'
const ProductBox = ({ product }) => {
    return (
        <div>
            <Image 
            src={product?.media?.secure_url || imgPlaceholder.src }
            width={400}
            height={400}
            alt={product?.media?.alt || product?.name }
            title={product?.media?.title || product?.name }
            />
            <div className='p-3'></div>
            <h4>{product?.name }</h4>
            <p>
                
            </p>
        </div>
    )
}

export default ProductBox
