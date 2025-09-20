'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IoStar } from "react-icons/io5"
import imgPlacholder from '@/public/assests/images/user.png'
import Image from "next/image"
import { useEffect, useState } from "react"
import useFetch from "@/hooks/useFetch"
import notFound from '@/public/assests/images/not-found.png'

const LatestReview = () => {
    const [latestReview, setLatestReview] = useState()
    const {data: getLatestReview, loading} = useFetch('/api/dashboard/admin/latest-review')
  
  useEffect(() => {
if(getLatestReview && getLatestReview.success){
    setLatestReview(getLatestReview.data)
}
  }, [getLatestReview])

if(loading) return <div className="h-full w-ful flex justify-center items-center">Loading...</div>    
    
    if(!latestReview || latestReview.length === 0) return <div className="h-full w-ful flex justify-center items-center">
        <Image 
  src={notFound} 
  height={80} 
  width={80} 
  alt="not found" 
  className="w-20"
/>
    </div>  
    return (
    <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-bold' >Product</TableHead>
                        <TableHead className='text-bold' >Rating </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                    {latestReview?.map((review) => (
<TableRow key={review._id}>
                            <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={review?.product?.media[0]?.secure_url || imgPlacholder.src} />
                            </Avatar>
                            <span className="line-clamp-1">{review?.product?.name || "Not found"} </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <span key={i}> 
                                            <IoStar className="text-yellow-500"/>
                                        </span>
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
  )
}

export default LatestReview
