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

const addCategory = () => {

  const [loading, setLoading] = useState(false);

  const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
    { href: "", label: 'Add Category' },
  ];


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
 useEffect (() => {
    const name = form.getValues('name')
    if(name){
      form.setValue('slug', slugify(name))
    }
  }, [form.watch('name')])

const onSubmit = (values) => {

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

export default addCategory
//https://www.npmjs.com/package/slugify terminal: npm i slugify