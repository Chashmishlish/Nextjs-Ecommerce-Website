// 'use client'
// import ButtonLoading from '@/components/Application/ButtonLoading';
// import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
// import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea';
// import useFetch from '@/hooks/useFetch';
// import { zSchema } from '@/lib/zodSchema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import React, { useEffect, useState, useRef } from 'react'
// import { useForm } from 'react-hook-form'
// import Dropzone from 'react-dropzone'
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import userIcon from '@/public/assests/images/user.png'
// import { FaCamera } from 'react-icons/fa';
// import { showToast } from '@/lib/showToast';
// import { useDispatch } from 'react-redux';
// import { login } from '@/store/reducer/authReducer';
// import axios from 'axios';
// import gsap from "gsap";


// const breadCrumbData = {
//   title: 'User Profile',
//   links: [{ label: 'User Profile' }]
// }

// const Profile = () => {
//   const dispatch = useDispatch()
//   const { data: user } = useFetch('/api/profile/get')
//   const [loading, setLoading] = useState(false)
//   const [preview, setPreview] = useState()
//   const [file, setFile] = useState()
//   const [submittedData, setSubmittedData] = useState(null)
//   const [sticked, setSticked] = useState(false);

//   const cardRef = useRef(null);
//   const avatarRef = useRef(null);
//   const buttonRef = useRef(null);

//   // GSAP mount animation
//   useEffect(() => {
//     if (cardRef.current) {
//       gsap.from(cardRef.current, {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.out",
//       });
//     }
//   }, []);

//   const formSchema = zSchema.pick({
//     name: true, phone: true, address: true,
//   })

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       address: "",
//       gender: ""
//     }
//   })

//   useEffect(() => {
//     if (user && user.success) {
//       const userData = user.data
//       form.reset({
//         name: userData?.name,
//         phone: userData?.phone,
//         address: userData?.address,
//         gender: userData?.gender,
//       })
//       setPreview(userData?.avatar?.url)
//     }
//   }, [user])

//   const handleFileSelection = (files) => {
//     const file = files[0]
//     const preview = URL.createObjectURL(file)
//     setPreview(preview)
//     setFile(file)
//   }

//   const updateProfile = async (values) => {
//     setLoading(true)
//     try {
//       let formData = new FormData()
//       if (file) {
//         formData.set('file', file)
//       }
//       formData.set('name', values.name)
//       formData.set('phone', values.phone)
//       formData.set('address', values.address)
//       formData.set('gender', values.gender)

//       const { data: response } = await axios.put('/api/profile/update', formData)
//       if (!response.success) {
//         throw new Error(response.message)
//       }

//       showToast('success', response.message)
//       dispatch(login(response.data))
//       setSubmittedData(values) // 👈 store submitted values for display
//     } catch (error) {
//       showToast('error', error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="transition-colors duration-300">
//       <WebsiteBreadcrumb props={breadCrumbData} />
//       <UserPanelLayout>
//         <div
//           ref={cardRef}
//           className="bg-white dark:bg-gray-900
//           shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 
//           transition-all duration-500 p-6"
//         >
//           <div className="text-2xl font-bold border-b pb-4 mb-6 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
//             {user?.data?.name ? `${user.data.name}'s Dashboard` : "Profile Settings"}
//           </div>

//           <Form {...form}>
//             <form 
//               className="grid md:grid-cols-2 grid-cols-1 gap-6" 
//               onSubmit={form.handleSubmit(updateProfile)}
//             >
//               {/* Avatar Upload */}
//               <div className="md:col-span-2 flex justify-center items-center">
//                 <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
//                   {({ getRootProps, getInputProps }) => (
//                     <div {...getRootProps()} ref={avatarRef}>
//                       <input {...getInputProps()} />
//                       <Avatar
//                         className="w-32 h-32 relative group border-4 border-yellow-400 dark:border-yellow-500 
//                         rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                         onMouseEnter={() => {
//                           gsap.to(avatarRef.current, { scale: 1.1, rotate: 5, duration: 0.3 });
//                         }}
//                         onMouseLeave={() => {
//                           gsap.to(avatarRef.current, { scale: 1, rotate: 0, duration: 0.3 });
//                         }}
//                       >
//                         <AvatarImage 
//                           src={preview ? preview : userIcon.src} 
//                           className="rounded-full object-cover transition duration-300 " 
//                         />
//                         <div className="absolute inset-0 flex justify-center items-center text-white 
//                         bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 
//                         rounded-full cursor-pointer">
//                           <FaCamera className="text-2xl" />
//                         </div>
//                       </Avatar>
//                     </div>
//                   )}
//                 </Dropzone>
//               </div>

//               {/* Name */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700 dark:text-gray-200">Full Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="text"
//                         placeholder="Enter your full name"
//                         className="rounded-xl border-gray-300 dark:border-gray-600 
//                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
//                         focus:ring-2 focus:ring-blue-500"
//                         {...field}
//                         onFocus={(e) => gsap.to(e.target, { scale: 1.02, duration: 0.2 })}
//                         onBlur={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Phone */}
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700 dark:text-gray-200">Contact Number</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder="eg: +923000000000"
//                         className="rounded-xl border-gray-300 dark:border-gray-600 
//                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
//                         focus:ring-2 focus:ring-blue-500"
//                         {...field}
//                         onFocus={(e) => gsap.to(e.target, { scale: 1.02, duration: 0.2 })}
//                         onBlur={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Gender */}
//               <FormField
//                 control={form.control}
//                 name="gender"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700 dark:text-gray-200">Gender</FormLabel>
//                     <FormControl>
//                       <div className="flex gap-6 text-gray-800 dark:text-gray-200">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             value="male"
//                             checked={field.value === "male"}
//                             onChange={(e) => field.onChange(e.target.value)}
//                             className="w-4 h-4"
//                           />
//                           Male
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             value="female"
//                             checked={field.value === "female"}
//                             onChange={(e) => field.onChange(e.target.value)}
//                             className="w-4 h-4"
//                           />
//                           Female
//                         </label>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Address */}
//               <div className="md:col-span-2">
//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-gray-700 dark:text-gray-200">Address</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Enter your address"
//                           className="rounded-xl border-gray-300 dark:border-gray-600 
//                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
//                           focus:ring-2 focus:ring-blue-500"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="md:col-span-2">
//                 <ButtonLoading
//                   ref={buttonRef}
//                   loading={loading}
//                   type="submit"
//                   text="Save Changes"
//                   className="cursor-pointer w-full py-3 rounded-xl font-semibold 
//                   text-white bg-gradient-to-r from-blue-500 to-indigo-600 
//                   hover:from-blue-600 hover:to-indigo-700 shadow-md 
//                   hover:shadow-2xl transition-all duration-300"
//                   onMouseEnter={() => gsap.to(buttonRef.current, {
//                     boxShadow: "0 0 20px #3b82f6",
//                     duration: 0.3,
//                   })}
//                   onMouseLeave={() => gsap.to(buttonRef.current, {
//                     boxShadow: "0 0 0px transparent",
//                     duration: 0.3,
//                   })}
//                 />
//               </div>
//             </form>
//           </Form>

//        {/* Submitted Data Section */}
// {form.getValues() && (
//   <div className="mt-8">
//     <div 
//       className={`relative bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 
//       text-white dark:text-black p-4 rounded-xl shadow-lg cursor-pointer overflow-hidden group`}
//     >
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold">Hover or Click to View Submitted Data</h3>

//         {/* Stick/Unstick Button */}
//         <button
//           type="button"
//           onClick={() => setSticked(!sticked)}
//           className="px-3 py-1 rounded-lg text-sm font-medium 
//           bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
//           hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all"
//         >
//           {sticked ? "Unstick" : "Stick"}
//         </button>
//       </div>

//       {/* Hidden content - show on hover OR sticked */}
//       <div
//         className={`transition-all duration-500 ease-in-out mt-4 overflow-hidden
//         ${sticked ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100"}`}
//       >
//         <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
//           {/* Profile Picture */}
//           <Avatar className="w-24 h-24 border-4 border-yellow-400 dark:border-yellow-500 shadow-md rounded-full">
//             <AvatarImage 
//               src={preview ? preview : userIcon.src} 
//               className="rounded-full object-cover" 
//             />
//           </Avatar>

//           {/* User Data */}
//           <ul className="space-y-2 text-sm md:text-base">
//             <li><strong>Name:</strong> {form.getValues("name")}</li>
//             <li><strong>Phone:</strong> {form.getValues("phone")}</li>
//             <li><strong>Gender:</strong> {form.getValues("gender")}</li>
//             <li><strong>Address:</strong> {form.getValues("address")}</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
// )}



         
//         </div>
//       </UserPanelLayout>
//     </div>
//   )
// }

// export default Profile
















// // 'use client'
// // import ButtonLoading from '@/components/Application/ButtonLoading';
// // import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
// // import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; import { Input } from '@/components/ui/input'
// // import { Textarea } from '@/components/ui/textarea';
// // import useFetch from '@/hooks/useFetch';
// // import { zSchema } from '@/lib/zodSchema'
// // import { zodResolver } from '@hookform/resolvers/zod'
// // import React, { useEffect, useState } from 'react'
// // import { useForm } from 'react-hook-form'
// // import Dropzone from 'react-dropzone'
// // import { Avatar, AvatarImage } from '@/components/ui/avatar';
// // import userIcon from '@/public/assests/images/user.png'
// // import { FaCamera } from 'react-icons/fa';
// // import { showToast } from '@/lib/showToast';
// // import { useDispatch } from 'react-redux';
// // import { login } from '@/store/reducer/authReducer';
// // import axios from 'axios';
// // const breadCrumbData = {
// //   title: 'Profile',
// //   links: [{ label: 'Profile' }]
// // }
// // const Profile = () => {
// //   const dispatch = useDispatch()
// //   const { data: user } = useFetch('/api/profile/get')
// //   const [loading, setLoading] = useState(false)
// //   const [preview, setPreview] = useState()
// //   const [file, setFile] = useState()
// //   const formSchema = zSchema.pick({
// //      name: true, phone: true, address: true, 
// //   })

// //   const form = useForm({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       name: "",
// //       // firstName: "",
// //       // lastName: "",
// //       phone: "",
// //       address: "",
// //       gender: ""
// //     }
// //   })

// //   useEffect(() => {
// //     // if (user && user.account) {
// //     if (user && user.success) {
// //       const userData = user.data
// //       form.reset({
// //         name: userData?.name,
// //         // firstName: userData?.firstName,
// //         // lastName: userData?.lastName,
// //         phone: userData?.phone,
// //         address: userData?.address,
// //         gender: userData?.gender,
// //       })
// //       setPreview(userData?.avatar?.url)
// //     }
// //   }, [user])

// //   const handleFileSelection = (files) => {
// //     const file = files[0]
// //     const preview = URL.createObjectURL(file)
// //     setPreview(preview)
// //     setFile(file)
// //   }

// //   const updateProfile = async (values) => {
// // setLoading(true)
// // try {
// //   let formData = new FormData()
// //   if (file) {
// //     formData.set('file', file)
// //   }
// //   formData.set('name', values.name)
// //   // formData.set('firstName', values.firstName)
// //   // formData.set('lastName', values.lastName)
// //   formData.set('phone', values.phone)
// //   formData.set('address', values.address)
// //   formData.set('gender', values.gender)

// //   const { data: response } = await axios.put('/api/profile/update', formData)
// //   if (!response.success) {
// //     throw new Error(response.message)
// //   }

// //   showToast('success', response.message)
// //   dispatch(login(response.data))
// // } catch (error) {
// //   showToast('error', error.message)
// // }finally{
// //   setLoading(false)
// // }
// //   }

// //   return (
// //     <div>
// //       <WebsiteBreadcrumb props={breadCrumbData} />
// //       <UserPanelLayout>
// //         <div className="shadow rounded ">
// //           <div className='p-5 text-xl font-semibold border-b '>
// //             Profile
// //           </div>
// //           <div className='p-5'>
// //             <Form {...form}>
// //               <form className=' grid md:grid-cols-2 grid-cols-1 gap-5' onSubmit={form.handleSubmit(updateProfile)}>
// //                 <div className='md:col-span-2 col-span-1 flex justify-center items-center'>
// //                   <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
// //                     {({ getRootProps, getInputProps }) => (
// //                       <div {...getRootProps()}>
// //                         <input {...getInputProps()} />
// //                         <Avatar className='w-28 h-28 relative group border border-gray-100'>
// //                           <AvatarImage src={preview ? preview : userIcon.src} />
// //                           <div className='absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center border-2 border-pink-500 rounded-full group-hover:flex hidden 
// //                           cursor-pointer bg-black/50'>
// //                             <FaCamera  />
// //                           </div>
// //                         </Avatar>
// //                       </div>

// //                     )}
// //                   </Dropzone>

// //                 </div>
// //                 <div className="mb-3">
// //                   <FormField
// //                     control={form.control}
// //                     name="name"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel> Name</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             type="text"
// //                             placeholder="Enter your full name"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>
// //                 {/* <div className="mb-3">
// //                   <FormField
// //                     control={form.control}
// //                     name="lastName"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Last Name</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             type="text"
// //                             placeholder="Enter you last name"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div> */}
// //                  <div className="mb-3">
// //                   <FormField
// //                     control={form.control}
// //                     name="phone"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Contact Number</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             type="number"
// //                             placeholder="eg: +923000000000"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>
// //                <div className="mb-3">
// //                 <FormField
// //   control={form.control}
// //   name="gender"
// //   render={({ field }) => (
// //     <FormItem>
// //       <FormLabel>Gender</FormLabel>
// //       <FormControl>
// //         <div className="flex gap-5">
// //           <label className="flex items-center gap-2 cursor-pointer">
// //             <input
// //               type="radio"
// //               value="male"
// //               checked={field.value === "male"}
// //               onChange={(e) => field.onChange(e.target.value)}
// //               className="w-4 h-4"
// //             />
// //             Male
// //           </label>
// //           <label className="flex items-center gap-2 cursor-pointer">
// //             <input
// //               type="radio"
// //               value="female"
// //               checked={field.value === "female"}
// //               onChange={(e) => field.onChange(e.target.value)}
// //               className="w-4 h-4"
// //             />
// //             Female
// //           </label>
// //         </div>
// //       </FormControl>
// //       <FormMessage />
// //     </FormItem>
// //   )}
// // />

// //                 </div>
// //                 <div className="grid mb-3 md:col-span-2 col-span-1">
// //                   <FormField
// //                     control={form.control}
// //                     name="address"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Address</FormLabel>
// //                         <FormControl>
// //                           <Textarea
// //                             placeholder="Enter your address"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </div>


// //                 <div className="mb-3 md:col-span-2 col-span-1">
// //                   <ButtonLoading
// //                     loading={loading}
// //                     type="submit"
// //                     text="Save Changes"
// //                     className=" cursor-pointer"
// //                   />
// //                 </div>
// //               </form>
// //             </Form>

// //           </div>
// //         </div>
// //       </UserPanelLayout >
// //     </div>
// //   )
// // }

// // export default Profile
// // // npm install --save react-dropzone

'use client'
import ButtonLoading from '@/components/Application/ButtonLoading';
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/useFetch';
import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import userIcon from '@/public/assests/images/user.png'
import { FaCamera } from 'react-icons/fa';
import { showToast } from '@/lib/showToast';
import { useDispatch } from 'react-redux';
import { login } from '@/store/reducer/authReducer';
import axios from 'axios';
import gsap from "gsap";

const breadCrumbData = {
  title: 'User Profile',
  links: [{ label: 'User Profile' }]
}

const Profile = () => {
  const dispatch = useDispatch()
  const { data: user } = useFetch('/api/profile/get')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [file, setFile] = useState()
  const [submittedData, setSubmittedData] = useState(null)
  const [sticked, setSticked] = useState(false);

  const avatarRef = useRef(null);
  const buttonRef = useRef(null);

  const formSchema = zSchema.pick({
    name: true, phone: true, address: true,
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      gender: ""
    }
  })

  useEffect(() => {
    if (user && user.success) {
      const userData = user.data
      form.reset({
        name: userData?.name,
        phone: userData?.phone,
        address: userData?.address,
        gender: userData?.gender,
      })
      setPreview(userData?.avatar?.url)
    }
  }, [user])

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setPreview(preview)
    setFile(file)
  }

  const updateProfile = async (values) => {
    setLoading(true)
    try {
      let formData = new FormData()
      if (file) {
        formData.set('file', file)
      }
      formData.set('name', values.name)
      formData.set('phone', values.phone)
      formData.set('address', values.address)
      formData.set('gender', values.gender)

      const { data: response } = await axios.put('/api/profile/update', formData)
      if (!response.success) {
        throw new Error(response.message)
      }

      showToast('success', response.message)
      dispatch(login(response.data))
      setSubmittedData(values)
    } catch (error) {
      showToast('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="transition-colors duration-300">
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div
          className="bg-white dark:bg-gray-900
          shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 
          transition-all duration-500 p-6"
        >
          <div className="text-2xl font-bold border-b pb-4 mb-6 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
            {user?.data?.name ? `${user.data.name}'s Dashboard` : "Profile Settings"}
          </div>

          <Form {...form}>
            <form 
              className="grid md:grid-cols-2 grid-cols-1 gap-6" 
              onSubmit={form.handleSubmit(updateProfile)}
            >
              {/* Avatar Upload */}
              <div className="md:col-span-2 flex justify-center items-center">
                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} ref={avatarRef}>
                      <input {...getInputProps()} />
                      <Avatar
                        className="w-32 h-32 relative group border-4 border-gray-400 dark:border-gray-500 
                        rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                        onMouseEnter={() => {
                          gsap.to(avatarRef.current, { scale: 1.1, rotate: 5, duration: 0.3 });
                        }}
                        onMouseLeave={() => {
                          gsap.to(avatarRef.current, { scale: 1, rotate: 0, duration: 0.3 });
                        }}
                      >
                        <AvatarImage 
                          src={preview ? preview : userIcon.src} 
                          className="rounded-full object-cover transition duration-300 " 
                        />
                        <div className="absolute inset-0 flex justify-center items-center text-white 
                        bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 
                        rounded-full cursor-pointer">
                          <FaCamera className="text-2xl" />
                        </div>
                      </Avatar>
                    </div>
                  )}
                </Dropzone>
              </div>

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        className="rounded-xl border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                        focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg: +923000000000"
                        className="rounded-xl border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                        focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">Gender</FormLabel>
                    <FormControl>
                      <div className="flex gap-6 text-gray-800 dark:text-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="male"
                            checked={field.value === "male"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4"
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="female"
                            checked={field.value === "female"}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-4 h-4"
                          />
                          Female
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200">Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your address"
                          className="rounded-xl border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                          focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <ButtonLoading
                  ref={buttonRef}
                  loading={loading}
                  type="submit"
                  text="Save Changes"
                  className="cursor-pointer w-full py-3 rounded-xl font-semibold 
                  text-white bg-gradient-to-r from-pink-500 to-gray-600 
                  hover:from-black-600 hover:to-pink-700 shadow-md 
                  hover:shadow-2xl transition-all duration-300"
                />
              </div>
            </form>
          </Form>

                 {/* Submitted Data Section */}
{form.getValues() && (
  <div className="mt-8">
    <div 
      className={`relative bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 
      text-white dark:text-black p-4 rounded-xl shadow-lg cursor-pointer overflow-hidden group`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Hover or Click to View Submitted Data</h3>

        {/* Stick/Unstick Button */}
        <button
          type="button"
          onClick={() => setSticked(!sticked)}
          className="px-3 py-1 rounded-lg text-sm font-medium 
          bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
          hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all"
        >
          {sticked ? "Unstick" : "Stick"}
        </button>
      </div>

      {/* Hidden content - show on hover OR sticked */}
      <div
        className={`transition-all duration-500 ease-in-out mt-4 overflow-hidden
        ${sticked ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100"}`}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          {/* Profile Picture */}
          <Avatar className="w-24 h-24 border-4 border-black-400 dark:border-black-500 shadow-md rounded-full">
            <AvatarImage 
              src={preview ? preview : userIcon.src} 
              className="rounded-full object-cover" 
            />
          </Avatar>

          {/* User Data */}
          <ul className="space-y-2 text-sm md:text-base">
            <li><strong>Name:</strong> {form.getValues("name")}</li>
            <li><strong>Phone:</strong> {form.getValues("phone")}</li>
            <li><strong>Gender:</strong> {form.getValues("gender")}</li>
            <li><strong>Address:</strong> {form.getValues("address")}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
      </UserPanelLayout>
    </div>
  )
}

export default Profile
