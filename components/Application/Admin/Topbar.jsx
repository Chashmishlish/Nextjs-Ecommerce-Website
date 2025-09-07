'use client'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import { Button } from '@/components/ui/button'
import UserDropdown from './UserDropdown'
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from '@/components/ui/sidebar';
import AdminSearch from './AdminSearch'
import Image from 'next/image'
import logoBlack from '@/public/assests/images/logo-black.png'
import logoWhite from '@/public/assests/images/logo-white.png'
import AdminMobileSearch from './AdminMobileSearch'

const Topbar = () => {
    const {toggleSidebar} = useSidebar()
  return (
        <div className='fixed border h-14 w-full top-0 left-0 z-30 md:ps-72 md:pe-8 px-5
            flex justify-between items-center bg-white dark:bg-card text-black dark:text-white'>
        
        <div className='flex items-center '>  
           
           
            <Image
                src={logoBlack} height={50} width={logoBlack.width} alt="logo dark"
                className=" block dark:hidden h-[50px] w-auto"
            />
            <Image
                src={logoWhite} height={50} width={logoWhite.width} alt="logo white"
                className="hidden dark:block h-[50px] w-auto"
            />
        </div>
        <div className='md:block hidden'>
            <AdminSearch/>
            {/*   */}
        </div>


        <div className='flex items-center gap-2'>
            <AdminMobileSearch/>
            <ThemeSwitch/>
            <UserDropdown/>
            <Button onClick={toggleSidebar} type="button" size="icon" className="ms-2 md:hidden ">
                <RiMenu4Fill/>
            </Button>
            
        </div>

    </div>
  )
}

export default Topbar
