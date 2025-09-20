'use client'

import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import imgPlaceholder from '@/public/assests/images/img-placeholder.webp';
import { WEBSITE_HOME, WEBSITE_ORDER_DETAILS } from '@/routes/WebsiteRoute';
import { useRouter } from 'next/navigation';

export default function InvoicePage({ params }) {
  const router = useRouter();
  const { orderid } = params;

  const [orderData, setOrderData] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${orderid}`
        );
        setOrderData(data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [orderid]);

    // **Status badge function define karna bahar ya andar component ke**
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Paid</span>;
      case 'cod':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">COD</span>;
      case 'pending':
        return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-semibold">Pending</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">{status}</span>;
    }
  };

  // Update document title dynamically for print
  useEffect(() => {
    if (orderData) {
      document.title = `Invoice-${orderData.order_id || orderid}`;
    }
  }, [orderData, orderid]);

  const printInvoice = () => {
    if (!invoiceRef.current) return;
    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };



  return (
      <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <div ref={invoiceRef} className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Top Bar with Buttons */}
<div className="bg-indigo-700 text-white px-4 py-2 flex items-center justify-between">
  {/* Left Button */}
  <button
    onClick={() => router.push(WEBSITE_ORDER_DETAILS(orderid))}
    className="text-white text-lg font-bold px-2 py-1 rounded hover:bg-indigo-600 transition"
  >
    ←
  </button>

  {/* Center Text */}
  <span className="text-sm font-medium">Thank you for shopping from us</span>

  {/* Right Button */}
  <button
    onClick={() => router.push('/')}
    className="text-white text-lg font-bold px-2 py-1 rounded hover:bg-indigo-600 transition"
  >
    ➝
  </button>
</div>

        {/* Header */}
        <div className="bg-indigo-600 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">

          <div>
            <h1 className="text-3xl font-bold">Smilish Store</h1>
            <p className="text-sm">Invoice</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm">Order ID: <span className="font-semibold">{orderid}</span></p>
            <p className="text-sm">Date: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            {orderData && <p className="mt-1">{getStatusBadge(orderData.paymentMethod)}</p>}
          </div>
        </div>



        {/* Customer & Shipping Info */}
        {orderData ? (
          <>
            {/* <div className="p-6 grid md:grid-cols-2 gap-6"> */}
               <div className="bg-white  shadow-lg p-6 ">
              <h4 className="text-lg font-semibold mb-5 border-b pb-2">Customer Info</h4>
                {/* <h3 className="font-semibold text-lg mb-2">Customer Info</h3> */}
                <p><strong>Name:</strong> {orderData.firstName} {orderData.lastName}</p>
                <p><strong>Email:</strong> {orderData.email}</p>
                <p><strong>Phone:</strong> {orderData.phone}</p>
                <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
              </div>
            <div className="bg-wite  shadow-lg p-6 ">
              <h4 className="text-lg font-semibold mb-5 border-b pb-2">Shipping Address</h4>
                {/* <h3 className="font-semibold text-lg mb-2">Shipping Address</h3> */}
                <p className='font-semibold'>Address: {orderData.address} </p> 
                <p className='text-sm'>{orderData.country} , {orderData.state} , {orderData.city}.</p>
                <p className='text-sm'>{orderData.pincode || "---"}</p>
              </div>
            

            {/* Products Table */}
            <div className="p-6 overflow-x-auto">
              <h3 className="font-semibold text-lg mb-2">Products</h3>
              <table className="w-full border-collapse text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Color</th>
                    <th className="p-3 text-left">Size</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.products.map((p, idx) => (
                    <tr key={p.variantId._id} className={`${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="p-3 flex items-center gap-2">
                        <Image
                          src={p.variantId.media[0]?.secure_url || imgPlaceholder.src}
                          alt="product"
                          width={60}
                          height={60}
                          className="rounded border"
                        />
                        {p.productId.name}
                      </td>
                      <td className="p-3">{p.variantId.color}</td>
                      <td className="p-3">{p.variantId.size}</td>
                      <td className="p-3 text-center">{p.qty}</td>
                      <td className="p-3 text-right">{p.sellingPrice.toLocaleString('en-PK', { style:'currency', currency:'PKR' })}</td>
                      <td className="p-3 text-right">{(p.qty * p.sellingPrice).toLocaleString('en-PK', { style:'currency', currency:'PKR' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-gray-100 rounded-lg mt-4">
              <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Subtotal:</span>
                <span>{orderData.subTotal.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span>

                {/* <span>Discount:</span>
                <span>{orderData.discount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span>

                <span>Coupon Discount:</span>
                <span>{orderData.couponDiscountAmount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span> */}

                {/* Optional delivery charges if available */}
                {/* <span>Delivery Charges:</span>
                <span>{orderData.deliveryCharges ? orderData.deliveryCharges.toLocaleString('en-PK', { style:'currency', currency:'PKR'}) : '0 PKR'}</span> */}

                <span className="font-semibold text-green-600">Total:</span>
                <span className="font-semibold text-green-600">
                  {(orderData.totalAmount).toLocaleString('en-PK', { style:'currency', currency:'PKR'})}
                </span>
                <span className="text-xs text-red-600">Including Delivery Charges.</span>
              </div>
              
            </div>

            {/* Footer */}
            <div className="p-6 text-center text-gray-500 text-sm mt-6 border-t">
              Thank you for shopping with <strong>Smilish Store</strong>!<br/>
              Visit us at: <a href="/" className="text-indigo-600">www.smilishstore.com</a>
            </div>
          </>
        ) : (
          <p className="p-6">Loading...</p>
        )}
      </div>

      {/* Print Button */}
<div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={printInvoice} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer">
          Print Invoice
        </button>
         
      </div>
    </div>
)}



    // <div className="p-4 sm:p-6 bg-gray-100 min-h-screen flex flex-col items-center">
    //   <div ref={invoiceRef} className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        
    //     {/* Header */}
    //     <div className="bg-indigo-600 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
    //       <div>
    //         <h1 className="text-2xl sm:text-3xl font-bold">Smilish Store</h1>
    //         <p className="text-sm">Invoice</p>
    //       </div>
    //       <div className="text-left sm:text-right">
    //         <p className="text-sm">Order ID: <span className="font-semibold">{orderid}</span></p>
    //         <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>

    //       </div>
    //     </div>

    //     {/* Customer & Shipping Info */}
    //     {orderData ? (
    //       <>
    //         <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
    //           <div className="p-4 border rounded-md bg-gray-50">
    //             <h3 className="font-semibold text-lg mb-2">Customer Info</h3>
    //             <p><strong>Name:</strong> {orderData.firstName} {orderData.lastName}</p>
    //             <p><strong>Email:</strong> {orderData.email}</p>
    //             <p><strong>Phone:</strong> {orderData.phone}</p>
    //             <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
    //           </div>
    //           <div className="p-4 border rounded-md bg-gray-50">
    //             <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
    //             <p>{orderData.address}, {orderData.city}, {orderData.state}, {orderData.country}, {orderData.pincode}</p>
    //           </div>
    //         </div>

    //         {/* Products Table */}
    //         <div className="p-6 overflow-x-auto">
    //           <h3 className="font-semibold text-lg mb-2">Products</h3>
    //           <table className="w-full border-collapse text-sm sm:text-base min-w-[600px]">
    //             <thead>
    //               <tr className="bg-gray-200">
    //                 <th className="p-3 text-left">Product</th>
    //                 <th className="p-3 text-left">Color</th>
    //                 <th className="p-3 text-left">Size</th>
    //                 <th className="p-3 text-center">Qty</th>
    //                 <th className="p-3 text-right">Price</th>
    //                 <th className="p-3 text-right">Total</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {orderData.products.map((p, idx) => (
    //                 <tr key={p.variantId._id} className={`${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
    //                   <td className="p-3 flex items-center gap-2">
    //                     <Image
    //                       src={p.variantId.media[0]?.secure_url || imgPlaceholder.src}
    //                       alt="product"
    //                       width={40}
    //                       height={40}
    //                       className="rounded border"
    //                     />
    //                     {p.productId.name}
    //                   </td>
    //                   <td className="p-3">{p.variantId.color}</td>
    //                   <td className="p-3">{p.variantId.size}</td>
    //                   <td className="p-3 text-center">{p.qty}</td>
    //                   <td className="p-3 text-right">{p.sellingPrice.toLocaleString('en-PK', { style:'currency', currency:'PKR' })}</td>
    //                   <td className="p-3 text-right">{(p.qty * p.sellingPrice).toLocaleString('en-PK', { style:'currency', currency:'PKR' })}</td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>

    //         {/* Order Summary */}
    //         <div className="p-6 bg-gray-50 rounded-lg mt-4">
    //           <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
    //           <div className="grid grid-cols-2 gap-2 text-sm">
    //             <span>Subtotal:</span>
    //             <span>{orderData.subTotal.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span>
    //             <span>Discount:</span>
    //             <span>{orderData.discount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span>
    //             <span>Coupon Discount:</span>
    //             <span>{orderData.couponDiscountAmount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span>
    //             <span className="font-semibold text-green-600">Total:</span>
    //             <span className="font-semibold text-green-600">{orderData.totalAmount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</span>
    //           </div>
    //         </div>

    //         {/* Footer */}
    //         <div className="p-6 text-center text-gray-500 text-sm mt-6 border-t">
    //           Thank you for shopping with <strong>Smilish Store</strong>!<br/>
    //           Visit us at: <a href="/" className="text-indigo-600">www.smilishstore.com</a>
    //         </div>
    //       </>
    //     ) : (
    //       <p className="p-6">Loading...</p>
    //     )}

    //   </div>

    //   {/* Print Button */}
    //   <div className="mt-6 w-full flex justify-center">
    //     <button onClick={printInvoice} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto">
    //       Print Invoice
    //     </button>
    //   </div>
    // </div>


// <div className="p-10 bg-gray-100 min-h-screen">
//   <div ref={invoiceRef} className="bg-white shadow p-6 rounded-lg">
//     <h2 className="text-2xl font-bold mb-4">Invoice</h2>

//     {orderData ? (
//       <>
//         <div className="mb-4">
//           <h3 className="font-semibold text-lg">Customer Info</h3>
//           <p><strong>Name:</strong> {orderData.firstName} {orderData.lastName}</p>
//           <p><strong>Email:</strong> {orderData.email}</p>
//           <p><strong>Phone:</strong> {orderData.phone}</p>
//           <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold text-lg">Shipping Details</h3>
//           <p><strong>Address:</strong> {orderData.address}, {orderData.city}, {orderData.state}, {orderData.country}, {orderData.pincode}</p>
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold text-lg">Products</h3>
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">Product</th>
//                 <th className="p-2 border">Color</th>
//                 <th className="p-2 border">Size</th>
//                 <th className="p-2 border">Qty</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderData.products.map((p) => (
//                 <tr key={p.variantId._id} className="border-b last:border-none">
//                   <td className="p-2 border flex items-center gap-2">
//                     <Image
//                       src={p.variantId.media[0]?.secure_url || imgPlaceholder.src}
//                       alt="product"
//                       width={50}
//                       height={50}
//                       className="border rounded"
//                     />
//                     {p.productId.name}
//                   </td>
//                   <td className="p-2 border">{p.variantId.color}</td>
//                   <td className="p-2 border">{p.variantId.size}</td>
//                   <td className="p-2 border">{p.qty}</td>
//                   <td className="p-2 border">{p.sellingPrice.toLocaleString('en-PK', { style:'currency', currency:'PKR' })}</td>
//                   <td className="p-2 border">{(p.qty * p.sellingPrice).toLocaleString('en-PK', { style:'currency', currency:'PKR' })}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-4">
//           <h3 className="font-semibold text-lg">Order Summary</h3>
//           <p><strong>Subtotal:</strong> {orderData.subTotal.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</p>
//           <p><strong>Discount:</strong> {orderData.discount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</p>
//           <p><strong>Coupon Discount:</strong> {orderData.couponDiscountAmount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</p>
//           <p className="font-semibold text-green-600"><strong>Total:</strong> {orderData.totalAmount.toLocaleString('en-PK', { style:'currency', currency:'PKR'})}</p>
//         </div>
//       </>
//     ) : (
//       <p>Loading...</p>
//     )}
//   </div>

//   <div className="mt-5">
//     <button onClick={printInvoice} className="px-4 py-2 bg-green-600 text-white rounded">Print</button>
//   </div>
// </div>