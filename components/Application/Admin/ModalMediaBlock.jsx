import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import Image from 'next/image'


const ModalMediaBlock = ({media , selectedMedia , setSelectedMedia, isMultiple}) => {
   const handleCheck = () => {

   }
    return (
    <label htmlFor = {media._id} className='border border-gray-200 dark:border-gray-800 relative group rounded overflow-hidden'>
        <div className='absolute top-2 left-2 z-20'>
            <Checkbox id={media._id} checked={selectedMedia.find(m=> m._id === media._id) ? true : false} 
            onCheckedChange={handleCheck}
            />
         </div>
         <div className='size-full relative'>
            <Image
             src={media.secure_url}
             alt={media.alt || '' }
             width={300}
             height={300}
             className='object-cover md:h-[150px] h-[100px]'
            />
         </div>
    </label>
  )
}

export default ModalMediaBlock
