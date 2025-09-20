'use client'
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb"
import { Button } from "@/components/ui/button";
import { WEBSITE_CHECKOUT, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { HiMinus, HiPlus } from "react-icons/hi";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "@/store/reducer/cartReducer";
import imgPlaceholder from '@/public/assests/images/img-placeholder.webp'
import { IoCloseCircleOutline } from "react-icons/io5";
const breadCrumb = {
  title: 'Cart',
  links: [
    { label: "Cart" }
  ]
}

const CartPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector(store => store.cartStore);
  const [qty, setQty] = useState(1)
  const [subTotal, setSubTotal] = useState(0)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    const cartProduct = cart.products
    const totalAmount = cartProduct.reduce(
      (sum, product) => sum + (product.sellingPrice * product.qty),
      0
    );

    // agar coupon apply ho, discount calculate karo, warna 0
    const discount = 0; // ya apne coupon logic se calculate karlo

    // console.log("Subtotal:", totalAmount, "Discount:", discount);

    setSubTotal(totalAmount);
    setDiscount(discount);
  }, [cart]);

  const handleQty = (product, actionType) => {
    let newQty = product.qty;
    if (actionType === 'inc') {
      newQty++;
    } else if (actionType === 'desc' && product.qty > 1) {
      newQty--;
    }
    dispatch(updateQty({ variantId: product.variantId, qty: newQty }));
  }


  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumb} />
      {cart.count === 0 ? (
        <div className="w-screen h-[500px] flex justify-center items-center py-32">
          <div className="text-center">
            <h4 className="text-4xl font-semibold mb-5">
              Your cart is empty!
            </h4>

            <Button type="button" asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4">
          <div className="lg:w-[70%] w-full">
            <table className="w-full border">
              <thead className="border-b bg-gray-50 md:table-header-group hidden">
                <tr>
                  <th className="text-start p-3">Product</th>
                  <th className="text-center p-3">Price</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">Total</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map(product => (
                  <tr key={product.variantId} className="md:table-row block border-b">
                    <td className="p-3">
                      <div className="flex items-center gap-5">
                        <Image
                          src={product.media || imgPlaceholder.src}
                          width={60}
                          height={60}
                          alt={product.name}
                        />
                        <div>
                          <h4 className='text-lg font-medium line-clamp-1'>
                            <Link href={WEBSITE_PRODUCT_DETAILS(product.url)}>{product.name}</Link>
                          </h4>
                          <p className="text-sm">Color: {product.color}</p>
                          <p className="text-sm">Size: {product.size}</p>
                        </div>
                      </div>
                    </td>

                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                      <span className="md:hidden font-medium">Price</span>
                      <span>
                        {product.sellingPrice.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </span>
                    </td>
                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 ">
                      <span className="md:hidden font-medium">Quantity</span>
                      <div className="flex justify-center">
                        <div className="flex justify-center items-center md:h-10 border w-fit rounded-full">
                          <button
                            type="button"
                            className="h-full w-10 flex justify-center items-center text-gray-600 
             hover:text-primary active:text-primary transition-colors cursor-pointer"
                            onClick={() => dispatch(decreaseQuantity({   // ✅ yahan change
                              productId: product.productId,
                              variantId: product.variantId
                            }))}>
                            <HiMinus />
                          </button>

                          <input
                            type="text"
                            value={product.qty}   // yahan sirf qty ki jagah product.qty
                            className="md:w-14 w-5 text-center border-none outline-none"
                            readOnly
                          />

                          <button
                            type="button"
                            className="h-full w-10 flex justify-center items-center text-gray-600 
             hover:text-primary active:text-primary transition-colors cursor-pointer"
                            onClick={() => dispatch(increaseQuantity({   // ✅ yahan change
                              productId: product.productId,
                              variantId: product.variantId
                            }))}>
                            <HiPlus />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                      <span className=" md:hidden font-medium">Total </span>
                      <span>
                        {(product.sellingPrice * product.qty).toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
                      </span>
                    </td>



                    <td className='md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center'>
                      <span className=" md:hidden font-medium">Remove</span>

                      <button
                        type='button'
                        onClick={() =>
                          dispatch(removeFromCart({
                            productId: product.productId,
                            variantId: product.variantId
                          }))}
                        className='text-red-500'
                      >
                        ❌
                        {/* <IoCloseCircleOutline /> */}
                      </button>
                    </td>



                  </tr>
                ))}
              </tbody>


            </table>
          </div>

          <div className='lg:w-[30%] w-full'>
            <div className='rounded bg-gray-50 p-5 sticky top-5'>
              <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
              <div>
                <table className='w-full'>
                  <tbody>
                    <tr>
                      <td className='font-medium py-2'>Sub-total</td>
                      <td className='text-end py-2'>
                        {subTotal.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}

                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium py-2'>Discount</td>
                      <td className='text-end py-2'>
                        - {discount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}

                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium py-2'>Total</td>
                      <td className='text-end py-2'>
                        {subTotal.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}

                      </td>
                    </tr>
                  </tbody>
                </table>

                <Button type="button" asChild className="w-full bg-black rounded-full mt-5 mb-2">
                  <Link href={WEBSITE_CHECKOUT}>Proceed to Checkout</Link>
                </Button>

                <p className="text-center">
                  <Link href={WEBSITE_SHOP} className="hover:underline">Continue Shopping</Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage
