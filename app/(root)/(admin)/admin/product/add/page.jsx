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
import Select from '@/components/Application/Select';
import Editor from '@/components/Application/Admin/Editor';
import MediaModel from '@/components/Application/Admin/MediaModel';
import Image from 'next/image'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_PRODUCT_SHOW, label: 'Products' },
    { href: "", label: 'Add Product' },
];

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [categoryOption, setCategoryOption] = useState([]);
    const { data: getCategory } = useFetch('/api/category?deleteType=SD&&size=100000')
    // console.log(getCategory)

    // media model states
    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([])

    useEffect(() => {
        if (getCategory && getCategory.success) {
            const data = getCategory.data
            const options = data.map((cat) => ({ label: cat.name, value: cat._id }))
            // console.log(options)
            setCategoryOption(options)
        }
    }, [getCategory])

    const formSchema = zSchema.pick({
        name: true,
        slug: true,
        category: true,
        subCategory: true,  // Optional hi rahega
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
            subCategory: "",
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

    const editor = (event, editor) => {
        const data = editor.getData()
        form.setValue('description', data)
    }

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
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className="grid md:grid-cols-2 gap-5" >
                                {/* Name */}
                                <div className="">
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
                                <div className="">
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
                                <div className="">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Category <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        options={categoryOption}
                                                        selected={field.value}
                                                        setSelected={field.onChange}
                                                        isMulti={false}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Sub Category */}
                                <div className="">
                                    <FormField
                                        control={form.control}
                                        name="subCategory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sub Category</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Enter product sub-category" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* MRP */}
                                <div className="">
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
                                <div className="">
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
                                <div className="">
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
                                {/* Description */}
                                <div className="mb-5 md:col-span-2">
                                    <FormLabel className="mb-2">Description
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Editor onChange={editor} initialData={form.getValues('description')} />
                                    <FormMessage> </FormMessage>
                                </div>

                                {/* Media */}
                                <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                                    <MediaModel
                                        open={open}
                                        setOpen={setOpen}
                                        selectedMedia={selectedMedia}
                                        setSelectedMedia={setSelectedMedia}
                                        isMultiple={true}
                                    />

                                    {selectedMedia.length > 0 &&
                                        <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>
                                            {selectedMedia.map(media => (
                                                <div key={media._id} className='h-24 w-24 border'>
                                                    <Image
                                                        src={media.url}
                                                        height={100}
                                                        width={100}
                                                        alt=''
                                                        className='size-full object-cover'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                                        <span className='font-semibold'> Select Media </span>

                                    </div>


                                </div>
                            </div>

                            {/* button */}
                            <div className="mt-6">
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
