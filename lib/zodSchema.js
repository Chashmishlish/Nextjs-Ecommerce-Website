import { z } from 'zod'

export const zSchema = z
.object ({

email: z
    .string()
    .email({message: "Please enter a valid email"}),

password: z
  .string()
  .min(4, { message: "Password must be at least 4 characters long" })
  .max(64, { message: "Password must be at most 64 characters long" }),

name: z
  .string()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(50, { message: "Name must be at most 50 characters long" })
  .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),

    otp: z
    .string()
    .regex(/^\d{6}$/, "Please enter a valid 6-digit OTP"),
  });




    