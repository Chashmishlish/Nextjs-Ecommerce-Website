import { Chip } from "@mui/material"
import dayjs from "dayjs"
import userIcon from '@/public/assests/images/user.png'
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const DT_CATEGORY_COLUMN = [
    {
        accessorKey: 'name', 
        header: 'Category Name',
    },
    {
        accessorKey: 'slug', 
        header: 'Slug',
    },
]

export const DT_PRODUCT_COLUMN = [
    {
        accessorKey: 'name', 
        header: 'Product Name',
    },
    {
        accessorKey: 'slug', 
        header: 'Slug',
    },
    {
        accessorKey: 'category', 
        header: 'Category',
    },
    // {
    //     accessorKey: 'subCategory', 
    //     header: 'Sub Category',
    // },
    {
        accessorKey: 'mrp', 
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice', 
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage', 
        header: 'D(%)',
        // header: 'Discount Percentage',
    },
    
]

export const DT_PRODUCT_VARIANT_COLUMN = [
    {
        accessorKey: 'product', 
        header: 'Product Name',
    },
    {
        accessorKey: 'sku', 
        header: 'SKU',
    },
    {
        accessorKey: 'color', 
        header: 'Color',
    },
    {
        accessorKey: 'size', 
        header: 'Size',
    },
    {
        accessorKey: 'mrp', 
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice', 
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage', 
        header: 'D(%)',
    },
]
// npm install dayjs

export const DT_COUPON_COLUMN = [
    {
        accessorKey: 'code', 
        header: 'Code',
    },
    {
        accessorKey: 'discountPercent', 
        header: 'Discount(%)',
    },
    {
        accessorKey: 'minimumShoppingAmount', 
        header: 'Min. Shopping Amount',
    },
    {
        accessorKey: 'validity',
        header: 'Validity',
        Cell: ({ renderedCellValue }) => {
            new Date() > new Date(renderedCellValue) ? <Chip color="error" label={dayjs(renderedCellValue).format('DD/MM/YYYY')}/> 
            : <Chip color="success" label={dayjs(renderedCellValue).format('DD/MM/YYYY')}/> 
        }
    },
]
    // {
    //     accessorKey: 'validity',
    //     header: 'Validity',
    //     Cell: ({ renderedCellValue }) => {
    //         const validityDate = new Date(renderedCellValue);
    //         const isExpired = new Date() > validityDate;

    //         return (
    //         <Chip
    //             label={validityDate.toLocaleDateString('en-IN')}
    //             color={isExpired ? "error" : "success"}
    //             variant="outlined"
    //             sx={{
    //             fontWeight: 'bold',
    //             fontSize: '0.85rem',
    //             letterSpacing: '0.5px',
    //             padding: '2px 8px',
    //             borderRadius: '8px',
    //             }}
    //         />
    //         );
    //     },
    //     },

export const DT_CUSTOMERS_COLUMN = [
        {
        accessorKey: 'avatar', 
        header: 'Avatar',
        Cell: ({ renderedCellValue }) => {
        return (
        <Avatar>
            <AvatarImage src={renderedCellValue?.url || userIcon.src} />
        </Avatar>
            );
        }
    },
    {
        accessorKey: 'name', 
        header: 'Name',
    },
    {
        accessorKey: 'email', 
        header: 'Email',
    },
    {
        accessorKey: 'phone', 
        header: 'Phone',
    },
    {
        accessorKey: 'address', 
        header: 'Address',
    },
    {
        accessorKey: 'isEmailVerified',
        header: 'Is Verified',
        Cell: ({ renderedCellValue }) => {
         return renderedCellValue 
            ? <Chip color="success" label="Verified" /> 
            : <Chip color="error" label="Not Verified" />;
        }
    },
]
