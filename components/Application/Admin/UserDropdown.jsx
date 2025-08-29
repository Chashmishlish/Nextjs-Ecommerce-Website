'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import adminLogoLight from '@/public/assests/images/adminLogoLight.png'
import adminLogoDark from '@/public/assests/images/adminLogoDark.png'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { GiBoxUnpacking } from "react-icons/gi";
import { MdOutlineShoppingBag } from "react-icons/md";
import LogoutButton from './LogoutButton'

const UserDropdown = () => {
    const auth = useSelector((store) => store.authStore.auth)
    const { theme } = useTheme()
    
  // Choose avatar based on theme
  const avatarSrc = theme === 'dark' ? adminLogoDark.src : adminLogoLight.src

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Avatar>
            <AvatarImage src={avatarSrc} />
            {/* <AvatarFallback>SM</AvatarFallback> */}
        </Avatar>
    </DropdownMenuTrigger>
        <DropdownMenuContent className="me-5 w-44">
            <DropdownMenuLabel>
                <p className='font-semibold'>{auth?.name}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="" className='cursor-pointer'>
                <GiBoxUnpacking style={{ color: '#ef3a5d' }}/>
                New Product
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="" className='cursor-pointer'>
                <MdOutlineShoppingBag style={{ color: '#ef3a5d' }}/>
                Orders
                </Link>
            </DropdownMenuItem>

            <LogoutButton/>

        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
