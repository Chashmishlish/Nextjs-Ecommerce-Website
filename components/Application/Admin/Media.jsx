import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { HiDotsVertical } from "react-icons/hi";

const Media = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {
    const handleCheck = () => {

    }

    return (
        <div className='border border-gray-200 dark:border-gray-800 relative group rounded overflow'>
            <div className='absolute top-2 left-2 z-30'>
                <Checkbox
                    checked={selectedMedia.includes(media._id)}
                    onCheckedChange={handleCheck}
                />
            </div>

            <div className='absolute top-2 right-2 z-20'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className='w-7 h-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer'>
                            <HiDotsVertical color='#ffff' />
                        </span>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </div>

            <div>
                <Image
                    src={media?.secure_url}
                    alt={media?.alt || 'Image'}
                    height={300}
                    width={300}
                    className='object-cover w-full sm:h-[200px] h-[150px]'
                />
            </div>
        </div>
    )
}

export default Media
