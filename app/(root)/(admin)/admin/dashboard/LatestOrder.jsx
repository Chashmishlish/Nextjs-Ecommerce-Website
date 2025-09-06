import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const LatestOrder = () => {

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
                    {Array.from({ length: 30 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>{`SmiliSh-${i + 1}`}</TableCell>  
                            <TableCell>{`SM-0 ${i + 1}`}</TableCell> 
                            <TableCell>{`Item- ${i + 1}`}</TableCell> 
                            <TableCell>{`Pending- ${i + 1}`}</TableCell> 
                            <TableCell >{`300${i+1}`}</TableCell> 
                        </TableRow>
                    ))}
                    {/* {Array.from({ length: 20 }).map((_, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>INV{i + 1}</TableCell>
                            </TableRow>
                        )
                    })} */}
                </TableBody>
            </Table>
    )
}

export default LatestOrder
//npx shadcn@latest add table   

