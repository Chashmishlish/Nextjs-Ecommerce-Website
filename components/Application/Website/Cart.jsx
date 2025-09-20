// "use client";
// import { TiShoppingCart } from "react-icons/ti";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";
// import imgPlaceholder from "@/public/assests/images/img-placeholder.webp";
// import { removeFromCart } from "@/store/reducer/cartReducer";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { WEBSITE_CART, WEBSITE_CHECKOUT } from "@/routes/WebsiteRoute";
// import { useEffect, useState } from "react";
// import { showToast } from "@/lib/showToast";

// const Cart = () => {
//   const [open, setOpen] = useState(false); 
//   const [subTotal , setSubTotal] = useState(0)
//   const [discount, setDiscount] = useState(0)

//   const cart = useSelector((store) => store.cartStore);
//   const dispatch = useDispatch();

// useEffect(() => {
//   const cartProduct = cart.products
//   const totalAmount = cartProduct.reduce(
//     (sum, product) => sum + (product.sellingPrice * product.qty),
//     0
//   );

//   // agar coupon apply ho, discount calculate karo, warna 0
//   const discount  = 0; // ya apne coupon logic se calculate karlo

//   console.log("Subtotal:", totalAmount, "Discount:", discount);
  
//   setSubTotal(totalAmount);
//   setDiscount(discount);
// }, [cart]);

//   //  useEffect (() => {
//   //   const cartProducts = cart.products
//   //   const totalAmount = cartProducts.reduce((sum, product) => sum + (product.selling * product.qty), 0)
//   //   const discount = cartProducts.reduce((sum, product) => sum + ((product.mrp - product.selling) * product.qty), 0)

//   //   setSubTotal(totalAmount)
//   //   setDiscount(discount)
//   // }, [cart])
  

//   // console.log("Cart products:", cart.products);

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger className="relative">
//         <TiShoppingCart
//           size={25}
//           className="text-gray-500 hover:text-primary"
//         />
//         <span className='absolute bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center -right-2 -top-1'>
//           {cart.count}
//         </span>
//       </SheetTrigger>
//       <SheetContent className='sm:max-w-[450px] w-full'>
//         <SheetHeader className="py-2">
//           <SheetTitle className="text-2xl">My Cart</SheetTitle>
//           <SheetDescription></SheetDescription>
//         </SheetHeader>

//         <div className="h-[calc(100vh-40px)] flex flex-col pb-10">
//           <div className="h-[calc(100%-120px)] overflow-auto px-2 flex-1">
//             {cart.count === 0 && (
//               <div className="h-full flex justify-center items-center text-xl font-semibold">
//                 Your Cart Is Empty.
//               </div>
//             )}

//             {cart.products?.map((product) => (
//               // ✅ Use div with key directly, no fragment
//               <div
//                 key={product.variantId}
//                 className="flex justify-between items-center gap-4 mb-4 border-b pb-4 flex-wrap"
//               >
//                 {/* Image */}
//                 <div className="flex gap-4 items-center">
//                   <Image
//                     src={product?.media || imgPlaceholder.src}
//                     height={100}
//                     width={100}
//                     alt={product.name}
//                     className="w-20 h-20 rounded border object-cover"
//                   />
//                 </div>

//                 {/* Product info */}
//                 <div className="flex-1 min-w-[120px]">
//                   <h4 className="text-lg font-semibold text-gray-800 mb-1">
//                     {product.name}
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     <span className="font-medium">Size:</span> {product.size}
//                     <span className="mx-2 text-gray-400">|</span>
//                     <span className="font-medium">Color:</span> {product.color}
//                   </p>
//                 </div>

//                 {/* Remove button and price */}
//                 <div className="flex flex-col items-end">
//                   <button
//                     type="button"
//                     className="text-red-500 underline underline-offset-1 mb-2 cursor-pointer"
//                     onClick={() =>
//                       dispatch(
//                         removeFromCart({
//                           productId: product.productId,
//                           variantId: product.variantId,
//                         })
//                       )
//                     }
//                   >
//                     Remove
//                   </button>
//                   <p className="font-semibold">
//                     {product.qty} x{" "}
//                     {product.sellingPrice.toLocaleString("en-PK", {
//                       style: "currency",
//                       currency: "PKR",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Sticky summary at bottom */}
//           <div className="border-t pt-5 px-2 sticky bottom-0 bg-white z-10">
//             <h2 className="flex justify-between items-center text-lg font-semibold">
//                <span>Subtotal</span> <span>{subTotal?.toLocaleString("en-PK", { style: "currency", currency: "PKR",})}</span>
//             </h2>
//             <h2 className="flex justify-between items-center text-lg font-semibold">
//                <span>Discount</span> <span>{discount?.toLocaleString("en-PK", { style: "currency", currency: "PKR",})}</span>
//             </h2>

//             <div className="flex justify-between gap-5 mt-3 ">
//               <Button
//                   type="button"
//                   asChild
//                   variant="secondary"
//                   className="w-[170px]"
//                   onClick={() => setOpen(false)}
//                 >
//                   <Link href={WEBSITE_CART}>View Cart</Link>
//                 </Button>
//                 <Button
//                   type="button"
//                   asChild
//                   className="w-[170px]"
//                   onClick={() => setOpen(false)}
//                 >
//                   {cart.count ? (
//                     <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
//                   ) : (
//                     <button type="button" onClick={() => showToast('error', 'Your cart is empty!')}>
//                       Checkout
//                     </button>
//                   )}
//                 </Button>
//               {/* <Button
//                 type="button"
//                 asChild
//                 variant="secondary"
//                 className="w-1/2"
//                 onClick={() => setOpen(false)}
//               >
//                 <Link href={WEBSITE_CART}>View Cart</Link>
//               </Button>
//               <Button
//                 type="button"
//                 asChild
//                 className="w-1/2"
//                 onClick={() => setOpen(false)}
//               >
//                 {cart.count ? (
//                   <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       alert("Your cart is empty!") // ✅ showToast placeholder
//                     }
//                   >
//                     Checkout
//                   </button>
//                 )}
//               </Button> */}
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default Cart;



// // "use client";
// // import { TiShoppingCart } from "react-icons/ti";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetDescription,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import { useDispatch, useSelector } from "react-redux";
// // import Image from "next/image";
// // import imgPlaceholder from "@/public/assests/images/img-placeholder.webp";
// // import { removeFromCart } from "@/store/reducer/cartReducer";
// // import { Button } from "@/components/ui/button";
// // import Link from "next/link";
// // import { WEBSITE_CART, WEBSITE_CHECKOUT } from "@/routes/WebsiteRoute";
// // import { useState } from "react";

// // const Cart = () => {
// //   const [ open, setOpen ] = useState(false);
// //   const cart = useSelector((store) => store.cartStore);
// //   const dispatch = useDispatch();

// //   console.log("Cart products:", cart.products);

// //   return (
// //     <Sheet open={open} onOpenChange={setOpen}>
// //       <SheetTrigger className="relative">
// //         <TiShoppingCart
// //           size={25}
// //           className="text-gray-500 hover:text-primary"
// //         />
// //       </SheetTrigger>
// //       <SheetContent>
// //         <SheetHeader className="py-2">
// //           <SheetTitle className="text-2xl">My Cart</SheetTitle>
// //           <SheetDescription></SheetDescription>
// //         </SheetHeader>

// //         <div className="h-[calc(100vh-40px)] pb-10">
// //         <div className="h-[calc(100%-128px)] overflow-auto px-2">
        
// //             {cart.count === 0 && (
// //               <div className="h-full flex justify-center items-center text-xl font-semibold">
// //                 Your Cart Is Empty.
// //               </div>
// //             )}

// //             {cart.products?.map((product) => {
// //               // ✅ Safe console log
// //               // console.log("Product media:", product?.media);

// //               return (
// //                 <div
// //                   key={product.variantId}
// //                   className="flex justify-between items-center gap-5 mb-4 border-b pb-4"
// //                 >
// //                   <div className="flex gap-5 items-center">
// //                     <Image
// //                       src={product?.media || imgPlaceholder.src}
// //                       height={100}
// //                       width={100}
// //                       alt={product.name}
// //                       className="w-20 h-20 rounded border object-cover"
// //                     />
// //                   </div>

// //                   <div>
// //                     <h4 className="text-lg font-semibold text-gray-800 mb-1">
// //                       {product.name}
// //                     </h4>
// //                     <p className="text-sm text-gray-600">
// //                       <span className="font-medium">Size:</span> {product.size}
// //                       <span className="mx-2 text-gray-400">|</span>
// //                       <span className="font-medium">Color:</span>{" "}
// //                       {product.color}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <button
// //                       type="button"
// //                       className="text-red-500 underline underline-offset-1 mb-2 cursor-pointer"
// //                       onClick={() =>
// //                         dispatch(
// //                           removeFromCart({
// //                             productId: product.productId,
// //                             variantId: product.variantId,
// //                           })
// //                         )
// //                       }
// //                     >
// //                       Remove
// //                     </button>
// //                     <p className="font-semibold">
// //                       {product.qty} x{" "}
// //                       {product.sellingPrice.toLocaleString("en-PK", {
// //                         style: "currency",
// //                         currency: "PKR",
// //                       })}
// //                     </p>
// //                   </div>
// //                 </div>
// //               );
// //             })}

// //             {/* <div className="mt-auto border-t pt-5 px-2 sticky bottom-0 bg-white z-10"> */}
// //             <div className="h-28 border-t pt-5 px-2">
// //               <h2 className="flex justify-between items-center text-lg font-semibold">
// //                 <span>0</span> <span>Subtotal</span>
// //               </h2>
// //               <h2 className="flex justify-between items-center text-lg font-semibold">
// //                 <span>0</span> <span>Discount</span>
// //               </h2>

// //               <div className="flex justify-between gap-10">
//                 // <Button
//                 //   type="button"
//                 //   asChild
//                 //   variant="secondary"
//                 //   className="w-1/2"
//                 //   onClick={() => setOpen(false)}
//                 // >
//                 //   <Link href={WEBSITE_CART}>View Cart</Link>
//                 // </Button>
//                 // <Button
//                 //   type="button"
//                 //   asChild
//                 //   className="w-1/2"
//                 //   onClick={() => setOpen(false)}
//                 // >
//                 //   {cart.count ? (
//                 //     <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
//                 //   ) : (
//                 //     <button type="button" onClick={() => showToast('error', 'Your cart is empty!')}>
//                 //       Checkout
//                 //     </button>
//                 //   )}
//                 // </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </SheetContent>
// //     </Sheet>
// //   );
// // };

// // export default Cart;

"use client";
import { TiShoppingCart } from "react-icons/ti";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import imgPlaceholder from "@/public/assests/images/img-placeholder.webp";
import { removeFromCart } from "@/store/reducer/cartReducer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_CART, WEBSITE_CHECKOUT } from "@/routes/WebsiteRoute";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/showToast";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const cart = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartProduct = cart.products;
    const totalAmount = cartProduct.reduce(
      (sum, product) => sum + product.sellingPrice * product.qty,
      0
    );
    const discount = 0; // future coupon logic
    setSubTotal(totalAmount);
    setDiscount(discount);
  }, [cart]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Cart Icon */}
      <SheetTrigger className="relative">
        <TiShoppingCart
          size={26}
          className="text-gray-600 hover:text-primary transition-colors duration-200"
        />
        <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center shadow-md">
          {cart.count}
        </span>
      </SheetTrigger>

      {/* Cart Sidebar */}
      <SheetContent className="sm:max-w-[450px] w-full bg-gray-50 shadow-2xl">
        <SheetHeader className="py-3 border-b border-gray-200">
          <SheetTitle className="text-xl sm:text-2xl font-bold text-gray-800">
            🛒 My Cart
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="h-[calc(100vh-40px)] flex flex-col pb-16 sm:pb-10">
          {/* Cart Items */}
          <div className="h-[calc(100%-140px)] overflow-auto px-1 sm:px-2 flex-1">
            {cart.count === 0 && (
              <div className="h-full flex flex-col justify-center items-center text-base sm:text-lg font-semibold text-gray-500">
                <TiShoppingCart size={36} className="mb-2 text-gray-400" />
                Your Cart Is Empty
              </div>
            )}

            {cart.products?.map((product) => (
              <div
                key={product.variantId}
                className="flex justify-between items-center gap-3 sm:gap-4 mb-3 sm:mb-4 border rounded-lg bg-white p-2 sm:p-3 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Image */}
                <Image
                  src={product?.media || imgPlaceholder.src}
                  height={70}
                  width={70}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md border object-cover"
                />

                {/* Product info */}
                <div className="flex-1 min-w-[100px]">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">Size:</span> {product.size}
                    <span className="mx-1 sm:mx-2 text-gray-400">|</span>
                    <span className="font-medium">Color:</span> {product.color}
                  </p>
                </div>

                {/* Remove button and price */}
                <div className="flex flex-col items-end">
                  <button
                    type="button"
                    className="text-red-500 text-[11px] sm:text-xs underline underline-offset-2 mb-1 sm:mb-2 hover:text-red-600"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          productId: product.productId,
                          variantId: product.variantId,
                        })
                      )
                    }
                  >
                    Remove
                  </button>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">
                    {product.qty} ×{" "}
                    {product.sellingPrice.toLocaleString("en-PK", {
                      style: "currency",
                      currency: "PKR",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t pt-4 px-2 sm:px-3 sticky bottom-0 bg-white z-10 shadow-inner">
            <h2 className="flex justify-between items-center text-sm sm:text-lg font-semibold text-gray-700">
              <span>Subtotal</span>
              <span className="text-primary">
                {subTotal.toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                })}
              </span>
            </h2>
            <h2 className="flex justify-between items-center text-sm sm:text-lg font-semibold text-gray-700 mt-1 sm:mt-2">
              <span>Discount</span>
              <span className="text-green-600">
                -{discount.toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                })}
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 mt-4">
              <Button
                type="button"
                asChild
                variant="secondary"
                className="w-full sm:w-1/2 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                <Link href={WEBSITE_CART}>View Cart</Link>
              </Button>
              <Button
                type="button"
                asChild
                className="w-full sm:w-1/2 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                {cart.count ? (
                  <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => showToast("error", "Your cart is empty!")}
                  >
                    Checkout
                  </button>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

