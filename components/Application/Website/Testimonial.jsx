'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";
import { BsChatQuoteFill } from "react-icons/bs";

const Testimonial = () => {

  const testimonials = [
    { name: "Ayesha Khan", review: "I recently purchased from this store and the experience was fantastic. The product quality exceeded my expectations, and the delivery was super fast. I would definitely recommend this store to my friends and family.", rating: 5 },
    { name: "Ali Raza", review: "At first, I was hesitant to order online, but this website changed my perspective completely. The product was exactly as described, and the packaging was neat and secure. Overall, a wonderful shopping experience.", rating: 4 },
    { name: "Fatima Umair", review: "The customer service was truly impressive. I had some questions before ordering, and they guided me very patiently. The product arrived on time and worked perfectly, just as I expected. Highly satisfied.", rating: 5 },
    { name: "Hassan Malik", review: "I found the prices to be very reasonable compared to other platforms. The website was easy to navigate and checkout was smooth. The product quality was also up to the mark, which makes me want to shop again.", rating: 4 },
    { name: "Sara Iqbal", review: "The best part about this store is how reliable they are. My order was delivered earlier than expected, and everything was exactly as shown in the pictures. This level of consistency keeps customers coming back.", rating: 5 },
    { name: "Bilal Sheikh", review: "I had a small issue with my payment, but the support team resolved it immediately. That really built my trust in the company. The product I received is of great quality, and I’ve already placed my second order.", rating: 4 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, dots: false, infinite: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false, centerMode: true } },
    ],

    // Custom dots
    appendDots: dots => (
  <div style={{ padding: "40px 0 0 0" }}> {/* top padding increased to push dots down */}
    <ul style={{ display: "flex", justifyContent: "center", gap: "8px", margin: 0 }}> 
      {dots} 
    </ul>
  </div>
),

    customPaging: i => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#ff5c8d",
          opacity: 0.5,
          transition: "all 0.3s",
        }}
        className="hover:opacity-100"
      ></div>
    ),
  }

  return (
    <div className='lg:px-32 px-4 sm:pt-20 pt-10 pb-10'>
      <h2 className='text-center font-semibold sm:text-4xl text-2xl mb-5'>CUSTOMER REVIEW</h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className='p-4 sm:p-5'>
            <div className="border rounded-lg p-5 flex flex-col justify-between h-full
              transition duration-500 hover:bg-gradient-to-t hover:from-primary hover:via-pink-300 hover:via-primary-100 hover:to-primary-100 hover:border-pink-500">
              <BsChatQuoteFill size={30} className='mb-3' />
              <p className='mb-5'>{item.review}</p>
              <h4 className='font-semibold'>{item.name}</h4>
              <div className='flex mt-1'>
                {Array.from({length: item.rating}).map((_, i) => (
                  <FaStar key={`star${i}`} className='text-yellow-400' size={20}/> 
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Testimonial
