import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IoStar } from "react-icons/io5"
import imgPlacholder from '@/public/assests/images/user.png'

const LatestReview = () => {
  return (
    <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-bold' >Product</TableHead>
                        <TableHead className='text-bold' >Rating </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={imgPlacholder.src} />
                            </Avatar>
                            <span className="line-clamp-1">lorem Ispum </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
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
