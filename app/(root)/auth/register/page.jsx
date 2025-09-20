'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { showToast } from "@/lib/showToast";
import z from "zod";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const { data: session, status } = useSession();

  const formSchema = zSchema
    .pick({ firstName: true, lastName: true, email: true, password: true })
    .extend({ confirmPassword: z.string() })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must be same.",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // redirect when session ready
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      showToast("success", `Welcome ${session.user.name}!`);
      window.location.href = USER_DASHBOARD;
    }
  }, [status, session]);

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = { ...values, provider: "local" };
      const { data: registerResponse } = await axios.post("/api/auth/register", payload);
      if (!registerResponse.success) throw new Error(registerResponse.message);
      form.reset();
      showToast("success", registerResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center">
          <Image src="/assests/images/logo-bgb.png" width={150} height={100} alt="logo" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-semibold">◡̈ Create Account!</h1>
        </div>

        <div className="text-center my-2">OR</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="•••••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={isTypePassword ? "password" : "text"}
                      placeholder="•••••••••••"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setIsTypePassword(!isTypePassword)}
                  >
                    {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-3">
              <ButtonLoading loading={loading} type="submit" text="Create Account" className="w-full" />
            </div>
            <div className="text-center">
              <p>
                Already have an account?{" "}
                <Link href={WEBSITE_LOGIN} className="text-primary underline">
                  LogIn!
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
