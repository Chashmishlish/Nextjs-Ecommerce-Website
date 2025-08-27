import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import ButtonLoading from './ButtonLoading'
import { FormField, FormItem, FormLabel, FormMessage, FormControl} from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { Form } from '../ui/form'

const OTPVerification = ({email, onSubmit, loading}) => {
    const formSchema = zSchema.pick({
        otp: true, email: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema) ,
        defaultValues: {
            otp: "",
            email: email
        }
    })

    const handleOtpVerification = async (values) => {
      onSubmit(values)
    }

    return (
        <div> 
            <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
                         <div className='text-center'>
                            <h1 className='text-2xl font-bold mb-2'> Please Complete Verification </h1>
                            <p className='text-md'> We have sent an One-time Password (OTP) to your registered email address. The OTP is valid for 10 minutes.</p>
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
                                    {...field}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
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
                            <ButtonLoading loading={loading}  type="submit" text="Verify" className="w-full cursor-pointer"/>
                            <div className='text-center mt-5'>
                              <button type='button' className='text-pink-600 cursor-pointer hover:underline' > Resend OTP </button>
                            </div>
                          </div>
                        </form>
                      </Form>
        </div>
    )
}

export default OTPVerification
