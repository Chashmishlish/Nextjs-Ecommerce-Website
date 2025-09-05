import { Chip } from "@mui/material"

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
            const validityDate = new Date(renderedCellValue);
            const isExpired = new Date() > validityDate;

            return (
            <Chip
                label={validityDate.toLocaleDateString('en-IN')}
                color={isExpired ? "error" : "success"}
                variant="outlined"
                sx={{
                fontWeight: 'bold',
                fontSize: '0.85rem',
                letterSpacing: '0.5px',
                padding: '2px 8px',
                borderRadius: '8px',
                }}
            />
            );
        },
        },

]

// npm install dayjs