import Image from 'next/image'
import React from 'react'
import logo from '@/public/assests/images/logo-bgb.png'
import Link from 'next/link'
import { WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER } from '@/routes/WebsiteRoute'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className='bg-pink-50 border-t'>
      <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 
      gap-10 py-10 lg:px-32 px-4 '>

        <div className='lg:col-span-1 md:col-span-2 col-span-1'>
          <Image
            src={logo}
            width={383}
            height={146}
            alt='logo'
            // lg:w-32 w-24
            className='w-36 mb-2'
          />
          <p className='text-pink-600 text-sm'>
            Smilish is your trusted  destination for quality and
            convenience. From fashion to essentials, we bring
            everything you need right to your doorstep. Shop smart, live better — only at Smilish
          </p>
        </div>

        <div>
          <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Categories </h4>
          <ul>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>T-shirt</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Polo</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Hoodies</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Full Sleeves</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Oversized</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Usefull Links </h4>
          <ul>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_HOME}>Home</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_HOME}>Shop</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_HOME}>About</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>

          </ul>
        </div>

        <div>
          <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Help Center </h4>
          <ul>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>My Account</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Privacy Policy</Link>
            </li>
            <li className='mb-2 text-pink-600'>
              <Link href={WEBSITE_LOGIN}>Terms and Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='text-xl font-bold uppercase mb-5 mt-10'> Contact Us </h4>
          <ul>
            <li className='mb-2 text-pink-600 flex gap-2'>
              <FaLocationDot className='text-primary' size={20} />
              <span className='text-sm'>Karachi, Pakistan</span>
            </li>
            <li className='mb-2 text-pink-600 flex gap-2'>
              <FaPhoneAlt className='text-primary' size={20} />
              <Link href="tel: +92-3350336737"
                className=' hover:text-gray-500 text-sm'>+92-3350336737 </Link>
            </li>
            <li className='mb-2 text-pink-600 flex gap-2'>
              <MdEmail className='text-primary' size={20} />
              <Link href="mailto: salishkhannn@gmail.com"
                className=' hover:text-gray-500 text-sm'>salishkhannn@gmail.com </Link>
            </li>

          </ul>
          <div className='flex gap-5 mt-5'>
            <Link href=''> <FaYoutube className='text-primary' size={20} /> </Link>
            <Link href=''> <RiInstagramFill className='text-primary' size={20} /> </Link>
            <Link href=''>  <FaFacebook className='text-primary' size={20} /> </Link>
            <Link href=''> <FaTwitter className='text-primary' size={20} /> </Link>
            <Link href=''> <IoLogoWhatsapp className='text-primary' size={20} /> </Link>
          </div>
        </div>

      </div>

      <div className='py-5 bg-pink-100'>
        <p className='text-center'>© 2025 Smilish. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
