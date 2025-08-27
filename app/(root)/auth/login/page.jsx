'use client'
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { zSchema } from "@/lib/zodSchema";
import { useState } from "react";
import axios from "axios";
// import { useForm } from "react-hook-form"; //chatgpt-form not define error



import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { email } from "zod";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import z from "zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";

const LogInPage = () => {
  const [loading, setLoading] = useState(false)
  const [isTypePassword, setIsTypePassword] = useState(true)
  
  const formSchema =zSchema.pick({
    email : true
  }).extend({
    password: z.string().min('4', 'Password field is required.')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "", 
    },
  })

  const handleLoginSubmit = async (values) => {
    try {
        setLoading(true)
        const {data: registerResponse} = await axios.post('/api/auth/login', values)
        if(!registerResponse.success){
        throw new Error(registerResponse.message);
        }
    
        form.reset()
        alert(registerResponse.message);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
      }  
  };


  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center">
          <Image
            src="/assests/images/logo-bgw.jpg"
            width={150}
            height={100}
            alt="logo"
            className="max-w-[400px]"
          />
        </div>
        <div className='text-center'>
          <h1 className="text-3xl font-semibold">Login Into Account</h1>
          <p> Login into your account by filling out the form below. </p>
        </div>
        <div className="mt-5">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
        <div className='mb-3'>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email"
                       placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-5'>
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={isTypePassword ? 'password' : 'text'}
                      placeholder="•••••••••••" {...field} />
              </FormControl>
              <button className='absolute top-1/2 right-2 cursor-pointer'
               type='button' onClick={( ) => setIsTypePassword(!isTypePassword)}>
                        {isTypePassword ?
                        <FaRegEyeSlash />
                        :
                        <FaRegEye />
                        }
                      </button>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="mb-3">
          <ButtonLoading loading={loading} type="submit" text="Login"
           className="w-full cursor-pointer"/>
        </div>
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 ">
            <p>Don't have an account? </p>
            <Link href={ WEBSITE_REGISTER }  className="text-primary underline"> Create account!</Link>
          </div>
          <div>
            <Link href="" className="text-primary underline"> Forget Password?</Link>
          </div>
        </div>
      </form>
    </Form>
        </div>
      </CardContent>
    </Card>
  );
// };

export default LogInPage;
// export default ComponentName;


