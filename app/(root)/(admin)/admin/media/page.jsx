'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoutes'
import React, {useState} from 'react'
import { Card,  CardContent,  CardHeader} from '@/components/ui/card'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const breadcrumbData = [
    {href: ADMIN_DASHBOARD, label: 'Home' },
    {href: '', label: 'Media' },
]

const MediaPage = () => {

    const [deleteType, setDeleteType] = useState('SD')  //bydefault SD

    const fetchMedia = async (page, deleteType) => {
        const {data: response} = await axios.get(`/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`)
        console.log(response);
        return response
    };

      const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
         queryKey: ['media-data', deleteType],
         queryFn: async ({ pageParam}) => await fetchMedia(pageParam, deleteType),
         initialPageParam: 0,
         getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length 
            return lastPage.hasMore ? nextPage : undefined 
         },
  })

  
  console.log(data);
  

  
  return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData}/>
            <Card className="py-0 rounded shadow-sm">
                <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                    <div className='flex justify-between items-center'>
                        <h4 className='font semi-bold text-xl uppercase'>Media</h4>
                        <div className='flex items-center gap-5'>
                            <UploadMedia/>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>

    {
        status === "pending"
            ?
            <div>Loading...</div>
            :
            status === 'error' ?
            <div className='text-pink-500 text-sm'>
                {error.message}
            </div>
            :
            <div className='grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5'>
                {
                data?.pages?.map((page, index) => (
                    <React.Fragment key={index}>
                        {
                            page?.mediaData?.map((media) => (
                                <div key={media._id}> {media._id} </div>
                            ))
                        }
                    </React.Fragment>
                  ))
                }
            </div>
    }
                </CardContent>
            </Card>
        </div>
    )
}

export default MediaPage
// tanstack query latest : website
// https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries#what-if-i-want-to-implement-a-bi-directional-infinite-list
