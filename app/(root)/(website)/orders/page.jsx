'use client'
import Loading from '@/components/Application/loading'
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import useFetch from '@/hooks/useFetch'
import { WEBSITE_ORDER_DETAILS } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import React from 'react'

const breadCrumbData = {
  title: 'Orders',
  links: [{ label: 'Orders' }]
}

const Orders = () => {
  const { data: orderData, loading } = useFetch("/api/user-order")

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className="shadow-xl rounded-2xl border bg-white/70 backdrop-blur-md">
          {/* Header */}
          <div className="p-5 text-xl font-bold border-b text-gray-800">
            Orders
          </div>

          {/* Content */}
          <div className="p-5">
            {loading ? (
              <div className="text-center py-10">
                <Loading />
              </div>
            ) : (
              <div className="overflow-auto rounded-xl border">
                <table className="w-full border-collapse">
                  <thead className="bg-white/60 backdrop-blur-sm">
                    <tr>
                      <th className="text-start p-3 text-sm font-semibold text-gray-600 border-b">Sr. No.</th>
                      <th className="text-start p-3 text-sm font-semibold text-gray-600 border-b">Order ID</th>
                      <th className="text-start p-3 text-sm font-semibold text-gray-600 border-b">Total Items</th>
                      <th className="text-start p-3 text-sm font-semibold text-gray-600 border-b">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderData?.data?.map((order, i) => (
                      <tr
                        key={order._id}
                        className="odd:bg-white even:bg-white/50 hover:bg-pink-50 transition-colors duration-300"
                      >
                        <td className="p-3 text-sm font-bold text-gray-800">{i + 1}</td>
                        <td className="p-3 text-sm">
                          <Link
                            className="text-pink-600 font-medium hover:text-pink-800 transition"
                            href={WEBSITE_ORDER_DETAILS(order.order_id)}
                          >
                            {order.order_id}
                          </Link>
                        </td>
                        <td className="p-3 text-sm">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold">
                            {order.products.length}
                          </span>
                        </td>
                        <td className="p-3 text-sm font-semibold text-green-600">
                          {order.totalAmount.toLocaleString('en-PK', {
                            style: 'currency',
                            currency: 'PKR',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </UserPanelLayout>
    </div>
  )
}

export default Orders




// 'use client'
// import Loading from '@/components/Application/loading'
// import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
// import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
// import useFetch from '@/hooks/useFetch'
// import { WEBSITE_ORDER_DETAILS } from '@/routes/WebsiteRoute'
// import Link from 'next/link'
// import React from 'react'
// const breadCrumbData = {
//   title: 'Orders',
//   links: [{ label: 'Orders' }]
// }

// const Orders = () => {
//   const {data:orderData, loading} = useFetch("/api/user-order")
//   return (

//     <div>
//       <WebsiteBreadcrumb props={breadCrumbData} />
//       <UserPanelLayout>
//         <div className="shadow rounded ">
//           <div className='p-5 text-xl font-semibold border-b '>
//             Orders
//           </div>
//             <div className='p-5'>
//             {loading ?
//             <div className='text-center py-5'>Loading...</div>
//           :
//           <div className='overflow-auto'>
//             <table className='w-full'>
//               <thead>
//                 <tr>
//                   <th className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Sr.No.</th>
//                   <th className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Order id</th>
//                   <th className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Total Item</th>
//                   <th className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Amount</th>
//                 </tr>
//               </thead>

//               <tbody>
//                     {orderData && orderData?.data?.map((order, i) => (
//                       <tr keey={order._id}>
//                       <td className='text-start text-sm text-gray-500 p-2 font-bold'>{i + 1}</td>
//                       <td className='text-start text-sm text-gray-500 p-2 '>
//                         <Link className='underline hover:text-blue-500 underline-offset-2' href={WEBSITE_ORDER_DETAILS(order.order_id)}>{order.order_id}</Link></td>
//                       <td className='text-start text-sm text-gray-500 p-2'>
//                         {order.products.length}</td>
//                       <td className='text-start text-sm text-gray-500 p-2'>
//                         {order.totalAmount.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</td>
              
//                       </tr>
//                     ))}
//                   </tbody>
//             </table>
//           </div>
//           }



          
//         </div>
//     </div>
// </UserPanelLayout >
      
//   </div>  
//   )
// }

// export default Orders
