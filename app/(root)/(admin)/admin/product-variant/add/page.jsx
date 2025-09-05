"use client";

import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_VARIANT_SHOW } from '@/routes/AdminPanelRoutes';
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
import { sizes } from '@/lib/utils';

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_PRODUCT_VARIANT_SHOW, label: 'Product Variants' },
  { href: "", label: 'Add Product Variants' },
];

const AddProductVariant = () => {
  const [loading, setLoading] = useState(false);
  const [productOption, setProductOption] = useState([]);
  const { data: getProduct } = useFetch('/api/product?deleteType=SD&&size=1000000');

  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  useEffect(() => {
    if (getProduct && getProduct.success) {
      const options = getProduct.data.map(product => ({ label: product.name, value: product._id }));
      setProductOption(options);
    }
  }, [getProduct]);

  const formSchema = zSchema.pick({
    product: true,
    sku: true,
    color: true,
    size: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      sku: "",
      color: "",
      size: "",
      mrp: "",
      sellingPrice: "",
      discountPercentage: "",
    },
  })

  // Auto-calculate discount
  useEffect(() => {
    const mrp = form.getValues('mrp') || 0;
    const sellingPrice = form.getValues('sellingPrice') || 0;
    
    if (mrp > 0 && sellingPrice > 0) {
      const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
      form.setValue('discountPercentage', discount);
    }
  }, [form.watch('mrp'), form.watch('sellingPrice')]);


const onSubmit = async (values) => {
  setLoading(true);
  try {
    if (selectedMedia.length <= 0) {
      return showToast('error', 'Please select media.');
    }

    const mediaIds = selectedMedia.map(media => media._id)
    values.media = mediaIds

    const { data: response } = await axios.post('/api/product-variant/create', values);
    if (!response.success) {
      throw new Error(response.message);
    }

    form.reset();
    showToast('success', response.message)
  } catch (error) {
    console.error(error);
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
          <h4 className='text-xl font-semibold'>Add Product Variant</h4>
        </CardHeader>
        <CardContent className='pb-5'>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-5">

                <div className=''>
                {/* Products */}
                <FormField 
                control={form.control} 
                name="product" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select
                        options={productOption}  
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
                {/* sku */}
                <FormField 
                control={form.control} name="sku" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter sku (BrandName-Product-Color-Size)" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
                </div>

                <div className=''>
                {/* Color */}
                <FormField 
                control={form.control} 
                name="color" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Color <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter Color" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                 )} 
                 />
                  </div>

                <div className=''>
                {/* Size */}
                <FormField 
                control={form.control} 
                name="size" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Size <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select
                        options={sizes.map(size => ({ label: size, value: size }))}
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
                    <FormControl>
                      <Input type="number" placeholder="Enter Maximum Retail Price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>  

                <div className=''>
                {/* Selling Price */}
                <FormField 
                control={form.control} 
                name="sellingPrice" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter selling price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                 />
                 </div>
               
                <div className='mb-3'>
                   {/* Discount */}
                <FormField 
                control={form.control} 
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >D(%)</FormLabel>
                    <FormControl>
                      <Input type="number" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
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
                  text="Add Product Variant"
                  className="cursor-pointer"
                  // text={loading ? "Adding..." : "Add Product Variant"}
                />
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductVariant;

