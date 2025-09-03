"use client";

import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanelRoutes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { useEffect } from "react";
import slugify from 'slugify';
import { showToast } from '@/lib/showToast';
import axios from 'axios';
import useFetch from '@/hooks/useFetch';
const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_PRODUCT_SHOW, label: 'Products' },
    { href: "", label: 'Add Product' },
];

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const {data: getCategory} = useFetch('/api/category?deleteType=SD&&size=100000')
    // console.log(getCategory)

    const formSchema = zSchema.pick({
        name: true,
        slug: true,
        category: true,
        mrp: true,
        sellingPrice: true,
        discountPercentage: true,
        media: true,
        description: true,
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            category: "",
            mrp: "",
            sellingPrice: "",
            discountPercentage: "",
            media: "",
            description: "",
        },
    });

    // console.log(form);
    useEffect(() => {
        const name = form.getValues('name')
        if (name) {
            form.setValue('slug', slugify(name, { lower: true }));
            // form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [form.watch('name')])

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            const { data: response } = await axios.post('/api/product/create', values)
            if (!response.success) {
                throw new Error(response.message)
            }
            form.reset()
            showToast('success', response.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />

            <Card className="py-0 rounded shadow-sm">
                <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                    <h4 className='text-xl font-semibold'> Add Product </h4>
                </CardHeader>
                <CardContent className='pb-5'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-5">

                            {/* Name */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Name <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Enter product name"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* Slug */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="slug"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Slug <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Enter slug e.g. mobile-phones"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* Category */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Category <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Enter product category"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* MRP */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="mrp"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          MRP 
        </FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter Maximum Retail Price"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* Selling Price */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="sellingPrice"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Selling Price <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter selling price"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* Discount Percentage */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="discountPercentage"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Discount Percentage (%)</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Enter discount percentage"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* Media */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="media"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Media <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

{/* Description */}
<div className="mb-5">
  <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
            Description <span className="text-red-500">*</span>
            </FormLabel>
        <FormControl>
          <textarea
            placeholder="Enter product description"
            className="w-full border rounded-md p-2"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>


                            {/* button */}
                            <div className="mb-3">
                                <ButtonLoading
                                    loading={loading}
                                    type="submit"
                                    text="Add Product"
                                    className="cursor-pointer"
                                />
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
export default AddProduct
