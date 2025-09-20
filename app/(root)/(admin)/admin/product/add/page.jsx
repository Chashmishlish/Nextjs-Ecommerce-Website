"use client";

import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW, ADMIN_CATEGORY_SHOW } from '@/routes/AdminPanelRoutes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import slugify from 'slugify';
import { showToast } from '@/lib/showToast';
import axios from 'axios';
import useFetch from '@/hooks/useFetch';
import Select from '@/components/Application/Select';
import Editor from '@/components/Application/Admin/Editor';
import MediaModel from '@/components/Application/Admin/MediaModel';
import Image from 'next/image';

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_PRODUCT_SHOW, label: 'Products' },
  { href: "", label: 'Add Product' },
];

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const { data: getCategory } = useFetch('/api/category?deleteType=SD&&size=1000000');

  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  useEffect(() => {
    if (getCategory && getCategory.success) {
      const options = getCategory.data.map(cat => ({ label: cat.name, value: cat._id }));
      setCategoryOption(options);
    }
  }, [getCategory]);

  const formSchema = zSchema.pick({
    name: true,
    slug: true,
    category: true,
    // subCategory: true,
    mrp: false,
    sellingPrice: true,
    discountPercentage: true,
    // media: true,
    description: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      // subCategory: "",
      mrp: 0,
      sellingPrice: 0,
      discountPercentage: 0,
      // media: "",
      description: "",
    },
  })

  // Auto-generate slug
  const nameValue = form.watch('name');
  useEffect(() => {
    if (nameValue) form.setValue('slug', slugify(nameValue, { lower: true }));
  }, [nameValue]);

  // Auto-calculate discount
  useEffect(() => {
    const mrp = form.getValues('mrp') || 0;
    const sellingPrice = form.getValues('sellingPrice') || 0;
    if (mrp > 0 && sellingPrice > 0) {
      const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
      form.setValue('discountPercentage', discount);
    }
  }, [form.watch('mrp'), form.watch('sellingPrice')]);

  const editor = (event, editor) => {
    const data = editor.getData();
    form.setValue('description', data);
  };


const onSubmit = async (values) => {

//  // ✅ Normalize values
//   const normalizedValues = {
//     ...values,
//     subCategory: values.subCategory || null, // optional
//     mrp: values.mrp ? Number(values.mrp) : undefined,
//     discountPercentage: values.discountPercentage ? Number(values.discountPercentage) : undefined,
//     sellingPrice: Number(values.sellingPrice) // required field
//   };

//   console.log("🔥 onSubmit fired with data:", normalizedValues);
  
  setLoading(true);
  try {
    if (selectedMedia.length <= 0) {
      return showToast('error', 'Please select media.');
    }

    const mediaIds = selectedMedia.map(media => media._id)
    // values.subCategory = values.subCategory || null; // optional fix
    values.media = mediaIds

    const { data: response } = await axios.post('/api/product/create', values);

    if (!response.success) {
      throw new Error(response.message);
    }
    form.reset();
    // setSelectedMedia([]);
    showToast('success', response.message);

  } catch (error) {
    console.error(error);
    showToast('error', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className='text-xl font-semibold'>Add Product</h4>
        </CardHeader>
        <CardContent className='pb-5'>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">

              {/* Name */}
                <div className=''>
                
                <FormField 
                control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter product name" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
                </div>

                {/* Slug */}
                <div className=''>
                
                <FormField 
                control={form.control} 
                name="slug" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input id="slug" placeholder="Enter slug e.g. mobile-phones" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                 )} 
                 />
                  </div>

                  {/* Category */}
                  <div className=''>
                
                <FormField 
                control={form.control} 
                name="category" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select
                        options={categoryOption} //productOption 
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

                <div className=''>
                {/* MRP */}
                <FormField control={form.control} 
                name="mrp" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MRP</FormLabel>
                    <FormControl><Input id="mrp" type="number" placeholder="Enter Maximum Retail Price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>  

                {/* Selling Price */}
                <div className=''>
                <FormField 
                control={form.control} 
                name="sellingPrice" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input id="sellingPrice" type="number" placeholder="Enter selling price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                 />
                 </div>

                {/* Discount */}
                <div className=''>
                <FormField 
                control={form.control} 
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >D(%)</FormLabel>
                    <FormControl><Input id="discountPercentage" type="number" readOnly {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
                </div>

                {/* Description */}
                <div className="md:col-span-2 mb-5">
                  <FormLabel className="mb-2">Description <span className="text-red-500">*</span></FormLabel>
                  <Editor onChange={editor} />
                  <FormMessage></FormMessage>
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
                  {selectedMedia.length > 0 
                  &&
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
                    <span className='font-semibold'>Select Media</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3 mt-6">
                <ButtonLoading 
                  loading={loading}
                  type="submit"
                  text="Add Product"
                  className="cursor-pointer"
                  // text={loading ? "Adding..." : "Add Product"}
                />
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;

