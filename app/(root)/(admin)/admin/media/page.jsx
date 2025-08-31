import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoutes'
import React from 'react'
import { Card,  CardContent,  CardHeader} from '@/components/ui/card'
import { useInfiniteQuery } from '@tanstack/react-query'

const breadcrumbData = [
    {href: ADMIN_DASHBOARD, label: 'Home' },
    {href: '', label: 'Media' },

]
const MediaPage = () => {

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
         queryKey: ['projects'],
         queryFn: fetchProjects,
         initialPageParam: 0,
         getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })




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

                </CardContent>
            </Card>
        </div>
    )
}

export default MediaPage
// tanstack query latest : website
// https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries#what-if-i-want-to-implement-a-bi-directional-infinite-list
