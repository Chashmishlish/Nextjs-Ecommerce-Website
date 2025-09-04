"use client";

import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanelRoutes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from '@/lib/zodSchema';
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
import { useForm, FormProvider } from "react-hook-form";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_PRODUCT_SHOW, label: 'Products' },
  { href: "", label: 'Add Product' },
];

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const { data: getCategory } = useFetch('/api/category?deleteType=SD&&size=100000');

  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const formSchema = zSchema.pick({
    name: true,
    slug: true,
    category: true,
    subCategory: true,
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
      mrp: 0,
      sellingPrice: 0,
      discountPercentage: 0,
      media: "",
      description: "",
    },
  });

  useEffect(() => {
    if (getCategory && getCategory.success) {
      const options = getCategory.data.map(cat => ({ label: cat.name, value: cat._id }));
      setCategoryOption(options);
    }
  }, [getCategory]);

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

  const editorChange = (event, editor) => {
    const data = editor.getData();
    form.setValue('description', data);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (selectedMedia.length === 0) {
        return showToast('error', 'Please select media.');
      }

      values.media = selectedMedia.map(m => m._id);

      const { data: response } = await axios.post('/api/product/create', values);

      if (!response.success) throw new Error(response.message);

      form.reset();
      setSelectedMedia([]);
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
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input id="name" placeholder="Enter product name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Slug */}
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="slug">Slug <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input id="slug" placeholder="Enter slug e.g. mobile-phones" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Category */}
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Category <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select
                        id="category"
                        options={categoryOption}
                        selected={field.value}
                        setSelected={field.onChange}
                        isMulti={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* SubCategory */}
                <FormField control={form.control} name="subCategory" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
                    <FormControl><Input id="subCategory" placeholder="Enter product sub-category" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* MRP */}
                <FormField control={form.control} name="mrp" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="mrp">MRP</FormLabel>
                    <FormControl><Input id="mrp" type="number" placeholder="Enter Maximum Retail Price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Selling Price */}
                <FormField control={form.control} name="sellingPrice" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="sellingPrice">Selling Price <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input id="sellingPrice" type="number" placeholder="Enter selling price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Discount */}
                <FormField control={form.control} name="discountPercentage" render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="discountPercentage">Discount (%)</FormLabel>
                    <FormControl><Input id="discountPercentage" type="number" readOnly {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Description */}
                <div className="md:col-span-2 mb-5">
                  <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                  <Editor onChange={editorChange} initialData={form.getValues('description')} />
                  <FormMessage />
                </div>

                {/* Media */}
                <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                  <MediaModel open={open} setOpen={setOpen} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} isMultiple={true} />
                  {selectedMedia.length > 0 &&
                    <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>
                      {selectedMedia.map(media => (
                        <div key={media._id} className='h-24 w-24 border'>
                          <Image src={media.url} height={100} width={100} alt='' className='object-cover' />
                        </div>
                      ))}
                    </div>
                  }
                  <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                    <span className='font-semibold'>Select Media</span>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-6">
    <ButtonLoading
        loading={loading}
        type="submit"
        text="Add Product"
        className="cursor-pointer"
    />
</div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;


// "use client";
// import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
// import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanelRoutes';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { FormProvider, useForm } from "react-hook-form";
// import ButtonLoading from "@/components/Application/ButtonLoading";
// import { zSchema } from '@/lib/zodSchema';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { useState, useEffect } from 'react';
// import slugify from 'slugify';
// import { showToast } from '@/lib/showToast';
// import axios from 'axios';
// import useFetch from '@/hooks/useFetch';
// import Select from '@/components/Application/Select';
// import Editor from '@/components/Application/Admin/Editor';
// import MediaModel from '@/components/Application/Admin/MediaModel';
// import Image from 'next/image'

// const breadcrumbData = [
//     { href: ADMIN_DASHBOARD, label: 'Home' },
//     { href: ADMIN_PRODUCT_SHOW, label: 'Products' },
//     { href: "", Label: 'Add Product' },
// ];

// const AddProduct = () => {
//     const [loading, setLoading] = useState(false);
//     const [categoryOption, setCategoryOption] = useState([]);
//     const { data: getCategory } = useFetch('/api/category?deleteType=SD&&size=100000')

//     const [open, setOpen] = useState(false)
//     const [selectedMedia, setSelectedMedia] = useState([])

//     useEffect(() => {
//         if (getCategory && getCategory.success) {
//             const data = getCategory.data
//             const options = data.map((cat) => ({ label: cat.name, value: cat._id }))
//             setCategoryOption(options)
//         }
//     }, [getCategory])

//     const formSchema = zSchema.pick({
//         name: true,
//         slug: true,
//         category: true,
//         subCategory: true,
//         mrp: true,
//         sellingPrice: true,
//         discountPercentage: true,
//         media: true,
//         description: true,
//     });

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             slug: "",
//             category: "",
//             subCategory: "",
//             mrp: 0,
//             sellingPrice: 0,
//             discountPercentage: 0,
//             media: "",
//             description: "",
//         },
//     });

//     const nameValue = form.watch('name'); 
//     useEffect(() => {
//         if (nameValue) {
//             form.setValue('slug', slugify(nameValue, { lower: true }));
//         }
//     }, [nameValue])

//     useEffect (() =>  {
//         const mrp = form.getValues('mrp') || 0
//         const sellingPrice = form.getValues('sellingPrice') || 0
//         if(mrp > 0 && sellingPrice > 0 ){
//             const discountPercentage = ((mrp - sellingPrice) / mrp) * 100
//             form.setValue('discountPercentage' , Math.round(discountPercentage))
//         }
//     }, [form.watch('mrp'), form.watch('sellingPrice')])
    
//     const editor = (event, editor) => {
//         const data = editor.getData()
//         form.setValue('description', data)
//     }

//     const onSubmit = async (values) => {
//          console.log("submit clicked");
//          console.log("form values:", values);
//          console.log("selectedMedia:", selectedMedia);
//         setLoading(true)
//         try {
//             if (selectedMedia.length <= 0) {
//                 return showToast('error', 'Please select media.')
//             }

//             const mediaIds = selectedMedia.map(m => m._id)
//             values.media = mediaIds    

//             const { data: response } = await axios.post('/api/product/create', values)
//             if (!response.success) {
//                 throw new Error(response.message)
//             }
//             form.reset()
//             setSelectedMedia([])  

//             showToast('success', response.message)
//         } catch (error) {
//             console.error(error); // log full error
//             showToast('error', error.message)
//         } finally {
//             setLoading(false)
//         }
//     }


//     return (
//         <div>
//             <BreadCrumb breadcrumbData={breadcrumbData} />

//             <Card className="py-0 rounded shadow-sm">
//                 <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
//                     <h4 className='text-xl font-semibold'> Add Product </h4>
//                 </CardHeader>
//                 <CardContent className='pb-5'>

//                     {/* <Form {...form}
//                         onSubmit={form.handleSubmit(onSubmit)} > */}
//                         <FormProvider {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}>
//                             <div className="grid md:grid-cols-2 gap-5" >
//                                 {/* Name */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="name"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="name">
//                                                     Name <span className="text-red-500">*</span>
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="text"
//                                                         id="name"
//                                                         name="name"
//                                                         autoComplete="product-name"
//                                                         placeholder="Enter product name"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Slug */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="slug"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="slug">
//                                                     Slug <span className="text-red-500">*</span>
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="text"
//                                                         id="slug"
//                                                         name="slug"
//                                                         autoComplete="product-slug"
//                                                         placeholder="Enter slug e.g. mobile-phones"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Category */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="category"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="category">
//                                                     Category <span className="text-red-500">*</span>
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Select
//                                                         id="category"
//                                                         name="category"
//                                                         options={categoryOption}
//                                                         selected={field.value}
//                                                         setSelected={field.onChange}
//                                                         isMulti={false}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Sub Category */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="subCategory"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="text"
//                                                         id="subCategory"
//                                                         name="subCategory"
//                                                         autoComplete="off"
//                                                         placeholder="Enter product sub-category"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* MRP */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="mrp"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="mrp">MRP</FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         id="mrp"
//                                                         name="mrp"
//                                                         autoComplete="off"
//                                                         placeholder="Enter Maximum Retail Price"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Selling Price */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="sellingPrice"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="sellingPrice">
//                                                     Selling Price <span className="text-red-500">*</span>
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         id="sellingPrice"
//                                                         name="sellingPrice"
//                                                         autoComplete="off"
//                                                         placeholder="Enter selling price"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Discount Percentage */}
//                                 <div className="">
//                                     <FormField
//                                         control={form.control}
//                                         name="discountPercentage"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel htmlFor="discountPercentage">Discount Percentage (%)</FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         id="discountPercentage"
//                                                         name="discountPercentage"
//                                                         autoComplete="off"
//                                                         readOnly
//                                                         placeholder="Enter discount percentage"
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Description */}
//                                 <div className="mb-5 md:col-span-2">
//                                     <FormLabel className="mb-2">
//                                         Description <span className="text-red-500">*</span>
//                                     </FormLabel>
//                                     <Editor onChange={editor} initialData={form.getValues('description')} />
//                                     <FormMessage> </FormMessage>
//                                 </div>

//                                 {/* Media */}
//                                 <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
//                                     <MediaModel
//                                         open={open}
//                                         setOpen={setOpen}
//                                         selectedMedia={selectedMedia}
//                                         setSelectedMedia={setSelectedMedia}
//                                         isMultiple={true}
//                                     />

//                                     {selectedMedia.length > 0 &&
//                                         <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>
//                                             {selectedMedia.map(media => (
//                                                 <div key={media._id} className='h-24 w-24 border'>
//                                                     <Image
//                                                         src={media.url}
//                                                         height={100}
//                                                         width={100}
//                                                         alt=''
//                                                         className='size-full object-cover'
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     }

//                                     <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
//                                         <span className='font-semibold'> Select Media </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* button */}
//                             <div className="mt-6">
//                                 <span>
//                                     <ButtonLoading
//                                         loading={loading}
//                                         type="submit"
//                                         text="Add Product"
//                                         className="cursor-pointer"
//                                     />
//                                 </span>
//                             </div>

//                     </form>
//                     </FormProvider>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

// export default AddProduct


