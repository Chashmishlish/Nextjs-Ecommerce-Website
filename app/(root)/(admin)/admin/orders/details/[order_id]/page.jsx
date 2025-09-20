'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb';
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import imgPlaceholder from '@/public/assests/images/img-placeholder.webp'
import Link from 'next/link'
import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'
import useFetch from '@/hooks/useFetch'
import { ADMIN_DASHBOARD, ADMIN_ORDER_SHOW } from '@/routes/AdminPanelRoutes';
import Select from '@/components/Application/Select';
import ButtonLoading from '@/components/Application/ButtonLoading';
import { showToast } from '@/lib/showToast';
import axios from 'axios';
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_ORDER_SHOW, label: 'Orders' },
  { href: "", label: 'Order Details' },
];

const statusOptions = [
  {label: 'Pending' , value: 'pending'},
  {label: 'Processing' , value: 'processing'},
  {label: 'Shipped' , value: 'shipped'},
  {label: 'Delivered' , value: 'delivered'},
  {label: 'Cancelled' , value: 'cancelled'},
  {label: 'Unverified' , value: 'unverified'},
]
const OrderDetails =  ({ params }) => {
  const { order_id } =  use(params)
  const [orderStatus, setOrderStatus] = useState()
  const [orderData, setOrderData] = useState()
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const { data, loading } =  useFetch(`/api/orders/get/${order_id}`)
  console.log(data);


  useEffect(() => {
if(data && data.success){
      console.log('Order API Response:', data.data); // <-- Ye line add karo

  setOrderData(data.data)   
  setOrderStatus(data?.data?.status)
}
  }, [data])

const handleOrderStatus = async () => {
setUpdatingStatus(true)
try {
  const {data : response } = await axios.put('/api/orders/update-status' ,{
    _id: orderData?._id,
    status: orderStatus
  })
  if(!response.success){
    throw new Error(response.message)
  }
  showToast('success', response.message)
} catch (error) {
  showToast('error' , error.message)
}finally{
  setUpdatingStatus(false)
}
}

  return (
    
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />

      <div className="lg:px-32 px-5 my-16">
        {!orderData  ? (
          <div className="flex justify-center items-center py-32">
            <h4 className="text-red-500 text-xl font-semibold">
              Order Not Found
            </h4>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Order Info */}
            <div className="bg-white  dark:bg-gray-900  shadow rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Order Information</h3>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4  text-gray-800 dark:text-gray-200">
                <p>
                  <span className="font-medium">Order Id:</span>{' '}
                  {orderData?.order_id}
                </p>
                <p>
                  <span className="font-medium">Transaction Id:</span>{' '}
                  {orderData?.payment_id || "  ---"}
                </p>
                <p className="capitalize">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      orderData?.status === 'completed'
                        ? 'bg-green-100  text-green-700 dark:bg-green-900 dark:text-green-300'
                        : orderData?.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {orderData?.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Products</h3>
              <table className="w-full border-collapse hidden md:table">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr className="text-gray-700 dark:text-gray-300">
        <th className="text-start p-3">Product</th>
        <th className="text-start p-3">Price</th>
        <th className="text-start p-3">Quantity</th>
        <th className="text-start p-3">Total</th>
      </tr>
    </thead>
                <tbody className="text-gray-800 dark:text-gray-200">
      {orderData?.products?.map((product) => (
        <tr key={product.variantId._id} className="border-b last:border-none">
          <td className="p-3">
            <div className="flex gap-4">
              <Image
                src={
                  product?.variantId?.media[0]?.secure_url ||
                  imgPlaceholder.src
                }
                width={60}
                height={60}
                alt="product"
                className="rounded border"
              />
              <div>
                <h4 className="text-base font-medium line-clamp-1">
                  <Link
                    href={WEBSITE_PRODUCT_DETAILS(product?.productId?.slug)}
                  >
                    {product?.productId?.name}
                  </Link>
                </h4>
                <p className="text-sm text-gray-600">
                  Color: {product?.variantId?.color}
                </p>
                <p className="text-sm text-gray-600">
                  Size: {product?.variantId?.size}
                </p>
              </div>
            </div>
          </td>
          <td className="p-3">
            {product.sellingPrice.toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
            })}
          </td>
          <td className="p-3">{product.qty}</td>
          <td className="p-3 font-medium">
            {(product.qty * product.sellingPrice).toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
            })}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mobile view cards */}
  <div className="space-y-4 md:hidden">
    {orderData?.products?.map((product) => (
      <div
        key={product.variantId._id}
        className="border rounded-lg p-4 flex gap-4 items-start"
      >
        <Image
          src={
            product?.variantId?.media[0]?.secure_url || imgPlaceholder.src
          }
          width={60}
          height={60}
          alt="product"
          className="rounded border border-gray-200 dark:border-gray-700"

        />
        <div className="flex-1 text-gray-800 dark:text-gray-200">
                      <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">
                        <Link href={WEBSITE_PRODUCT_DETAILS(product?.productId?.slug)}>
                          {product?.productId?.name}
            </Link>
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Color: {product?.variantId?.color}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Size: {product?.variantId?.size}
          </p>
          <p className="text-sm mt-2">
            Price:{" "}
            {product.sellingPrice.toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
            })}
          </p>
          <p className="text-sm">Qty: {product.qty}</p>
          <p className="text-sm font-medium">
            Total:{" "}
            {(product.qty * product.sellingPrice).toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
            })}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

            {/* Shipping Details */}
             {/* <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100">Shipping Details</h3>
              <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
                  {[
                    ['First Name', orderData?.firstName],
                    ['Last Name', orderData?.lastName],
                    ['Email', orderData?.email],
                    ['Contact Number', orderData?.phone],
                    ['Alt. Contact #', orderData?.altPhone || '---'],
                    ['Address', orderData?.address],
                    ['Country', orderData?.country],
                    ['City', orderData?.city],
                    ['State/Province', orderData?.state],
                    ['Pincode', orderData?.pincode || '---'],
                    ['Street/House #', orderData?.street || '---'],
                    ['Apt/Suite/Floor', orderData?.apartment || '---'],
                    ['Landmark', orderData?.landmark || '---'],
                    ['Order Note', orderData?.ordernote || '---'],
                    ['Payment Method', orderData?.paymentMethod]
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="font-medium py-2">{label}</td>
                      <td className="text-end py-2 text-gray-700 dark:text-gray-300">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div> */}
            
{/* Shipping Details */}
<div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
  <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100">
    Shipping Details
  </h3>
  <div>
    <table className="w-full table-auto text-sm">
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
        {[
          ['First Name', orderData?.firstName],
          ['Last Name', orderData?.lastName],
          ['Email', orderData?.email],
          ['Contact Number', orderData?.phone],
          ['Alt. Contact #', orderData?.altPhone || '---'],
          ['Address', orderData?.address],
          ['Country', orderData?.country],
          ['City', orderData?.city],
          ['State/Province', orderData?.state],
          ['Pincode', orderData?.pincode || '---'],
          ['Street/House #', orderData?.street || '---'],
          ['Apt/Suite/Floor', orderData?.apartment || '---'],
          ['Landmark', orderData?.landmark || '---'],
          ['Order Note', orderData?.ordernote || '---'],
          ['Payment Method', orderData?.paymentMethod],
        ].map(([label, value]) => (
          <tr key={label}>
            <td className="font-medium py-2 pr-4 align-top whitespace-nowrap">
              {label}
            </td>
            <td className="py-2 text-gray-700 dark:text-gray-300 break-words break-all whitespace-normal max-w-[200px] sm:max-w-[400px]">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100">Order Summary</h3>
              <div>
              <table className="w-full table-fixed text-sm">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
                  <tr>
                    <td className="font-medium py-2">SubTotal</td>
                    <td className="text-end py-2">
                      {orderData?.subTotal.toLocaleString('en-PK', {
                        style: 'currency',
                        currency: 'PKR'
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium py-2">Discount</td>
                    <td className="text-end py-2">
                      {orderData?.discount.toLocaleString('en-PK', {
                        style: 'currency',
                        currency: 'PKR'
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium py-2">Coupon Discount</td>
                    <td className="text-end py-2">
                      {orderData?.couponDiscountAmount.toLocaleString(
                        'en-PK',
                        { style: 'currency', currency: 'PKR' }
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium py-2 text-lg">Total</td>
                    <td className="text-end py-2 text-lg font-semibold text-green-600 dark:text-green-400">
                      {orderData?.totalAmount.toLocaleString('en-PK', {
                        style: 'currency',
                        currency: 'PKR'
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
<hr/>
              <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100">Order Status</h4>
                  <Select
    options={statusOptions}
    selected={orderStatus}
    setSelected={(value) => setOrderStatus(value)}
    placeholder="select"
    isMulti={false}
  />
  <ButtonLoading type='button' loading={updatingStatus} onClick={handleOrderStatus} text='Save Status'
  className='mt-5 cursor-pointer'/>
</div>

            </div>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default OrderDetails
