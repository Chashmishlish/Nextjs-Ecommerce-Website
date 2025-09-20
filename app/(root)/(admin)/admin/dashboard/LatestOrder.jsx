'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useFetch from "@/hooks/useFetch"
import Image from "next/image"
import { useEffect, useState } from "react"
import notFound from '@/public/assests/images/not-found.png'
import { statusBadge } from "@/lib/helperFunction"

const LatestOrder = () => {
const [latestOrder, setLatestOrder] = useState([]);
    const {data, loading} = useFetch('/api/dashboard/admin/latest-order')

    useEffect(() => {
        if(data && data.success){
            setLatestOrder(data.data)
        }
    }, [data])

    if(loading) return <div className="h-full w-ful flex justify-center items-center">Loading...</div>    
    
    if(!latestOrder || latestOrder.length === 0) return <div className="h-full w-ful flex justify-center items-center">
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
                        <TableHead >Order Id</TableHead>
                        <TableHead >Payment Id</TableHead>
                        <TableHead >Total Item</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead >Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                    {latestOrder?.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>  
                            <TableCell>{order.paymentId || "N/A"}</TableCell> 
                            <TableCell>{order.products.length}</TableCell> 
                            <TableCell>{statusBadge(order.status)}</TableCell> 
                            <TableCell>{order.totalAmount}</TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )
}

export default LatestOrder
//npx shadcn@latest add table   

