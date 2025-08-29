'use client'
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { showToast } from "@/lib/showToast";
import axios from "axios";
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
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import OTPVerification from "@/components/Application/OTPVerification";


const resetPassword = () => {
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false)
    const [otpVerificationLoading, setOtpVerificationLoading] = useState(false)
    const [otpEmail, setOtpEmail] = useState("");
    
    const formSchema = zSchema.pick({
        email: true
    })

    // initializing the form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleEmailVerification = async (values) => {

    }

    // 🔹 OTP verification
      const handleOtpVerification = async (otpValue) => {
        try {
          setOtpVerificationLoading(true);
          const { data: otpResponse } = await axios.post("/api/auth/", {
            email: otpEmail,
            otp: otpValue
          });
    
          if (!otpResponse.success) {
            throw new Error(otpResponse.message);
          }
    
          showToast("success", otpResponse.message || "Login successful!");
          
          dispatch(login(otpResponse.data))
    
    
          // Redirect to dashboard or home page after successful login
          // router.push("/dashboard"); // Change this to your desired route
        } catch (error) {
          showToast("error", getErrorMessage(error));
          throw error; // Re-throw to let OTP component handle reset
        } finally {
          setOtpVerificationLoading(false);
        }
      };

  return (
    <div>
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

        {!otpEmail ? (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-semibold"> Reset Password </h1>
              <p> Enter your email to reset password. </p>
            </div>
            <div className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEmailVerification)}>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@gmail.com"
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
                      loading={emailVerificationLoading}
                      type="submit"
                      text="Send OTP"
                      className="w-full cursor-pointer"
                    />
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-1 ">
                      
                      <Link
                        href={WEBSITE_LOGIN}
                        className="text-primary underline"
                      >
                        Back To Login
                      </Link>
                    </div>
                    
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : 
          <OTPVerification
            email={otpEmail}
            onSubmit={handleOtpVerification}
            loading={otpVerificationLoading}
            onBack={() => setOtpEmail("")} // Add back button functionality
          />
        }
      </CardContent>
    </Card>
    </div>
  )
}

export default resetPassword
