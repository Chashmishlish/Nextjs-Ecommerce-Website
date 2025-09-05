"use client";
import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import { ADMIN_DASHBOARD, ADMIN_COUPON_SHOW } from '@/routes/AdminPanelRoutes';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { showToast } from '@/lib/showToast';
import axios from 'axios';


const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_COUPON_SHOW, label: 'Coupons' },
  { href: "", label: 'Add Coupon' },
];

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);


  const formSchema = zSchema.pick({
    code: true,
    discountPercent: true,
    minimumShoppingAmount: true,
    validity: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercent: "",
      minimumShoppingAmount: "",
      validity: "",
    },
  })

const onSubmit = async (values) => {
  setLoading(true);
  try {
    const { data: response } = await axios.post('/api/coupon/create', values);

    if (!response.success) {
      throw new Error(response.message);
    }
    form.reset();
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
          <h4 className='text-xl font-semibold'>Add Coupon</h4>
        </CardHeader>
        <CardContent className='pb-5'>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-5">

                <div className=''>
                <FormField 
                control={form.control} name="code" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Code <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter coupon code" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
                </div>

                <div className=''>
                <FormField 
                control={form.control} 
                name="discountPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Discount(%) <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input id="discountPercent" type="number" placeholder=" Enter discount percentage"  {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
                </div>
                <div className=''>
                <FormField 
                control={form.control} 
                name="minimumShoppingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Min Shopping Amount</FormLabel>
                    <FormControl>
                      <Input id="minimumShoppingAmount" type="number" placeholder="Enter minimum shopping amount" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
                />
                </div>

                <div className=''>
                <FormField 
                control={form.control} 
                name="validity" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validity <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                 )} 
                 />
                  </div>
              </div>
              
              <div className="mb-3 mt-6">
                <ButtonLoading 
                  loading={loading}
                  type="submit"
                  text="Add Coupon"
                  className="cursor-pointer"
                />
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCoupon;

