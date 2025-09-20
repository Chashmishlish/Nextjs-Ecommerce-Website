import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import imgPlaceholder from '@/public/assests/images/img-placeholder.webp'
import Link from 'next/link'
import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'

const OrderDetails = async ({ params }) => {
  const { orderid } = await params
  const { data: orderData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${orderid}`
  )

  const breadCrumb = {
    title: 'Order Details',
    links: [{ label: 'Order Details' }]
  }

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumb} />

      <div className="lg:px-32 px-5 my-16">
        {orderData && !orderData.success ? (
          <div className="flex justify-center items-center py-32">
            <h4 className="text-red-500 text-xl font-semibold">
              Order Not Found
            </h4>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Order Info */}
            <div className="bg-white shadow rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-4">Order Information</h3>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                <p>
                  <span className="font-medium">Order Id:</span>{' '}
                  {orderData?.data?.order_id}
                </p>
                <p>
                  <span className="font-medium">Transaction Id:</span>{' '}
                  {orderData?.data?.payment_id}
                </p>
                <p className="capitalize">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      orderData?.data?.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : orderData?.data?.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {orderData?.data?.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white shadow rounded-xl p-6 border overflow-auto">
  <h3 className="text-xl font-semibold mb-4">Products</h3>
  <table className="w-full border-collapse hidden md:table">
    <thead className="bg-gray-50">
      <tr>
        <th className="text-start p-3">Product</th>
        <th className="text-start p-3">Price</th>
        <th className="text-start p-3">Quantity</th>
        <th className="text-start p-3">Total</th>
      </tr>
    </thead>
    <tbody>
      {orderData?.data?.products?.map((product) => (
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
    {orderData?.data?.products?.map((product) => (
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
          className="rounded border"
        />
        <div className="flex-1">
          <h4 className="text-base font-medium">
            <Link href={WEBSITE_PRODUCT_DETAILS(product?.productId?.slug)}>
              {product?.productId?.name}
            </Link>
          </h4>
          <p className="text-sm text-gray-600">
            Color: {product?.variantId?.color}
          </p>
          <p className="text-sm text-gray-600">
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

            {/* <div className="bg-white shadow rounded-xl p-6 border overflow-auto">
              <h3 className="text-xl font-semibold mb-4">Products</h3>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 hidden md:table-header-group">
                  <tr>
                    <th className="text-start p-3">Product</th>
                    <th className="text-start p-3">Price</th>
                    <th className="text-start p-3">Quantity</th>
                    <th className="text-start p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.data?.products?.map((product) => (
                    <tr
                      key={product.variantId._id}
                      className="border-b last:border-none"
                    >
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
                                href={WEBSITE_PRODUCT_DETAILS(
                                  product?.productId?.slug
                                )}
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
                      <td className="md:table-cell p-3">
                        {product.sellingPrice.toLocaleString('en-PK', {
                          style: 'currency',
                          currency: 'PKR'
                        })}
                      </td>
                      <td className="md:table-cell p-3">{product.qty}</td>
                      <td className="md:table-cell p-3 font-medium">
                        {(product.qty * product.sellingPrice).toLocaleString(
                          'en-PK',
                          { style: 'currency', currency: 'PKR' }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}

            {/* Shipping Details */}
            <div className="bg-white shadow rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-5">Shipping Details</h3>
              <table className="w-full table-fixed text-sm">
                <tbody className="divide-y">
                  {[
                    ['First Name', orderData?.data?.firstName],
                    ['Last Name', orderData?.data?.lastName],
                    ['Email', orderData?.data?.email],
                    ['Contact Number', orderData?.data?.phone],
                    ['Alt. Contact #', orderData?.data?.altPhone || '---'],
                    ['Address', orderData?.data?.address],
                    ['Country', orderData?.data?.country],
                    ['City', orderData?.data?.city],
                    ['State/Province', orderData?.data?.state],
                    ['Pincode', orderData?.data?.pincode || '---'],
                    ['Street/House #', orderData?.data?.street || '---'],
                    ['Apt/Suite/Floor', orderData?.data?.apartment || '---'],
                    ['Landmark', orderData?.data?.landmark || '---'],
                    ['Order Note', orderData?.data?.ordernote || '---'],
                    ['Payment Method', orderData?.data?.paymentMethod]
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="font-medium py-2">{label}</td>
                      <td className="text-end py-2 text-gray-700">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow rounded-xl p-6 border">
              <h3 className="text-xl font-semibold mb-5">Order Summary</h3>
              <table className="w-full table-fixed text-sm">
                <tbody className="divide-y">
                  <tr>
                    <td className="font-medium py-2">SubTotal</td>
                    <td className="text-end py-2">
                      {orderData?.data?.subTotal.toLocaleString('en-PK', {
                        style: 'currency',
                        currency: 'PKR'
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium py-2">Discount</td>
                    <td className="text-end py-2">
                      {orderData?.data?.discount.toLocaleString('en-PK', {
                        style: 'currency',
                        currency: 'PKR'
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium py-2">Coupon Discount</td>
                    <td className="text-end py-2">
                      {orderData?.data?.couponDiscountAmount.toLocaleString(
                        'en-PK',
                        { style: 'currency', currency: 'PKR' }
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium py-2 text-lg">Total</td>
                    <td className="text-end py-2 text-lg font-semibold text-green-600">
                      {orderData?.data?.totalAmount.toLocaleString('en-PK', {
                        style: 'currency',
                        currency: 'PKR'
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Generate Invoice Button */}
<div className="bg-white shadow rounded-xl p-6 border text-center mt-6">
  <p className="mb-3 text-gray-700">
    If you want to generate the invoice you can click here:
  </p>
  <a
    href={`/invoice/${orderData?.data?.order_id}`} // redirect to invoice page
    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    Generate
  </a>
</div>

          </div>
          
        )}
      </div>
    </div>
  )
}

export default OrderDetails
