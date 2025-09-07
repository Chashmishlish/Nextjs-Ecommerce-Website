'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Slide1 from '@/public/assests/images/Slider1.png'
import Slide2 from '@/public/assests/images/Slider2.png'
import Slide3 from '@/public/assests/images/Slider3.png'
import Slide4 from '@/public/assests/images/Slider4.png'
import Image from 'next/image';
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";

const ArrowNext = (props) => {
  const { onClick } = props
  return (
    <button onClick={onClick} type='button' className='w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white right-10'>
      <HiChevronRight size={20} className='text-pink-600'/>
    </button>
  )
}
const ArrowPrev = (props) => {
  const { onClick } = props
  return (
    <button onClick={onClick} type='button' className='w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white left-10'>
      <HiChevronLeft size={20} className='text-pink-600'/>
    </button>
  )
}


const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    slidesToShow: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
       responsive: [
        {
          breakpoint: 480,
          settings: {
            dots: false,
            arrows: false,
            nextArrow: '',
            prevArrow: ''
          }
        }
      ]
  }
 

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Image src={Slide1.src} width={Slide1.width} height={Slide1.height} alt='Slider 1' />
        </div>
        <div>
          <Image src={Slide2.src} width={Slide2.width} height={Slide2.height} alt='Slider 2' />
        </div>
        <div>
          <Image src={Slide3.src} width={Slide3.width} height={Slide3.height} alt='Slider 3' />
        </div>
        <div>
          <Image src={Slide4.src} width={Slide4.width} height={Slide4.height} alt='Slider 4' />
        </div>
      </Slider>
    </div>
  )
}

export default MainSlider
//https://react-slick.neostack.com/
//npm install react-slick --save
//npm install slick-carousel --save