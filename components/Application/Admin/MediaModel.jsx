import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'


const MediaModel = ({open , setOpen , selectedMedia, setSelectedMedia , isMultiple }) => {
  
  const handleClear = () => {

  }
  
  const handleClose = () => {

  }

  const handleSelect = () => {

  }

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange = {() => setOpen(!open)}
        >
            <DialogContent onInteractOutside = {(e) => e.preventDefault()}
                className="sm:max-ww-[80%] h-screen p-0 py-10 bg-transparent border-0 shadow-none"
                >
                    <DialogDescription className="hidden"></DialogDescription>
            
            <div className='h-[90vh] bg-white p-3 rounded shadow'>
              <DialogHeader className="h-8 border-b">
                  <DialogTitle> Media Selection </DialogTitle>
              </DialogHeader>

              <div className=''>

                
              </div>


              <div className='h-10 pt-3 border-t flex justify-between'>
                <div>
                  <Button type="button" variant="destructive" onClick={handleClear} className="cursor-pointer"> Clear All </Button>
                </div>
                <div className='flex gap-5'>
                  <Button type="button" variant="secondary" onClick={handleClose} className="cursor-pointer"> Close </Button>
                </div>
                <div className='flex gap-5'>
                  <Button type="button"  onClick={handleSelect} className="cursor-pointer"> Select </Button>
                </div>
              </div>

            </div>
            </DialogContent>
      </Dialog>
    </div>
  )
}

export default MediaModel
