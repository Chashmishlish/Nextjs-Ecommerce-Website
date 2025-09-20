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

    // mrp: z.union([
    //   z.number().nonnegative('MRP cannot be negative.'), // allows 0+
    //   z.string()
    //     .transform((val) => Number(val))
    //     .refine((val) => !isNaN(val) && val >= 0, 'Please enter a valid number.')
    // ]).optional(), // 👈 optional
    mrp: z.number().nonnegative().optional(),
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

    // couponSchema 
    code: z.string().nonempty({ message: "Code is required" }),
    discountPercent: z.union([
    z.number()
        .min(1, 'Discount must be at least 1%.') // 👈 0 ko block karega
        .max(100, 'Discount cannot exceed 100%.'), // 👈 upper bound
    z.string()
        .min(1, 'Discount is required.') // 👈 empty string block
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0 && val <= 100, 'Please enter a valid discount between 1 and 100.')
    ]),
    minimumShoppingAmount:z.union([
      z.number().nonnegative('Discount cannot be negative.'), // allows 0+
      z.string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]).optional(),
    amount:z.union([
      z.number().nonnegative('Discount cannot be negative.'), // allows 0+
      z.string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    validity: z.coerce.date(),
    userId: z.string().min(3, 'User Id is required.'),
    rating: z.union([
      z.number().nonnegative('Discount cannot be negative.'), // allows 0+
      z.string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    review: z.string().min(3, 'Review is required.'),
    // code: z.string().min(3, 'Coupon code is required.'),
    code: z.string().optional(),
     phone: z
    .string()
    .nonempty("Phone number is required") // ✅ Required
    .regex(/^(?:\+92|0)?[0-9]{10}$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number must not exceed 13 characters"),
     altPhone: z
    .string()
    .nonempty("Phone number is required") // ✅ Required
    .regex(/^(?:\+92|0)?[0-9]{10}$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number must not exceed 13 characters"),
     country: z
    .string()
    .nonempty("Country is required"), // ✅ Required country
     state: z
    .string()
    .nonempty("State is required"), // ✅ Required country
  //   country: z
  //   .enum(["Pakistan", "Other"], {
  //   errorMap: () => ({ message: "Please select a country" }),
  // }),
// state: z.enum(["Punjab", "Sindh", "KPK", "Balochistan", "Gilgit-Baltistan"], {
//     errorMap: () => ({ message: "State can't be empty" }),
//   }),
   

  pincode: z
  .string()
  .regex(/^[0-9]{5}$/, "Invalid postal code. It must be 5 digits").optional(),

    apartment: z.string().min(1, " Please fill this field for accuracy").optional(),
    street: z.string().min(1, " Please fill this field for accuracy").optional(),

 landmark: z
    .string()
    .min(2, "Landmark must be at least 3 characters")
    .max(100, "Landmark must not exceed 100 characters"),
    address: z
    .string()
    .min(5, "Please Enter a valid Shipping Address ")
    .max(200, "Address can't exceed 200 characters")
    .nonempty("Address is required"),
  ordernote: z
  .string()
  .max(200, "Order note must not exceed 200 characters")
  .optional(),
  // addressType: z
  //   .enum(["Home", "Work", "Other"])
  //   .optional(),
  saveAddress: z
    .boolean()
    .optional(),
  city: z
    .string()
    .nonempty("City is required"),
  firstName: z
    .string()
    .nonempty({ message: "First Name can't be empty" }),
  lastName: z
    .string()
    .nonempty({ message: "Last Name can't be empty" }),
  paymentMethod: z.enum(['COD']),
   gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),

})







// state: z
//   .string()
//   .nonempty({ message: "Please enter state" }) // agar empty
//   .refine((val) => {
//     if (!val) return true; // agar empty, pass
//     const validStates = [
//       "Panjab",
//       "panjab",
//       "PANJAB",
//       "Punjab",
//       "punjab",
//       "PUNJAB",
//       "Sindh", 
//       "sindh", 
//        "SINDH",
//       "Khyber Pakhtunkhwa",
//   "khyber pakhtunkhwa",
//   "KHYBER PAKHTUNKHWA",
//   "Khyber-Pakhtunkhwa",
//   "khyber-pakhtunkhwa",
//   "KHYBER-PAKHTUNKHWA",
//   "KPK",
//   "kpk",
//   "Kpk",
//   "Balochistan",
//   "balochistan",
//   "BALOCHISTAN",
//       "Islamabad Capital Territory",
//   "islamabad capital territory",
//   "ISLAMABAD CAPITAL TERRITORY",
//   "Islamabad",
//   "islamabad",
//   "ISLAMABAD",
//  "Gilgit-Baltistan",
//   "gilgit-baltistan",
//   "GILGIT-BALTISTAN",
//   "Gilgit Baltistan",
//   "gilgit baltistan",
//   "GILGIT BALTISTAN",
//         "Azad Jammu & Kashmir",
//   "azad jammu & kashmir",
//   "AZAD JAMMU & KASHMIR",
//   "Azad Jammu and Kashmir",
//   "azad jammu and kashmir",
//   "AZAD JAMMU AND KASHMIR",
//   "AJK",
//   "ajk",
//   "Ajk"
//     ];
//     return validStates.includes(val);
//   }, {
//     message: "Please select a valid state", // custom error message
//   }),
