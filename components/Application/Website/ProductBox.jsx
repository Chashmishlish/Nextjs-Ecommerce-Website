import Image from 'next/image'
import React from 'react'
import imgPlaceholder from '@/public/assests/images/img-placeholder.webp'
import Link from 'next/link'
const ProductBox = ({ product }) => {
    return (
        // <div className='rounded-lg hover:shadow-lg border overflow-hidden'>   
    <div className='rounded-lg hover:shadow-lg border overflow-hidden hover:bg-primary transition-colors duration-300'>   
        <Link href=''>
            <Image 
            src={product?.media[0]?.secure_url || imgPlaceholder.src }
            width={400}
            height={400}
            alt={product?.media[0]?.alt || product?.name }
            title={product?.media[0]?.title || product?.name }
            className='w-full lg: h-[300px] md:h-[200px] h-[150px] object-cover object-top'
            />
            <div className='p-3 border-t '>
            <h4 className="text-sm font-medium  ">{product?.name }</h4>
            <p  className="flex text-sm  text-right mt-2 mb-2">
                {/* <span className='line-through text-gray-400'>{product?.mrp }</span> */}
                <span className=' font-semibold  '>{product?.sellingPrice.toLocaleString ('en-PK' , {style: 'currency' , currency: 'PKR'}) }</span>
                <span></span>
            </p>
            </div>
        </Link>
    </div>
    )
}

export default ProductBox
