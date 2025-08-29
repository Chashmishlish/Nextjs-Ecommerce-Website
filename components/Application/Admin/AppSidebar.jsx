
import React from 'react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-18 p-0 ">
        <div className='flex justify-between item-center px-2'>

          <div className="relative h-12 w-auto block dark:hidden">
          <Image src={logoBlack} alt="logo dark" className="object-contain" />
          </div>
          <div className="relative h-12 w-auto hidden dark:block">
          <Image src={logoWhite} alt="logo white" className="object-contain" />
          </div>
            
            <Button type="button" size="icon" className="md-hidden flex items-center justify-center mt-4">
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

{/* <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter /> */}
