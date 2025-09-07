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


const MainSlider = () => {
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,

    Response: {
      breakpoint: 480,
    }
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
            <Image src={Slide1.src} width={Slide1.width} height={Slide1.height} alt='Slider 1'/>
        </div>
        <div>
            <Image src={Slide2.src} width={Slide2.width} height={Slide2.height} alt='Slider 2'/>
        </div>
        <div>
            <Image src={Slide3.src} width={Slide3.width} height={Slide3.height} alt='Slider 3'/>
        </div>
        <div>
            <Image src={Slide4.src} width={Slide4.width} height={Slide4.height} alt='Slider 4'/>
        </div>
      </Slider>
    </div>
  )
}

export default MainSlider
//https://react-slick.neostack.com/
//npm install react-slick --save
//npm install slick-carousel --save