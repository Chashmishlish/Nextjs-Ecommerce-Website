import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoutes'
import React from 'react'
import { Card,  CardContent,  CardHeader} from '@/components/ui/card'

const breadcrumbData = [
    {href: ADMIN_DASHBOARD, label: 'Home' },
    {href: '', label: 'Media' },

]
const MediaPage = () => {

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