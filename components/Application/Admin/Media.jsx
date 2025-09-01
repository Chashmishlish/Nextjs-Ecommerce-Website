import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { HiDotsVertical } from "react-icons/hi";
import Link from 'next/link';
import { ADMIN_MEDIA_EDIT } from '@/routes/AdminPanelRoutes';
import { MdEdit } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import { IoIosTrash } from "react-icons/io";
import { showToast } from '@/lib/showToast';

const Media = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {
    const handleCheck = () => {
        let newSelectedMedia = []
        if (selectedMedia.includes(media._id)){
            newSelectedMedia = selectedMedia.filter(m => m !== media._id)
        }else {
            newSelectedMedia = [...selectedMedia, media._id]
        }
        setSelectedMedia(newSelectedMedia)
    }

    const handleCopyLink =  async (url) => {
        await navigator.clipboard.writeText(url)
        showToast('success', 'Link copied.')
    }

    return (
        <div className='border border-gray-200 dark:border-gray-800 relative group rounded overflow'>
            <div className='absolute top-2 left-2 z-30'>
                <Checkbox
                    checked={selectedMedia.includes(media._id)}
                    onCheckedChange={handleCheck}
                    className="border-primary cursor-pointer"
                />
            </div>

            <div className='absolute top-2 right-2 z-20'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className='w-7 h-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer'>
                            <HiDotsVertical color='#ffff' />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        {deleteType === 'SD' &&
                            <>
                                <DropdownMenuItem asChild className='cursor-pointer'>
                                    <Link href={ADMIN_MEDIA_EDIT(media._id)}>
                                        <MdEdit />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => handleCopyLink(media.secure_url)}>
                                    <BsLink45Deg />
                                    Copy Link
                                </DropdownMenuItem>
                            </>
                        }

                        <DropdownMenuItem className='cursor-pointer'>
                            <IoIosTrash color='red' />
                            {deleteType === 'SD' ? 'Move Into Trash' : 'Delete Permanently'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* for opacity of card */}
            <div className='w-full h-full absolute z-10 transition-all duration-150 ease-in group-hover:bg-black/30'>

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
