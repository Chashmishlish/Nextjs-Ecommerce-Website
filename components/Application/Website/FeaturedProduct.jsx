import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { MdOutlineDoubleArrow } from "react-icons/md";

const FeaturedProduct = async () => {
    const {data: productData} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`)
    console.log(productData)

    if(!productData) return  null

    return (
        <section className='lg:px-32 px-4 sm:py-10'>

            <div className="flex justify-between items-center mb-5">
                <h2 className="sm:text-4xl text-2xl font-semibold uppercase "> Featured Products </h2>
                <Link href="" className="flex items-center gap-2 underline underline-offset-4 hover:text-primary transition-colors">
                    View All
                    <MdOutlineDoubleArrow size={18} />
                </Link>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2'> 
                {!productData.success && <div className='text-center py-5'>Data not found.</div>}

                {productData.success && productData.data.map((product) => (
                    <div key={product._id}> 
                        {product?.name}
                     </div>
                ))}
            </div>
        </section>
    )
}
export default FeaturedProduct