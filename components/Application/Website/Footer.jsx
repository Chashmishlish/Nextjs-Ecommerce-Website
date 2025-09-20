// import Image from 'next/image'
// import React from 'react'
// import logo from '@/public/assests/images/logo-bgb.png'
// import Link from 'next/link'
// import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
// import { FaLocationDot } from "react-icons/fa6";
// import { FaPhoneAlt } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { FaYoutube } from "react-icons/fa";
// import { RiInstagramFill } from "react-icons/ri";
// import { FaFacebook } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { IoLogoWhatsapp } from "react-icons/io";

// const Footer = () => {
//   return (
//     <footer className='bg-pink-50 border-t'>
//       <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 
//       gap-10 py-10 lg:px-32 px-4 '>

//         <div className='lg:col-span-1 md:col-span-2 col-span-1'>
//           <Image
//             src={logo}
//             width={383}
//             height={146}
//             alt='logo'
//             // lg:w-32 w-24
//             className='w-36 mb-2'
//           />
//           <p className='text-pink-600 text-sm'>
//             Smilish is your trusted  destination for quality and
//             convenience. From fashion to essentials, we bring
//             everything you need right to your doorstep. Shop smart, live better — only at Smilish
//           </p>
//         </div>

//         <div>
//           <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Categories </h4>
//           <ul>
//             <li className='mb-2 text-pink-600'>
//               <Link href={`${WEBSITE_SHOP}?category=t-shirts`}>T-shirt</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={`${WEBSITE_SHOP}?category=polo`}>Polo</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={`${WEBSITE_SHOP}?category=hoodies`}>Hoodies</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={`${WEBSITE_SHOP}?category=full-sleeves`}>Full Sleeves</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={`${WEBSITE_SHOP}?category=oversized`}>Oversized</Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Usefull Links </h4>
//           <ul>
//             <li className='mb-2 text-pink-600'>
//               <Link href={WEBSITE_HOME}>Home</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={WEBSITE_SHOP}>Shop</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href="/about-us">About</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={WEBSITE_REGISTER}>Register</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={WEBSITE_LOGIN}>Login</Link>
//             </li>

//           </ul>
//         </div>

//         <div>
//           <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Help Center </h4>
//           <ul>
//             <li className='mb-2 text-pink-600'>
//               <Link href={WEBSITE_REGISTER}>Register</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={WEBSITE_LOGIN}>Login</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href={USER_DASHBOARD}>My Account</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href="/privacy-policy">Privacy Policy</Link>
//             </li>
//             <li className='mb-2 text-pink-600'>
//               <Link href='/terms-and-conditions'>Terms and Conditions</Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Contact Us </h4>
//           <ul>
//             <li className='mb-2 text-pink-600 flex gap-2'>
//               <FaLocationDot className='text-primary' size={20} />
//               <span className='text-sm'>Karachi, Pakistan</span>
//             </li>
//             <li className='mb-2 text-pink-600 flex gap-2'>
//               <FaPhoneAlt className='text-primary' size={20} />
//               <Link href="tel: +92-3350336737"
//                 className=' hover:text-gray-500 text-sm'>+92-3350336737 </Link>
//             </li>
//             <li className='mb-2 text-pink-600 flex gap-2'>
//               <MdEmail className='text-primary' size={20} />
//               <Link href="mailto: salishkhannn@gmail.com"
//                 className=' hover:text-gray-500 text-sm'>salishkhannn@gmail.com </Link>
//             </li>

//           </ul>
//           <div className='flex gap-5 mt-5'>
//             <Link href=''> <FaYoutube className='text-primary' size={20} /> </Link>
//             <Link href=''> <RiInstagramFill className='text-primary' size={20} /> </Link>
//             <Link href=''>  <FaFacebook className='text-primary' size={20} /> </Link>
//             <Link href=''> <FaTwitter className='text-primary' size={20} /> </Link>
//             <Link href=''> <IoLogoWhatsapp className='text-primary' size={20} /> </Link>
//           </div>
//         </div>

//       </div>

//       <div className='py-5 bg-pink-100'>
//         <p className='text-center'>© 2025 Smilish. All Rights Reserved.</p>
//       </div>
//     </footer>
//   )
// }

// export default Footer

'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import logo from '@/public/assests/images/logo-bgb.png'
import Link from 'next/link'
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { FaLocationDot } from 'react-icons/fa6'

const socialIcons = [
  { icon: FaYoutube, url: '' },
  { icon: RiInstagramFill, url: '' },
  { icon: FaFacebook, url: '' },
  { icon: FaTwitter, url: '' },
  { icon: IoLogoWhatsapp, url: '' },
]

const FooterCard = ({ children }) => (
  <motion.div
    className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
)

const Footer = () => {
  return (
    <footer className='bg-pink-50 border-t'>
      <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-8 py-12 lg:px-32 px-6'>

        {/* Logo & Description */}
<FooterCard>
  {/* <motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
>
  <Image src={logo} width={383} height={146} alt='logo' className='w-36 mb-4' />
</motion.div>
 */}


  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
  >
    <Image src={logo} width={383} height={146} alt='logo' className='w-36 mb-4' />
  </motion.div>
  <p className='text-pink-600 text-sm leading-relaxed'>
    Smilish is your trusted destination for quality and convenience. Shop smart, live better — only at Smilish.
  </p>
</FooterCard>

        {/* Categories */}
        <FooterCard>
          <h4 className='text-xl font-bold uppercase mb-5'>Categories</h4>
          <ul className='space-y-3'>
            {['t-shirts','polo','hoodies','full-sleeves','oversized'].map(cat => (
              <li key={cat} className='text-pink-600 hover:text-pink-800 transition-colors duration-300 cursor-pointer'>
                <Link href={`${WEBSITE_SHOP}?category=${cat}`} className='relative group'>
                  {cat.replace('-', ' ').toUpperCase()}
                  <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-600 group-hover:w-full transition-all duration-300'></span>
                </Link>
              </li>
            ))}
          </ul>
        </FooterCard>

        {/* Useful Links */}
        <FooterCard>
          <h4 className='text-xl font-bold uppercase mb-5'>Useful Links</h4>
          <ul className='space-y-3'>
            {[{name:'Home',url:WEBSITE_HOME},{name:'Shop',url:WEBSITE_SHOP},{name:'About',url:'/about-us'},{name:'Register',url:WEBSITE_REGISTER},{name:'Login',url:WEBSITE_LOGIN}]
            .map(link => (
              <li key={link.name} className='text-pink-600 hover:text-pink-800 transition-colors duration-300 cursor-pointer'>
                <Link href={link.url} className='relative group'>
                  {link.name}
                  <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-600 group-hover:w-full transition-all duration-300'></span>
                </Link>
              </li>
            ))}
          </ul>
        </FooterCard>

        {/* Help Center */}
        <FooterCard>
          <h4 className='text-xl font-bold uppercase mb-5'>Help Center</h4>
          <ul className='space-y-3'>
            {[{name:'Register',url:WEBSITE_REGISTER},{name:'Login',url:WEBSITE_LOGIN},{name:'My Account',url:USER_DASHBOARD},{name:'Privacy Policy',url:'/privacy-policy'},{name:'Terms & Conditions',url:'/terms-and-conditions'}]
            .map(link => (
              <li key={link.name} className='text-pink-600 hover:text-pink-800 transition-colors duration-300 cursor-pointer'>
                <Link href={link.url} className='relative group'>
                  {link.name}
                  <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-600 group-hover:w-full transition-all duration-300'></span>
                </Link>
              </li>
            ))}
          </ul>
        </FooterCard>

        {/* Contact */}
        <FooterCard>
          <h4 className='text-xl font-bold uppercase mb-5'>Contact Us</h4>
          <ul className='space-y-4'>
            <li className='flex items-center gap-2 text-pink-600'>
              <FaLocationDot className='text-primary' size={20} />
              <span className='text-sm'>Karachi, Pakistan</span>
            </li>
            <li className='flex items-center gap-2 text-pink-600'>
              <FaPhoneAlt className='text-primary' size={20} />
              <Link href="tel:+923350336737" className='text-sm hover:text-pink-800 transition-colors duration-300'>+92-3350336737</Link>
            </li>
            <li className='flex items-center gap-2 text-pink-600'>
              <MdEmail className='text-primary' size={20} />
              <Link href="mailto:salishkhannn@gmail.com" className='text-sm hover:text-pink-800 transition-colors duration-300'>salishkhannn@gmail.com</Link>
            </li>
          </ul>

          <div className='flex gap-3 mt-6'>
            {socialIcons.map((social,i) => (
              <motion.a 
                key={i} 
                href={social.url} 
                className='w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-primary hover:bg-pink-600 hover:text-white transition-all duration-300'
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <social.icon size={20}/>
              </motion.a>
            ))}
          </div>
        </FooterCard>

      </div>

      <div className='py-5 bg-pink-100'>
        <p className='text-center text-sm text-pink-700'>© 2025 Smilish. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
