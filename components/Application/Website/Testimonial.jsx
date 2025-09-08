'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";

const Testimonial = () => {

    const testimonials = [
  {
    name: "Ayesha Khan",
    review: "I recently purchased from this store and the experience was fantastic. The product quality exceeded my expectations, and the delivery was super fast. I would definitely recommend this store to my friends and family.",
    rating: 5
  },
  {
    name: "Ali Raza",
    review: "At first, I was hesitant to order online, but this website changed my perspective completely. The product was exactly as described, and the packaging was neat and secure. Overall, a wonderful shopping experience.",
    rating: 4
  },
  {
    name: "Fatima Ahmed",
    review: "The customer service was truly impressive. I had some questions before ordering, and they guided me very patiently. The product arrived on time and worked perfectly, just as I expected. Highly satisfied with the service.",
    rating: 5
  },
  {
    name: "Hassan Malik",
    review: "I found the prices to be very reasonable compared to other platforms. The website was easy to navigate and checkout was smooth. The product quality was also up to the mark, which makes me want to shop again.",
    rating: 4
  },
  {
    name: "Sara Iqbal",
    review: "The best part about this store is how reliable they are. My order was delivered earlier than expected, and everything was exactly as shown in the pictures. This level of consistency keeps customers coming back.",
    rating: 5
  },
  {
    name: "Bilal Sheikh",
    review: "I had a small issue with my payment, but the support team resolved it immediately. That really built my trust in the company. The product I received is of great quality, and I’ve already placed my second order.",
    rating: 4
  },
  {
    name: "Mehwish Javed",
    review: "Shopping here felt very convenient and safe. The product descriptions were accurate, and the reviews really helped me choose. The item I bought is working perfectly fine and looks even better in real life.",
    rating: 5
  },
  {
    name: "Usman Tariq",
    review: "This was my first time ordering, and I was pleasantly surprised. The delivery was on time, and the product matched the description completely. The only thing I’d improve is slightly faster customer response time.",
    rating: 3
  },
  {
    name: "Nimra Shah",
    review: "I loved the variety of products available on the website. It was easy to find exactly what I needed. The checkout process was smooth, and the delivery person was very professional. A really good overall experience.",
    rating: 5
  },
  {
    name: "Omar Farooq",
    review: "The product packaging was excellent, ensuring that the item arrived safely. I’ve had bad experiences elsewhere, but here everything went smoothly. I’ll definitely recommend this platform to my colleagues and family.",
    rating: 4
  }
];


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        SlidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    SlidesToScroll: 1,
                    dots: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    SlidesToScroll: 1,
                    dots: false,
                }
            },
        ]
    }

    return (
        <div className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
            <h2 className='text-center font-semibold sm:text-4xl text-2xl mb-5'>CUSTOMER REVIEW</h2>
            <Slider {...settings}>
               {testimonials.map((item, index) => (
                <div key={index}>
                    <p>{item.review}</p>
                    <h4>{item.name}</h4>
                    <div className='flex'>
                        {Array.from({length: item.rating}).map((_, i) => (
                            <FaStar key={`star${i}`} className='text-yellow-400' size={20}/> 
                        ))}
                    </div>
                </div>
               ))}
            </Slider>
        </div>
    )
}

export default Testimonial
