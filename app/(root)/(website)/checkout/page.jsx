'use client'
import ButtonLoading from '@/components/Application/ButtonLoading'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Button } from '@/components/ui/button'
import Image from "next/image";
import loading from '@/public/assests/images/loading.svg'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { zSchema } from '@/lib/zodSchema'
import { WEBSITE_ORDER_DETAILS, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { addIntoCart, clearCart } from '@/store/reducer/cartReducer'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Form } from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '@/lib/showToast'
import axios from 'axios'
import z from 'zod'
import { FaCity, FaShippingFast, FaStreetView } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'
import { HiLocationMarker, HiMail, HiMap, HiOfficeBuilding, HiPhone, HiPhoneMissedCall, HiUser } from 'react-icons/hi'
import { TbBuildingEstate, TbMapPinCode, TbNotes } from 'react-icons/tb'
import { MdEditLocationAlt, MdOutlineApartment } from 'react-icons/md'
import { GiWorld } from 'react-icons/gi'
import { useRouter } from "next/navigation"; // App Router me
import confetti from 'canvas-confetti';

const breadCrumb = {
  title: 'Checkout',
  links: [{ label: "Checkout" }]
}


const Checkout = () => {
  const router = useRouter();
const [existingOrder, setExistingOrder] = useState(null);

  const [amount, setAmount] = useState(0); // example amount
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // initial empty


  const dispatch = useDispatch();
  const cart = useSelector(store => store.cartStore);
  const authStore = useSelector(store => store.authStore);
  const [verifiedCartData, setVerifiedCartData] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(""); // empty initially
  const [confirmationData, setConfirmationData] = useState(null); // null initially

  // FIX: sirf tab call karo jab cart me products hon
  const { data: getVerifiedCartData } = useFetch('/api/cart-verification', 'POST', { data: cart.products })


  // for coupon discount
  const [isCouponApplied, setIsCouponApplied] = useState(false)
  const [subTotal, setSubTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const [deliveryCharges, setDeliveryCharges] = useState(0)
  const [isDeliveryFree, setIsDeliveryFree] = useState(false) // free delivery promotion

  const [couponLoading, setCouponLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [placingOrder, setPlacingOrder] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)

  const [couponError, setCouponError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // local state me save karo
  useEffect(() => {
    if (getVerifiedCartData?.success) {
      setVerifiedCartData(getVerifiedCartData.data || []);
    }
  }, [getVerifiedCartData]);

  // redux me sync karo
  useEffect(() => {
    if (verifiedCartData.length > 0) {
      dispatch(clearCart());
      verifiedCartData.forEach(cartItem => {
        dispatch(addIntoCart(cartItem));
      });
    }
  }, [verifiedCartData, dispatch]);

  // console.log("🛒 Incoming payload (frontend se):", cart.products);
  // console.log("✅ verifiedCartData Local:", verifiedCartData);
  // console.log("🗂️ Redux Cart:", cart.products);


  // for coupon 
  useEffect(() => {
    const cartProduct = cart.products
    const subTotalAmount = cartProduct.reduce(
      (sum, product) => sum + (product.sellingPrice * product.qty),
      0
    );

    // agar coupon apply ho, discount calculate karo, warna 0
    const discount = 0; // ya apne coupon logic se calculate karlo

    // console.log("SubTotalAmount:", totalAmount, "Discount:", discount);

    setSubTotal(subTotalAmount);
    setDiscount(discount);
    setTotalAmount(subTotalAmount)

    // couponForm.setValue('minimumShoppingAmount' , subTotalAmount)

  }, [cart]);


  useEffect(() => {
    const subTotal = cart.products.reduce((sum, p) => sum + p.sellingPrice * p.qty, 0)
    setSubTotal(subTotal)

    const dc = isDeliveryFree ? 0 : 200 // fixed 200 PKR for example
    setDeliveryCharges(dc)
    setIsDeliveryFree(subTotal >= 2000)
    setTotalAmount(subTotal - discount - couponDiscountAmount + dc)
  }, [cart, discount, couponDiscountAmount, isDeliveryFree])

  // coupon form

  const couponFormSchema = zSchema.pick({
    code: true,
    // minimumShoppingAmount: true,
  })

  const couponForm = useForm({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      // minimumShoppingAmount: subTotal
    }
  })

  const applyCoupon = async (values) => {
    setCouponLoading(true)
    try {
      // console.log("📤 Coupon payload bhejna:", {
      //       ...values,
      //       subTotal
      //     });
      // const {data: response} = await axios.post('/api/coupon/apply' , values)
      const { data: response } = await axios.post('/api/coupon/apply', {
        ...values,
        subTotal
      });


      if (!response.success) {
        // Trigger shake + red border + warning emoji
        setCouponError(true);
        setTimeout(() => setCouponError(false), 500);
        throw new Error(response.message)
      }
      const discountPercent = response.data.discountPercent

      //get coupon discount amount
      setCouponDiscountAmount((subTotal * discountPercent) / 100);
      setTotalAmount(subTotal - (subTotal * discountPercent) / 100);
      setTotalAmount(subTotal - (subTotal * discountPercent) / 100 + deliveryCharges)


      showToast('success', response.message)
      setCouponCode(couponForm.getValues('code'))
      setIsCouponApplied(true)
      // agar coupon me koi masla aye jese cancel krne k bd dubara na chalay load kiye bagair tow ye line chala dena 
      // couponForm.resetField('code' , '')
      couponForm.reset()

      // Trigger confetti animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);

    } catch (error) {
      showToast('error', error.message)
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setIsCouponApplied(false)
    setCouponCode('')
    setCouponDiscountAmount(0)
    setTotalAmount(subTotal + deliveryCharges)
    // setTotalAmount(subTotal)
  }

  // place order 
  // const orderFormSchema = zSchema.pick({
  //   name: true,
  //   email: true,
  //   phone: true,
  //   altPhone: true,
  //   address: true,
  //   country: true,
  //   state: true,
  //   city: true,
  //   pincode: true,
  //   landmark: true,
  //   ordernote: true,
  // }).extend({
  //   userId: z.string().optional()
  // })

  // Existing main schema
  const orderFormSchema = zSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    altPhone: true,
    address: true,
    country: true,
    state: true,
    city: true,
    pincode: true,
    landmark: true,
    ordernote: true,
    paymentMethod: true,
  }).extend({
    userId: z.string().optional(),
    street: z.string().optional(),
    apartment: z.string().optional(),
    // deliveryTime: z.enum(["Morning", "Afternoon", "Evening"]).optional(),
    // addressType: z.enum(["Home", "Work", "Other"]).optional(),
    // saveAddress: z.boolean().optional(),
  });


  const orderForm = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      altPhone: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      street: '',
      apartment: '',
      landmark: '',
      ordernote: '',
      // deliveryTime: '',
      // saveAddress: false,
      paymentMethod: 'COD',
          userId: '', // initially empty

      // userId: authStore?.auth?._id,
    }
  });

//   useEffect(() => {
//   if (orderData) {
//     orderForm.setValue('ordernote', orderData.ordernote || '');
//   }
// }, [orderData]);


  // 3️⃣ Pre-fill form if existing order exists
  useEffect(() => {
    if (existingOrder) {
      Object.keys(existingOrder).forEach((key) => {
        if (orderForm.getValues(key) !== undefined) {
          orderForm.setValue(key, existingOrder[key] || '')
        }
      })
    }
  }, [existingOrder])

  useEffect(() => {
    if (authStore) {
      orderForm.setValue('userId', authStore?.auth?._id)
    }
  }, [authStore])

  // get orderId
  const getOrderId = async (amount) => {
    try {
      const { data: orderIdData } = await axios.post('/api/payment/get-order-id', { amount })
      if (!orderIdData.success) {
        throw new Error(orderIdData.message)
      }
      return { success: true, order_id: orderIdData.data }

    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const placeOrder = async (formData) => {

    setPlacingOrder(true);
    try {
      const generateOrderId = await getOrderId(totalAmount);
      if (!generateOrderId.success) {
        throw new Error(generateOrderId.message);
      }

      const products = verifiedCartData.map((cartItem) => (
        {
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          name: cartItem.name,
          qty: cartItem.qty,
          mrp: cartItem.mrp,   // 👈 yahan add karo
          sellingPrice: cartItem.sellingPrice,
        }
      ))
      // // const order_id = generateOrderId.order_id;
      // setConfirmationMessage(`Order placed successfully! Your Order ID is ${generateOrderId.order_id}`);
      // ✅ Prepare full confirmation data
      const orderData = {
        order_id: generateOrderId.order_id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        altPhone: formData.altPhone,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        street: formData.street,
        apartment: formData.apartment,
        landmark: formData.landmark,
        ordernote: formData.ordernote,
        userId: authStore?.auth?._id,
        paymentMethod: 'COD',
        amount: totalAmount,
        user_id: authStore?.auth?._id, // 🔹 Important: backend expects user_id

        products: products, // ✅ add this
        // items: cartItems // optional if want to show purchased items
      };

      console.log("💡 Sending to backend:", orderData);


      //   const products = verifiedCartData.map((cartItem) => (
      //     {
      //       productId: cartItem.productId,
      //       variantId: cartItem.variantId,
      //       name: cartItem.name,
      //       qty: cartItem.qty,
      //       mrp: cartItem.mrp,   // 👈 yahan add karo
      //       sellingPrice: cartItem.sellingPrice,
      //     }
      // ))

      // ✅ 3. Save order to backend
      console.log("🚀 Data sending to backend:", {
        order_id: generateOrderId.order_id,
        ...orderData,
        products,
        subTotal: totalAmount,
        discount: 0,
        couponDiscountAmount: 0,
        totalAmount: totalAmount,
      });
      const saveOrderResponse = await axios.post("/api/payment/save-order", {

        order_id: generateOrderId.order_id,
        ...orderData,
        products,
        subTotal: totalAmount,
        discount: 0,
        couponDiscountAmount: 0,
        totalAmount: totalAmount,
      });

      if (!saveOrderResponse.data.success) {
        throw new Error(saveOrderResponse.data.message || "Failed to save order");
      }

      // ✅ 4. Show confirmation card data
      setSavingOrder(true);
      setConfirmationData(orderData);

      // 🎉 Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      // ✅ Redirect after 3 seconds
      setTimeout(() => {

        // Clear cart before redirect
        dispatch(clearCart());
        router.push(WEBSITE_ORDER_DETAILS(`${generateOrderId.order_id}`));
      }, 3000);

    } catch (error) {
      showToast('error', error.message);
    } finally {
      setPlacingOrder(false);
    }
  }

  // const placeOrder = async (formData) => {
  //   setPlacingOrder(true)
  //   try {
  //     const generateOrderId = await getOrderId(totalAmount)
  //     console.log(generateOrderId)
  //   } catch (error) {
  //     showToast('error', error.message)
  //   } finally {
  //     setPlacingOrder(false)
  //   }
  // }

  // const placeOrder = async (formData) => {
  //   console.log('🚚CHECK ', formData);
  //   setPlacingOrder(true)
  //   try {

  //   } catch (error) {
  //     showToast('error', error.message)
  //   } finally {
  //     setPlacingOrder(false)
  //   }
  // };

  // console.log('🚚 ERROR CHECK ', orderForm.formState.errors);

  // if(savingOrder) return 


  return (
    <div>

      {savingOrder &&
        <div className='h-screen w-screen fixed top-0 left-0 z-50 bg-black/20 '>
          <div className='h-screen flex justify-center items-center'>
            <Image src="/assests/images/loading.svg" height={80} width={80} alt="Loading" />
            {/* <Image src={loading.src} height={80} width={80} alt='Loading'/> */}
            <h4 className=' font-semibold text-gray-120'>Wait please....</h4>
          </div>
        </div>
      }

      <WebsiteBreadcrumb props={breadCrumb} />
      {cart.count === 0 ? (
        <div className="w-screen h-[500px] flex justify-center items-center py-32">
          <div className="text-center">
            <h4 className="text-4xl font-semibold mb-5">Your cart is empty!</h4>
            <Button type="button" asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4">
          <div className="lg:w-[60%] w-full">
            {/* <div className='flex font-semibold gap-2 items-center'>
  <FaShippingFast size={20} />
   Shipping Address:
</div> */}
            {/* <div className='flex font-semibold gap-2 items-center'>
  <span style={{ fontSize: 20 }}>🚚</span> Shipping Address:
</div> */}

            <div className='mt-5'>
              <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 my-10">
                <h2 className="text-xl font-semibold mb-4 text-left text-gray-800">
                  Shipping Details</h2>
                <Form {...orderForm}>
                  {/* <form  onSubmit={orderForm.handleSubmit(placeOrder)} className="grid grid-cols-2 gap-5 space-y-4"> */}
                  <form onSubmit={orderForm.handleSubmit(placeOrder)} className=" space-y-4">


                    {/* Name */}
                    {/* <FormField
                      control={orderForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiUser className="absolute left-3 top-3 text-gray-400" />
                              <Input {...field} placeholder="Enter your full name" className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )}
                    /> */}

                    <div className="flex gap-4">
                      {/* First Name */}
                      <FormField
                        control={orderForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HiUser className="absolute left-3 top-3 text-gray-400" />
                                <Input
                                  {...field}
                                  placeholder="First Name"
                                  className="pl-10 border rounded py-2 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="min-h-[1.25rem]" />
                          </FormItem>
                        )}
                      />

                      {/* Last Name */}
                      <FormField
                        control={orderForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HiUser className="absolute left-3 top-3 text-gray-400" />
                                <Input
                                  {...field}
                                  placeholder="Last Name"
                                  className="pl-10 border rounded py-2 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="min-h-[1.25rem]" />
                          </FormItem>
                        )}
                      />
                    </div>


                    {/* Email */}
                    <FormField
                      control={orderForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiMail className="absolute left-3 top-3 text-gray-400" />
                              <Input type='email' placeholder="Enter your email" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )}
                    />

                    {/* Phone + Alternate Phone */}
                    <div className="flex gap-4">
                      <FormField control={orderForm.control} name="phone" render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel> Phone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiPhone className="absolute left-3 top-3 text-gray-400" />
                              <Input {...field} placeholder="Enter Primary Phone number" className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )} />

                      <FormField control={orderForm.control} name="altPhone" render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel> Alternate Phone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiPhoneMissedCall className="absolute left-3 top-3 text-gray-400" />
                              <Input {...field} placeholder="Alternative phone number" className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )} />
                    </div>

                    {/* <FormField
            control={orderForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <HiPhone className="absolute left-3 top-3 text-gray-400"/>
                    <Input {...field} placeholder="Enter phone number" className="pl-10"/>
                  </div>
                </FormControl>
                <FormMessage className="min-h-[1.25rem]" />
              </FormItem>
            )}
          /> */}

                    {/* Country + State */}
                    <div className="flex gap-4">
                      {/* Country */}
                      <FormField
                        control={orderForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              {/* <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <GiWorld />
              </span>
              <select
                {...field}
                className="w-full pl-12 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-400"
              > */}
                              {/* <option value="">Select Country</option> */}
                              {/* <option value="Pakistan">Pakistan ☾⋆</option> */}
                              {/* <option value="Other">Other</option> */}
                              {/* </select>
            </div>  */}
                              <div className="relative">
                                {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" style={{ filter: 'grayscale(60%)' }}>🌍</span> */}
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"><GiWorld /></span>
                                <Input
                                  placeholder="Country"
                                  {...field}
                                  className="pl-12 border rounded py-2 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="min-h-[1.25rem]" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={orderForm.control}
                        name="state"
                        render={({ field }) => {
                          const country = orderForm.watch("country"); // re-render ke liye

                          return (
                            <FormItem className="flex-1">
                              <FormLabel className="flex items-center gap-2 text-sm font-medium">
                                State / Province
                              </FormLabel>
                              <FormControl>
                                {country === "Pakistan" ? (
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                      <TbBuildingEstate />
                                    </span>
                                    <select
                                      {...field}
                                      className="w-full pl-12 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-400"
                                    >
                                      <option value="">Select State</option>
                                      <option value="Sindh">Sindh</option>
                                      <option value="Punjab">Punjab</option>
                                      <option value="Balochistan">Balochistan</option>
                                      <option value="KPK">KPK</option>
                                      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                                      {/* <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option> */}
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                ) : (
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                      <TbBuildingEstate />
                                    </span>
                                    <Input
                                      placeholder="Enter State / Province"
                                      {...field}
                                      className="pl-12 border rounded py-2 text-sm focus:ring-2 focus:ring-blue-400"
                                    />
                                  </div>
                                )}
                              </FormControl>
                              <FormMessage className="min-h-[1.25rem]" />
                            </FormItem>
                          );
                        }}
                      />

                      {/* State */}
                      {/* <FormField
    control={orderForm.control}
    name="state"
    render={({ field }) => (
      <FormItem className="flex-1">
        <FormLabel>State / Province</FormLabel>
        <FormControl>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"> <TbBuildingEstate /></span>
            <Input
              placeholder="State / Province"
              {...field}
              className="pl-12 border rounded py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </FormControl>
        <FormMessage className="min-h-[1.25rem]" />
      </FormItem>
    )}
  /> */}
                    </div>

                    {/* City + Pincode */}
                    <div className="flex gap-4">
                      {/* City */}
                      <FormField
                        control={orderForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"> <FaCity /> </span>
                                <Input
                                  placeholder="City"
                                  {...field}
                                  className="pl-12 border rounded py-2 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="min-h-[1.25rem]" />
                          </FormItem>
                        )}
                      />

                      {/* Pincode */}
                      <FormField
                        control={orderForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"> <TbMapPinCode /> </span>
                                <Input
                                  placeholder="Pincode"
                                  {...field}
                                  className="pl-12 border rounded py-2 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="min-h-[1.25rem]" />
                          </FormItem>
                        )}
                      />
                    </div>


                    {/* Shipping Address */}
                    <FormField
                      control={orderForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FaShippingFast className="absolute left-3 top-3 text-gray-400" />
                              <Input {...field} placeholder="Enter your full address" className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )}
                    />

                    {/* Street / House + Apartment / Suite */}
                    <div className="flex gap-4">
                      <FormField control={orderForm.control} name="street" render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel> Street / House #</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FaStreetView className="absolute left-3 top-3 text-gray-400" />
                              <Input {...field} placeholder="Street / House Number" className="pl-10" />
                            </div>

                            {/* <Input placeholder="Street / House Number" {...field} className="border rounded px-3 py-2" /> */}
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )} />

                      <FormField control={orderForm.control} name="apartment" render={({ field }) => (
                        <FormItem className="flex-1">
                          {/* <FormLabel className="flex items-center gap-2">🏢 Apt / Suite / Floor</FormLabel> */}
                          <FormLabel> Apt / Suite / Floor</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MdOutlineApartment className="absolute left-3 top-3 text-gray-400" />
                              <Input {...field} placeholder="Apartment / Suite / Floor" className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )} />
                    </div>

                    {/* Landmark + Delivery Time */}
                    {/* <div className="flex gap-4"> */}
                    <FormField control={orderForm.control} name="landmark" render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Landmark</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MdEditLocationAlt className="absolute left-3 top-3 text-gray-400" />
                            <Input {...field} placeholder="Nearby Landmark" className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage className="min-h-[1.25rem]" />
                      </FormItem>
                    )} />

                    {/* <FormField control={orderForm.control} name="deliveryTime" render={({ field }) => (
      <FormItem className="flex-1">
        <FormLabel className="flex items-center gap-2">⏰ Preferred Delivery Time</FormLabel>
        <FormControl>
          <Input type="datetime-local" {...field} className="border rounded px-3 py-2" />
        </FormControl>
        <FormMessage className="min-h-[1.25rem]" />
      </FormItem>
    )} /> */}
                    {/* </div> */}

                    {/* Landmark */}
                    {/* <FormField
            control={orderForm.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark (optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nearby landmark" />
                </FormControl>
                <FormMessage className="min-h-[1.25rem]" />
              </FormItem>
            )}
          /> */}

                    {/* Order Note */}
                    <FormField
                      control={orderForm.control}
                      name="ordernote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm font-medium">
                            Order Note (optional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-gray-400 text-lg">
                                <TbNotes />
                              </span>
                              <Textarea
                                {...field}
                                placeholder="Additional instructions"
                                className="pl-12 border rounded py-2 text-sm focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="min-h-[1.25rem]" />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
            control={orderForm.control}
            name="ordernote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Note (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Additional instructions" />
                </FormControl>
                <FormMessage className="min-h-[1.25rem]" />
              </FormItem>
            )}
          /> */}

                    {/* Payment Method */}
                    {/* <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 my-6">
  <h2 className="text-xl font-semibold mb-4 text-left text-gray-800">
    Payment Method
  </h2>

  
  <FormField control={orderForm.control} name="paymentMethod" render={({ field }) => (
    <FormItem>
      <FormLabel>Choose Payment Method</FormLabel>
      <FormControl>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="COD"
              checked={field.value === 'COD'}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-4 h-4"
            />
            <span>Cash on Delivery (COD)</span>
          </label>
        </div>
      </FormControl>
      <FormMessage className="min-h-[1.25rem]" />
    </FormItem>
  )} />
</div> */}

                    {/* Payment Method Section */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
                      <FormField
                        control={orderForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <div className="flex flex-col gap-3">
                            {/* COD Option */}
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                value="COD"
                                checked={field.value === "COD"}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-4 h-4"
                              />
                              <span>Cash on Delivery (COD)</span>
                            </label>

                            {/* Bank Payment Option */}
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                value="Bank"
                                checked={field.value === "Bank"}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-4 h-4"
                              />
                              <span>Card Payment</span>
                            </label>
                          </div>
                        )}
                      />
                    </div>

                    {/* Slide-Up Glassy Modal */}
                    {orderForm.watch("paymentMethod") === "Bank" && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Overlay */}
                        <div
                          className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300"
                          onClick={() => orderForm.setValue("paymentMethod", "")}
                        ></div>

                        {/* Modal Card */}
                        <div className="relative bg-white rounded-[24px] p-8 w-[90%] max-w-md shadow-xl border border-gray-200 animate-slideUpFade">
                          {/* Close Button */}
                          <button
                            onClick={() => orderForm.setValue("paymentMethod", "")}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold transition"
                          >
                            ✕
                          </button>

                          {/* Content */}
                          <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-3xl font-bold animate-bounce">
                              ⚡
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 animate-fadeInUp">Coming Soon!</h2>
                            <p className="text-gray-700 text-sm animate-fadeInUp delay-100">
                              Card Payment option will be available soon. Stay tuned for more updates!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tailwind Animations */}
                    <style jsx>{`
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-slideUpFade { animation: slideUpFade 0.4s ease-out forwards; }
  .animate-fadeInUp { animation: fadeInUp 0.4s ease-out forwards; }
  .animate-bounce { animation: bounce 1s infinite; }
`}</style>

                    {confirmationData && (
                      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                        <div
                          className="w-11/12 max-w-lg p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden"
                          style={{
                            backgroundImage: "url('/assests/images/black.png')", // ✅ your background image
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {/* Logo */}
                          <div className="absolute top-4 left-4">
                            <img src="assests/images/logo-bgw.png" alt="logo" className="w-20 h-20" />
                          </div>

                          {/* Success Text */}
                          <h2 className="text-3xl font-extrabold text-white mb-4 flex items-center justify-center gap-3 mt-16">
                            🎉 Hooray! Your Order is Confirmed
                          </h2>

                          {/* Order ID */}
                          <p className="text-white text-center text-lg mb-6 font-mono">
                            Order ID: {confirmationData.order_id}

                          </p>

                          {/* User Details */}
                          <div className="grid grid-cols-1 gap-2 text-white font-medium mb-4 bg-black bg-opacity-30 p-4 rounded-xl">
                            <p><strong>Name:</strong> {confirmationData.firstName} {confirmationData.lastName}</p>
                            <p><strong>Email:</strong> {confirmationData.email}</p>
                            <p><strong>Phone:</strong> {confirmationData.phone}</p>
                            <p><strong>Address:</strong> {confirmationData.address}</p>
                            <p><strong>Payment Method:</strong> {confirmationData.paymentMethod}</p>
                            <p><strong>Amount:</strong> PKR {confirmationData.amount}</p>
                            {confirmationData.ordernote && <p><strong>Note:</strong> {confirmationData.ordernote}</p>}
                          </div>

                          {/* Footer */}
                          <p className="mt-4 text-center text-sm text-white/80 italic">
                            Thank you for shopping with us! Redirecting to order details page...
                          </p>
                        </div>
                      </div>
                    )}




                    {/* Submit */}
                    <ButtonLoading type="submit" text="Place Order" loading={placingOrder} className="w-full bg-black rounded-full cursor-pointer">

                    </ButtonLoading>
                  </form>
                </Form>

              </div>


              {/* <Form {...orderForm}>
  <form className='grid grid-cols-2 gap-5' onSubmit={couponForm.handleSubmit(applyCoupon)}> */}

              {/* <Form {...couponForm}>
  <form className='flex justify-between gap-5' onSubmit={couponForm.handleSubmit(applyCoupon)}>
    <div className=''>
      <FormField
        control={couponForm.control}
        name='code'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder='Enter coupon code' {...field} />
            </FormControl>
            <FormMessage className="min-h-[1.25rem]" />
          </FormItem>
        )}
      />
    </div>

  </form>
</Form> */}
            </div>
          </div>



          <div className="lg:w-[40%] w-full">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-5">
              <h4 className="text-lg font-semibold mb-5 border-b pb-2">Order Summary</h4>
              {/* <div className="rounded bg-gray-50 p-5 sticky top-5"> */}
              {/* <h4 className="text-lg font-semibold mb-5">Order Summary</h4> */}
              <div>

                <table className="w-full border">
                  <tbody>
                    {verifiedCartData && verifiedCartData?.map(product => (
                      <tr key={product.variantId}>
                        <td className='p-3'>
                          <div className='flex items-center gap-5'>
                            <Image src={product.media} width={60} height={60} alt={product.name}
                              className='rounded' />
                            <div>
                              <h4 className='font-medium line-clamp-1'>
                                <Link href={WEBSITE_PRODUCT_DETAILS(product.url)}>
                                  {product.name} </Link>
                              </h4>
                              <p className='text-sm'>Color: {product.color}</p>
                              <p className='text-sm'>Size: {product.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className='p-3 text-center'>
                          <p className='text-nowrap text-sm'>
                            {product.qty} x {product.sellingPrice.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="w-full text-gray-700">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="font-medium py-3 text-sm md:text-base">Sub-total</td>
                      <td className="text-end py-3 text-sm md:text-base font-medium">
                        {subTotal.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-3 text-sm md:text-base">Discount</td>
                      <td className="text-end py-3 text-sm md:text-base text-red-500 font-medium">
                        - {discount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-3 text-sm md:text-base">Coupon Discount</td>
                      <td className="text-end py-3 text-sm md:text-base text-green-600 font-medium">
                        - {couponDiscountAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-3 text-sm md:text-base">Delivery Charges</td>
                      <td className={`text-end py-3 text-sm md:text-base font-medium ${deliveryCharges === 0 ? 'text-green-600' : 'text-black'}`}>
                        {deliveryCharges === 0 ? '🎉Free' : deliveryCharges.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold py-4 text-lg md:text-xl">Total</td>
                      <td className="text-end py-4 text-lg md:text-xl font-semibold text-black">
                        {totalAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>

                  </tbody>
                </table>
                {/* <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-medium py-2">Sub-total</td>
                      <td className="text-end py-2">
                      {subTotal.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-2">Discount</td>
                      <td className="text-end py-2">- 
                      {discount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-2"> Coupon Discount</td>
                      <td className="text-end py-2">
                      -{couponDiscountAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium py-2 text-xl">Total</td>
                      <td className="text-end py-2">
                      -{totalAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                    </td>
                    </tr>
                  </tbody>
                </table> */}



                {/* <div className='mt-2 mb-5'>
                  {!isCouponApplied
                    ?
                    <Form {...couponForm}>
                      <form className='flex justify-between gap-5' onSubmit={couponForm.handleSubmit(applyCoupon)}>
                        <div className='w-[calc(100%-100px)]'>
                          <FormField
                            control={couponForm.control}
                            name='code'
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder='Enter coupon code' {...field}
                                    className="rounded-md border px-3 py-2 text-sm" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='w-[100px]'>
                          <ButtonLoading type='submit' text='Apply' className='w-full cursor-pointer' loading={couponLoading} />
                        </div>

                      </form>
                    </Form>
                    :
                    <div className='flex justify-between py-1 px-5 rounded-lg bg-gray-200'>
                      <div>
                        <span className='text-xs'>Coupon:</span>
                        <p className='text-sm font-semibold'>{couponCode}</p>
                      </div>
                      <button type='button' onClick={removeCoupon} className='text-red-500 text-xl cursor-pointer'>
                        ❌
                      </button>
                    </div>
                  }
                </div> */}
                <div className="mt-2 mb-5 relative">
                  {!isCouponApplied ? (
                    <Form {...couponForm}>
                      <form
                        className={`flex justify-between gap-5 p-4 bg-white rounded-xl shadow-sm border transition-transform duration-200
          ${couponError ? "animate-shake border-red-500" : "border-gray-100 hover:scale-[1.01]"}`}
                        onSubmit={couponForm.handleSubmit(applyCoupon)}
                      >
                        <div className="w-[calc(100%-100px)] relative">
                          <FormField
                            control={couponForm.control}
                            name="code"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder={couponError ? "Invalid coupon ⚠️" : "Enter coupon code"}
                                    {...field}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition duration-200
                      ${couponError ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"}`}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[100px]">
                          <ButtonLoading
                            type="submit"
                            text="Apply"
                            className="w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200"
                            loading={couponLoading}
                          />
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="flex justify-between items-center py-2 px-5 rounded-xl bg-green-50 border border-green-200 shadow-md animate-slideDown animate-glow relative">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500 animate-checkmark"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="text-xs text-green-600">Coupon Applied: 🥳</span>
                          <p className="text-sm font-semibold text-green-900">{couponCode}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-red-500 text-xl hover:text-red-600 transition-transform hover:scale-110 cursor-pointer"
                      >
                        ❌
                      </button>

                      {/* Confetti / sparkles */}
                      {showConfetti && (
                        <div className="absolute -top-20 -left-20 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none">
                          {[...Array(100)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute rounded-full animate-confetti"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${2 + Math.random() * 6}px`,
                                height: `${2 + Math.random() * 6}px`,
                                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${1 + Math.random() * 2}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <style jsx>{`
    @keyframes shake {
      0% { transform: translateX(0); }
      20% { transform: translateX(-5px); }
      40% { transform: translateX(5px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
      100% { transform: translateX(0); }
    }
    .animate-shake { animation: shake 0.4s ease-in-out; }

    @keyframes slideDown {
      0% { transform: translateY(-20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .animate-slideDown { animation: slideDown 0.4s ease-out; }

    @keyframes checkmark {
      0% { stroke-dasharray: 0, 20; }
      100% { stroke-dasharray: 20, 0; }
    }
    .animate-checkmark path {
      stroke-dasharray: 20;
      stroke-dashoffset: 20;
      animation: checkmark 0.4s forwards;
    }

    @keyframes glow {
      0% { box-shadow: 0 0 0 rgba(16,185,129,0.3); }
      50% { box-shadow: 0 0 15px rgba(16,185,129,0.7); }
      100% { box-shadow: 0 0 0 rgba(16,185,129,0.3); }
    }
    .animate-glow { animation: glow 1s ease-in-out; }

    @keyframes confetti {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(150px) rotate(360deg); opacity: 0; }
    }
    .animate-confetti {
      position: absolute;
      animation-name: confetti;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
    }
  `}</style>
                </div>
              </div>



            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout
