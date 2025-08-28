'use client'
import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonLoading from './ButtonLoading'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import axios from 'axios'
import { showToast } from '@/lib/showToast'

const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  
  const formSchema = zSchema.pick({
    otp: true, 
    email: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      email: email
    }
  });

  const handleOtpVerification = async (values) => {
 
  onSubmit({ email, otp: values.otp });
};


  const resendOTP = async () => {
    try {
      setIsResendingOtp(true);
      const { data: registerResponse } = await axios.post('/api/auth/resend-otp', { email });
      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }
      showToast('success', registerResponse.message);
    } catch (error) {
      showToast('error', error.message || 'Failed to resend OTP');
    } finally {
      setIsResendingOtp(false);
    }
  }

  return (
    <div> 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-2'>Please Complete Verification</h1>
            <p className='text-md'>We have sent an One-time Password (OTP) to your registered email address. The OTP is valid for 10 minutes.</p>
          </div>

          <div className="mb-5 mt-5 flex justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-center font-semibold">One-time Password (OTP)</FormLabel>
                  <FormControl>
                    <InputOTP 
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="text-xl size-10" index={0} />
                        <InputOTPSlot className="text-xl size-10" index={1} />
                        <InputOTPSlot className="text-xl size-10" index={2} />
                        <InputOTPSlot className="text-xl size-10" index={3} />
                        <InputOTPSlot className="text-xl size-10" index={4} />
                        <InputOTPSlot className="text-xl size-10" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="mb-3">
            <ButtonLoading loading={loading} type="submit" text="Verify" className="w-full cursor-pointer"/>
            <div className='text-center mt-5'>
              {!isResendingOtp ? (
                <button onClick={resendOTP} type='button' className='text-pink-600 cursor-pointer hover:underline'>
                  Resend OTP
                </button>
              ) : (
                <span className='text-md'>Resending...</span>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default OTPVerification;