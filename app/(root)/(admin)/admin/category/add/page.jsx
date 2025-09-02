"use client";

import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { ADMIN_DASHBOARD, ADMIN_CATEGORY_SHOW } from '@/routes/AdminPanelRoutes';
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
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
  { href: "", label: 'Add Category' },
];

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const formSchema = zSchema.pick({
    name: true,
    slug: true
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
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
      const {data: response} = await axios.post('/api/category/create', values)
    if(!response.success){
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
          <h4 className='text-xl font-semibold'> Add Category </h4>
        </CardHeader>
        <CardContent className='pb-5'>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter category name "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
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

              <div className="mb-3">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text=" Add Category"
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

export default AddCategory
//https://www.npmjs.com/package/slugify terminal: npm i slugify
//npm i material-react-table @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled
//https://www.material-react-table.com/