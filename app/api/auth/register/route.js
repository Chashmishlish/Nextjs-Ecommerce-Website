// import { emailVerificationLink } from "@/email/emailVerificationLink";
// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, response } from "@/lib/helperFunction";
// import { sendMail } from "@/lib/sendMail"
// import { zSchema } from "@/lib/zodSchema"
// import UserModel from "@/models/user.model";
// import { SignJWT } from "jose";

// export async function POST(request){
//     try{
//         await connectDB();
//         // schema for validation
//         const validationSchema = zSchema.pick({
//             name: true, email: true, password: true });

//         const payload = await request.json();

//         const validatedData = validationSchema.safeParse(payload);

//         if (!validatedData.success){
//             return response(false, 401, 'Invalid or Missing Input field',
//             validatedData.error)
//         }

//         const {name , email, password} = validatedData.data
// //check for already registered users'
//         const checkUser = await UserModel.exists({ email })
//         if(checkUser){
//             return response(false, 409, 'User already registered.')
//         }
        
// //new registration members
//         const NewRegistration = new UserModel({
//             name, email, password
//         })

//         await NewRegistration.save()

// // email verification // to create token we ave jose library

//         const secret = new TextEncoder().encode(process.env.SECRET_KEY)
//         const token = await new SignJWT({userID: NewRegistration._id.toString()})
//         .setIssuedAt()
//         .setExpirationTime('1h')
//         .setProtectedHeader({ alg: 'HS256' })
//         .sign(secret)

//         // console.log("TOKEN:", token);

// // mail setup for token

//         await sendMail('Email Verification request from Smilish Store',email,
//         emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
//         );
//     return response(true, 200, 'Registration successful, Please verify your email address.')
    
//     } catch(error){
//         return catchError(error)

//         // helpFunction me hai iska baki code
//     }
// }

// // app/api/auth/register/route.js (Next.js 13+ API Route)

// import { connectDB } from "@/lib/databaseConnection";
// import UserModel from "@/models/user.model";
// import { zSchema } from "@/lib/zodSchema";
// import { emailVerificationLink } from "@/email/emailVerificationLink";
// import { sendMailer } from "@/lib/sendMail";
// import { response, catchError } from "@/lib/helperFunction";
// import bcrypt from "bcryptjs";

// export const POST = async (req) => {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const { email, password, name } = zSchema.parse(body);

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return response(false, 400, "User already registered with this email!");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await UserModel.create({ name, email, password: hashedPassword });

//     const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/${newUser._id}`;

//     try {
//       await sendMailer(
//         "Email Verification",
//         email,
//         emailVerificationLink(verificationLink)
//       );
//     } catch (mailError) {
//       console.error("Email failed to send:", mailError.message);
//     }

//     return response(true, 201, "User registered successfully! Verification email sent.");
//   } catch (err) {
//     return catchError(err, "Registration failed. Please try again.");
//   }
// };




// // import { connectDB } from "@/lib/databaseConnection";
// // import UserModel from "@/models/user.model";
// // import { zSchema } from "@/lib/zodSchema";
// // import { emailVerificationLink } from "@/email/emailVerificationLink";
// // import { sendMailer } from "@/lib/sendMail";
// // import { response, catchError } from "@/lib/helperFunction";

// // export const POST = async (req) => {
// //   try {
// //     await connectDB();

// //     const body = await req.json();
// //     const { email, password, name } = zSchema.parse(body);

// //     // Check if user already exists
// //     const existingUser = await UserModel.findOne({ email });
// //     if (existingUser) {
// //       return response(false, 400, "User already registered with this email!");
// //     }

// //     // Create user
// //     const newUser = await UserModel.create({ name, email, password });

// //     // Generate verification link
// //     const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/${newUser._id}`;

// //     // Send email (handle failure gracefully)
// //     try {
// //       await sendMailer(
// //         "Email Verification",
// //         email,
// //         emailVerificationLink(verificationLink)
// //       );
// //     } catch (mailError) {
// //       console.error("Email failed to send:", mailError.message);
// //       // Optionally, you can still notify user to try again
// //     }

// //     return response(true, 201, "User registered successfully! Verification email sent.");
// //   } catch (err) {
// //     // Handle errors like Zod validation, DB errors
// //     return catchError(err, "Registration failed. Please try again.");
// //   }
// // };
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const validationSchema = zSchema.pick({
      name: true, email: true, password: true
    });
    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid or Missing Input field", validatedData.error);
    }

    const { name, email, password } = validatedData.data;

    const checkUser = await UserModel.exists({ email });
    if (checkUser) return response(false, 409, "User already registered.");

    const newUser = new UserModel({ name, email, password });
     await newUser.save();


    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userID: newUser._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "Email Verification",
      email,
      emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
    );

    return response(true, 200, "Registration successful, Please verify your email address.");
  } catch (error) {
    return catchError(error);
  }
}
