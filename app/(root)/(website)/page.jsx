import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Banner1 from '@/public/assests/images/Slider1.png'
import Banner2 from '@/public/assests/images/Slider4.png'
import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import advertisingBanner from '@/public/assests/images/advertising-banner.png'
import Testimonial from '@/components/Application/Website/Testimonial'
import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";

const Home = () => {
  return (
    <>
      <section>
        <MainSlider />
      </section>
      <section className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
        <div className='grid grid-cols-2 sm:gap-10 gap-2'>

          <div className='border rounded-lg overflow-hidden'>
            <Link href='' >
              <Image src={Banner1.src} width={Banner1.width} height={Banner1.height}
                alt='Banner 1'
                className='transition-all hover:scale-110'
              />
            </Link>
          </div>
          <div className='border rounded-lg overflow-hidden'>
            <Link href=''>
              <Image src={Banner2.src} width={Banner2.width} height={Banner2.height}
                alt='Banner 2'
                className='transition-all hover:scale-110'
              />
            </Link>
          </div>

        </div>
      </section>

      <FeaturedProduct />

      <section className=' sm:pt-20 pt-5 pb-10'>
        <Image
          src={advertisingBanner.src}
          height={advertisingBanner.height}
          width={advertisingBanner.width}
          alt="Advertisement"
          className="w-full h-auto object-cover"
        />
      </section>

      <Testimonial />

      <section className="bg-gradient-to-t from-pink-300 via-pink-200 to-pink-100 lg:px-32 px-4 sm:pt-20 border-t py-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 text-center">


          <div>
            <p className="flex justify-center items-center mb-3">
              <GiReturnArrow size={30} />
            </p>
            <h3 className="mb-3 font-semibold">7-Days Returns</h3>
            <p>Risk-free shopping with easy returns.</p>
          </div>
          <div>
            <p className="flex justify-center items-center mb-3">
              <FaShippingFast size={30} />
            </p>
            <h3 className="mb-3 font-semibold">Free Shipping</h3>
            <p>No extra costs, just the price you see.</p>
          </div>
          <div>
            <p className="flex justify-center items-center mb-3">
              <BiSupport size={30} />
            </p>
            <h3 className="mb-3 font-semibold">24/7 Support</h3>
            <p>24/7 support, always here just for you.</p>
          </div>
          <div>
            <p className="flex justify-center items-center mb-3">
              <TbRosetteDiscountFilled size={30} />
            </p>
            <h3 className="mb-3 font-semibold">Member Discounts</h3>
            <p>Special offers for our loyal customers.</p>
          </div>

        </div>
      </section>

    </>
  )
}

export default Home
