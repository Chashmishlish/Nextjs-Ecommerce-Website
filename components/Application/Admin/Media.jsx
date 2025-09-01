import React from 'react'
import { Checkbox } from '@radix-ui/react-checkbox'

const Media = (media, handleDelete, deleteType, selectedMedia, setSetletedMedia) => {
    const handleCheck = () => {

    }
 
    return (
    <div className='border border-gray-200 dark:border-gray-800 relative group rounded over-flow hidden'>
        <div className='absolute top-2 left-2 z-30'>
            <Checkbox
                checked={ selectedMedia.includes(media._id)}
                onCheckedChange={handleCheck}
            />
        </div>
    </div>
  )
}

export default Media
