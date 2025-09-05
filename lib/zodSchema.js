import { z } from 'zod'

export const zSchema = z
  .object({

    email: z
      .string()
      .email({ message: "Please enter a valid email" }),

    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" }),

    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be at most 50 characters long" }),
      // .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),

    otp: z
      .string()
      .regex(/^\d{6}$/, {
        message: "Please enter a valid 6-digit OTP"
      }),

    _id: z.string().min(3, '_id is required.'),
    alt: z.string().min(3, 'Alt is required.'),
    title: z.string().min(3, 'Title is required.'),
    slug: z.string().min(3, 'Slug is required.'),

    category: z.string().min(3, 'Category is required.'),
    // subCategory: z.string().optional(),

    mrp: z.union([
      z.number().nonnegative('MRP cannot be negative.'), // allows 0+
      z.string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]).optional(), // 👈 optional

    sellingPrice: z.union([
      z.number().positive('Expected positive value, received negative.'),
      z.string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, 'Please enter a valid number.')
    ]),

    discountPercentage: z.union([
      z.number().nonnegative('Discount cannot be negative.'), // allows 0+
      z.string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]).optional(), // 👈 optional

    description: z.string().min(3, 'Description is required'),
    media: z.array(z.string()),

    product: z.string().min(3, 'Product is required.'),
    color: z.string().nonempty({ message: "Color is required" }),
    sku: z.string().nonempty({ message: "SKU is required" }),
    size: z.string().nonempty({ message: "Size is required" }),
    
  })


