'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { showToast } from '@/lib/showToast';
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '@/store/reducer/authReducer';
// import { showToast } from "@/lib/showToast"

const LogoutButton = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const {data: logoutResponse} = await axios.post('/api/auth/logout')
            if(!logoutResponse.success){
                throw new Error(logoutResponse.message)
            }

            dispatch(logout())
            toast.success(logoutResponse.message);
            router.push(WEBSITE_LOGIN)
        } catch (error) {
            toast(error.message || 'Logout failed')
        }
    };

  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                
        <AiOutlineLogout color="#ef3a5d"/>
        Logout
             
    </DropdownMenuItem>
  )
}

export default LogoutButton;

