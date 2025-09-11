'use client'
import React, { useState } from 'react'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import useWindowSize from '@/hooks/useWindowSize'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import ProductBox from '@/components/Application/Website/ProductBox'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Button } from '@/components/ui/button'

const breadcrumb = {
  title: 'Shop',
  links: [
    { label: 'Shop', href: WEBSITE_SHOP }
  ]
}

const Shop = () => {
  const searchParams = useSearchParams().toString()
  const [limit, setLimit] = useState(9)
  const [sorting, setSorting] = useState('default_sorting')
  const [isMobileFilter, setIsMobileFilter] = useState(false)
  const windowSize = useWindowSize()

  // ✅ API call with debug log
  const fetchProduct = async (pageParam = 0) => {
    const { data: getProduct } = await axios.get(
      `/api/shop?page=${pageParam}&limit=${limit}&sort=${sorting}&${searchParams}`
    )

    // console.log("🔍 API RAW RESPONSE:", getProduct) // 👈 Debug 1

    if (!getProduct.success) {
      return { products: [], nextPage: null }
    }

    return {
      products: getProduct.data?.products || [],
      nextPage: getProduct.data?.nextPage ?? null,
    }
  }

  // ✅ Infinite query with debug log
  const {
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', limit, sorting, searchParams],
    queryFn: ({ pageParam = 0 }) => fetchProduct(pageParam), // start 0-based
    initialPageParam: 0, // ✅ as you want
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? null,
  })
  // console.log("🟢 useInfiniteQuery DATA:", data) // 👈 Debug 2

  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <section className='lg:flex lg:px-32 px-4 my-20'>

        {windowSize.width > 1024 ? (
          <div className='w-72 me-4'>
            <div className='stick top-0 bg-pink-50 p-4 rounded'>
              <Filter />
            </div>
          </div>
        ) : (
          <Sheet open={isMobileFilter} onOpenChange={() => setIsMobileFilter(false)}>
            <SheetContent side='left' className='block'>
              <SheetHeader className="border-b">
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className=" p-4 overflow-auto h-[calc(100vh-80px)]">
                <Filter />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="lg:[calc(100%-18rem)] w-full">
          <Sorting
            limit={limit}
            setLimit={setLimit}
            sorting={sorting}
            setSorting={setSorting}
            mobileFilterOpen={isMobileFilter}
            setMobileFilterOpen={setIsMobileFilter}
          />

          {isFetching && <div className='p-3 font-semibold text-center'>Loading...</div>}
          {error && <div className='p-3 font-semibold text-center'>{error.message}</div>}

          <div className='grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5 mt-10'>
            {data?.pages.map((page, i) => {
              // console.log("📦 Page Data:", page) // 👈 Debug 3
              return page.products.map((product, idx) => (
                <ProductBox key={`${i}-${idx}`} product={product} />
              ))
            })}
          </div>

          <div className='flex justify-center mt-10 text-center'>
            {hasNextPage ? (
              <Button
                onClick={() => fetchNextPage()}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-800 text-white rounded-lg shadow-md hover:from-pink-600 hover:to-silver-900 transition-all duration-300"
              >
                Load More
              </Button>
            ) : (
              <p className="text-gray-500 font-medium">No more data found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop


// // code by me
// 'use client'
// import React, { useState } from 'react'
// import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
// import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
// import Filter from '@/components/Application/Website/Filter'
// import Sorting from '@/components/Application/Website/Sorting'
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet"
// import useWindowSize from '@/hooks/useWindowSize'
// import { useSearchParams } from 'next/navigation'
// import axios from 'axios'
// import { useInfiniteQuery } from '@tanstack/react-query'
// import ProductBox from '@/components/Application/Website/ProductBox'

// const breadcrumb = {
//   title: 'Shop',
//   links: [
//     { label: 'Shop', href: WEBSITE_SHOP }
//   ]
// }
// const Shop = () => {
//   const searchParams = useSearchParams().toString()
//   const [limit, setLimit] = useState(9)
//   const [sorting, setSorting] = useState('default_sorting')
//   const [isMobileFilter, setIsMobileFilter] = useState(false)
//   const windowSize = useWindowSize()

//   const fetchProduct = async (pageParam) => {
//     const { data: getProduct } = await axios.get(
//       `/api/shop?page=${pageParam}&limit=${limit}&sort=${sorting}&${searchParams}`
//     );

//     if (!getProduct.success) {
//        return { products: [], nextPage: null };
//       // return null;
//     }

//     return {
//     products: getProduct.data?.products || [],
//     nextPage: getProduct.data?.nextPage ?? null,
//     };
//   };

//   const { error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
//     queryKey: ['products', limit, sorting, searchParams],
//     queryFn: async ({ pageParam }) => await fetchProduct(pageParam),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => {
//       return lastPage.nextPage;
//     }
//   });

//   console.log(data);


//   return (
//     <div>
//       <WebsiteBreadcrumb props={breadcrumb} />
//       <section className='lg:flex lg:px-32 px-4 my-20'>
//         {windowSize.width > 1024 ?

//           <div className='w-72 me-4'>
//             <div className='stick top-0 bg-pink-50 p-4 rounded'>
//               <Filter />
//             </div>
//           </div>

//           :

//           <Sheet open={isMobileFilter} onOpenChange={() => setIsMobileFilter(false)}>
//             <SheetContent side='left' className='block'>
//               <SheetHeader className="border-b">
//                 <SheetTitle>Filter</SheetTitle>
//               </SheetHeader>
//               <div className=" p-4 overflow-auto h-[calc(100vh-80px)]">
//                 <Filter />
//               </div>
//             </SheetContent>
//           </Sheet>
//         }


//         <div className="lg:[calc(100%-18rem)]">
//           <Sorting
//             limit={limit}
//             setLimit={setLimit}
//             sorting={sorting}
//             setSorting={setSorting}
//             mobileFilterOpen={isMobileFilter}
//             setMobileFilterOpen={setIsMobileFilter}
//           />

//           {isFetching && <div className='p-3 font-semibold text-center'>Loading...</div>}
//           {error && <div className='p-3 font-semibold text-center'>{error.message}</div>}

//           <div className='grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5'>
//             {data && data.pages.map(page => (
//               <></>
//             ))}
//           </div>
//         </div>

//       </section>
//     </div>
//   )
// }

// export default Shop
// npx shadcn@latest add sheet