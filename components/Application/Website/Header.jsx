'use client'
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { MdAccountBox } from "react-icons/md";
import logo from '@/public/assests/images/logo-bgb.png'
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import userIcon from '@/public/assests/images/user.png'
import { IoMdCloseCircle } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import Search from './Search'

const Header = () => {
    const auth = useSelector(store => store.authStore.auth)
    const [isMobileMenu, setIsMobileMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className='bg-white border-b lg:px-32 px-4'>
            <div className='flex justify-between items-center lg:py-5 py-3'>
                <Link href={WEBSITE_HOME}>
                    <Image
                        src={logo}
                        width={383}
                        height={146}
                        alt='logo'
                        className='lg:w-32 w-24'
                    />
                </Link>

                <div className='flex justify-between gap-20'>
                    <nav className={`lg:relative lg:w-auto lg:h-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0 w-full h-screen transition-all duration-300 ease-in-out ${isMobileMenu ? 'left-0' : '-left-full'}`}>

                        <div className='lg:hidden flex justify-between items-center bg-pink-50 py-3 border-b px-3'>
                            <Image
                                src={logo}
                                width={383}
                                height={146}
                                alt='logo'
                                className='lg:w-32 w-24'
                            />

                            <button type='button' onClick={() => setIsMobileMenu(false)}>
                            <IoMdCloseCircle size={25} className='text-gray-500 hover:text-primary cursor-pointer'
                            />
                            </button>

                        </div>

                        <ul className='lg:flex justify-between items-center gap-10 px-3'>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>
                                    Home
                                </Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>
                                    About
                                </Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_SHOP} className='block py-2'>
                                    Shop
                                </Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>
                                    T-shirt
                                </Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>
                                    Hoodies
                                </Link>
                            </li>
                            <li className='text-gray-600 hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>
                                    Oversized
                                </Link>
                            </li>
                        </ul>
                    </nav>


                    <div className='flex justify-between items-center gap-8'>
                        <button type='button' onClick={() => setShowSearch(!showSearch)}>
                            <LuSearch
                                className='text-gray-500 hover:text-primary cursor-pointer'
                                size={25}
                            />
                        </button>
                        <Cart />

                        {!auth
                            ?
                            <Link href={WEBSITE_LOGIN}>
                                <MdAccountBox className='text-gray-500 hover:text-primary cursor-pointer'
                                    size={25}
                                />
                            </Link>
                            :
                            <Link href={USER_DASHBOARD}>
                                <Avatar>
                                    <AvatarImage
                                        src={auth?.avatar?.url || userIcon.src}
                                        className='text-gray-500 hover:text-primary cursor-pointer'
                                        size={25}
                                    />
                                </Avatar>
                            </Link>
                        }

                        <button type='button' className='lg:hidden block' onClick={() => setIsMobileMenu(true) }>
                            <FaBars size={25} className='text-gray-500 hover:text-primary cursor-pointer'
                            />
                        </button>


                    </div>
                </div>
            </div>

            <Search  isShow={showSearch}/>
        </div>
    )
}

export default Header
