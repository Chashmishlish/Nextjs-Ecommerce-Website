'use client'
import React from 'react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import logoBlack from '@/public/assests/images/logo-black.png'
import logoWhite from '@/public/assests/images/logo-white.png'
import { Button } from '@/components/ui/button'
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { adminAppSidebarMenu } from '@/lib/adminSidebarMenu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'


const AppSidebar = () => {
      const {toggleSidebar} = useSidebar()
  
  return (
        <Sidebar className="z-50">
          <SidebarHeader className="border-b h-14 p-0">
            <div className="flex justify-between items-center px-3 h-14">

              {/* Logo Area - Left Cornered */}
              <div className="flex items-center h-full">
                <Image
                  src={logoBlack}
                  alt="logo dark"
                  className="object-contain block dark:hidden h-12 w-auto"
                />
                <Image
                  src={logoWhite}
                  alt="logo white"
                  className="object-contain hidden dark:block h-12 w-auto"
                />
              </div>

              {/* Close Button */}
              <Button
                onClick={toggleSidebar}
                type="button"
                size="icon"
                className="md:hidden flex items-center justify-center"
              >
                <IoMdClose />
              </Button>
            </div>
          </SidebarHeader>


    <SidebarContent className='p-3'>
      <SidebarMenu>
        {adminAppSidebarMenu.map((menu, index) => (
            <Collapsible key={index} className='group/collapsible'>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild className="font-semibold px-2 py-5">
                      <Link href={menu?.url}>
                       <menu.icon />
                       {menu.title}
                       {menu.submenu && menu.submenu.length > 0 && 
                       <LuChevronRight 
                        className="ml-auto transition-transform duration-200 group-data[state=open]/collapsible:rotate-90"/>
                       }
                      </Link>
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                      {menu.submenu && menu.submenu.length > 0 
                      && 
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {menu.submenu.map((submenuItem, subMenuIndex ) => (
                            <SidebarMenuSubItem key={subMenuIndex} >
                              <SidebarMenuSubButton asChild className="px-2 py-5">
                                  <Link href={submenuItem.url}>
                                  {submenuItem.title}
                                  </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                      }

              </SidebarMenuItem>
            </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarContent>

    </Sidebar>
  )
}

export default AppSidebar

