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
import z from "zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from "@/routes/WebsiteRoute";
import OTPVerification from "@/components/Application/OTPVerification";
import { useRouter } from "next/navigation"; 
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoutes";

// 🔹 Helper to extract error message safely
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong, please try again."
  );
};

const LogInPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState("");
  const router = useRouter(); // Initialize router

  const formSchema = zSchema.pick({
    email: true,
  }).extend({
    password: z.string().min(1, "Password field is required."), // Changed from min(4)
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🔹 Login: check email + password, then send OTP
  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post("/api/auth/login", values);

      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }

      setOtpEmail(values.email); // OTP email set karega
      showToast("success", loginResponse.message || "OTP sent to your email.");
    
    } catch (error) {
      // Handle email not verified case differently
      if (error.response?.status === 401 && error.response.data.message.includes("not verified")) {
        showToast("info", error.response.data.message);
      } else {
        showToast("error", getErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP verification
  const handleOtpVerification = async (otpValue) => {
    try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post("/api/auth/verify-otp", {
        email: otpEmail,
        otp: otpValue
      });

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }

      showToast("success", otpResponse.message || "Login successful!");
      
      dispatch(login(otpResponse.data))

      // Redirect to callback if present, else go to dashboard based on role
      if(searchParams.has('callback')) {
        router.push(searchParams.get('callback'))
      } else {
        otpResponse.data.role === 'admin' 
        ? router.push(ADMIN_DASHBOARD)
        : router.push(USER_DASHBOARD)
      }

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
              <h1 className="text-3xl font-semibold">Login Into Account</h1>
              <p> Login into your account by filling out the form below. </p>
            </div>
            <div className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
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
                  <div className="mb-5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type={isTypePassword ? "password" : "text"}
                              placeholder="•••••••••••"
                              {...field}
                            />
                          </FormControl>
                          <button
                            className="absolute top-9 right-2 cursor-pointer text-gray-500"
                            type="button"
                            onClick={() => setIsTypePassword(!isTypePassword)}
                          >
                            {isTypePassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                          </button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <ButtonLoading
                      loading={loading}
                      type="submit"
                      text="Login"
                      className="w-full cursor-pointer"
                    />
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-1 ">
                      <p>Don't have an account? </p>
                      <Link
                        href={WEBSITE_REGISTER}
                        className="text-primary underline"
                      >
                        Create account!
                      </Link>
                    </div>
                    <div>
                      <Link href={WEBSITE_RESETPASSWORD} className="text-primary underline">
                        Forget Password?
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <OTPVerification
            email={otpEmail}
            onSubmit={handleOtpVerification}
            loading={otpVerificationLoading}
            onBack={() => setOtpEmail("")} // Add back button functionality
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LogInPage;