import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Banner1 from '@/public/assests/images/Slider1.png'
import Banner2 from '@/public/assests/images/Slider4.png'
import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import advertisingBanner from '@/public/assests/images/advertising-banner.png'


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

      <FeaturedProduct/>

      <section className=' sm:pt-20 pt-5 pb-10'>
        <Image 
          src={advertisingBanner.src}
          height={advertisingBanner.height}
          width={advertisingBanner.width}
          alt="Advertisement"
          className="w-full h-auto object-cover"
        />
      </section>
    
    </>
  )
}

export default Home
