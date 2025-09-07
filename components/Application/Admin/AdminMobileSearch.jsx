import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import SearchModel from './SearchModel';

const AdminMobileSearch = () => {
    const [ open, setOpen ] = useState(false)
  return (
    <div>
        <>
      <Button type='button' size='icon' onClick={() => setOpen(true)} className="md:hidden" variant="ghost">
        <IoSearch/>
      </Button>
      <SearchModel open={open} setOpen={setOpen}/>
      </>
    </div>
  )
}

export default AdminMobileSearch
