import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

const BreadCrumb = ({breadcrumbData}) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {breadcrumbData.length > 0 && 
          breadcrumbData.map((data, index) => {
            return (
              <React.Fragment key={index}> {/* ✅ div ke bajaye Fragment use kiya */}
                <BreadcrumbItem>
                  {index !== breadcrumbData.length - 1 ? (
                    // ✅ Normal items ke liye BreadcrumbLink asChild + Next.js Link
                    <BreadcrumbLink asChild>
                      <Link href={data.href}>{data.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    // ✅ Last item ke liye BreadcrumbPage use karna best practice hai
                    <BreadcrumbPage className="font-semibold">
                      {data.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {/* ✅ Agar last item nahi hai to separator dikhana hai */}
                {index < breadcrumbData.length - 1 && (
                  <BreadcrumbSeparator className="ms-2 mt-1"/>
                )}
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb

// const BreadCrumb = ({breadcrumbData}) => {
//   return (
//             <Breadcrumb className="mb-5">
//         <BreadcrumbList>
//             {breadcrumbData.length > 0 && 
//             breadcrumbData.map((data, index) => {
//             return (
//               index !== breadcrumbData.length - 1
//               ?
//               <div key={index} className="flex items-center">
//                 <BreadcrumbItem >
//                     <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="ms-2 mt-1"/>
//               </div>
//               :
//               <div key={index} className="flex items-center">
//                 <BreadcrumbItem>
//                     <BreadcrumbLink className="font-semibold" href={data.href}>{data.label}</BreadcrumbLink>
//                 </BreadcrumbItem>
//               </div>
//             );
//           })}
//         </BreadcrumbList>
//             </Breadcrumb>
//   )
// }

// export default BreadCrumb
