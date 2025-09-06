import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import SearchModel from './SearchModel';

const AdminSearch = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='md:w-[350px] relative'>
            <div className='flex justify-between items-center relative'>
                <Input
                    readOnly
                    className='rounded-full cursor-pointer w-full '
                    placeholder='Search...'
                    onClick={() => setOpen(true)}
                />
                <button type='button' className='absolute right-3 cursor-default'>
                    <IoSearch/>
                </button>
            </div>
            <SearchModel open={open} setOpen={setOpen}/>
        </div>
    )
}

export default AdminSearch;


// import { Input } from '@/components/ui/input'
// import React, { useState } from 'react'
// import { IoSearch } from "react-icons/io5";
// import SearchModel from './SearchModel';

// const AdminSearch = () => {
//     const [open, setOpen] = useState(false)
//   return (
//     // <div className='w-full md:w-[350px]'>
//     <div className='md:w-[350px]'>
//         <div className='flex justify-between items-center relative'>
//             <Input
//                 readOnly
//                 className='rounded-full cursor-pointer'
//                 placeholder='Search...'
//                 onClick={() => setOpen(true)}
                
//             />
//             <button type='button' className='absolute right-3 cursor-default'>
//                 <IoSearch/>
//             </button>
//         </div>
//             <SearchModel open={open} setOpen={setOpen}/>
//     </div>
//   )
// }

// export default AdminSearch
