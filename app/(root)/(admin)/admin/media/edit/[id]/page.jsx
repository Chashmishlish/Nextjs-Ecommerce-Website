'use client'
import { use } from 'react'
import useFetch from '@/hooks/useFetch'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoutes'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Card , CardHeader } from '@/components/ui/card'

const breadCrumbData = [
  {
    href: ADMIN_DASHBOARD,
    label: 'Home'
  },
  {
    href: ADMIN_MEDIA_SHOW,
    label: 'Media'
  },
  {
    href: "",
    label: 'Edit Media'
  },

];

const EditMedia = ({ params }) => {
  const { id } = use(params);
  const { data: mediaData } = useFetch(`/api/media/get/${id}`)

  // Prevent error by checking before render
  // if (!mediaData) {
  //   return <div>Loading...</div>;
  // }
  // console.log(mediaData);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />

      <Card className="py-0 rounded shadow-sm">
                      <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                          <div className='flex justify-between items-center'>
                              <h4 className='font-semibold text-xl uppercase'>
      
                                  {deleteType === 'SD' ? 'Media' : 'Media Trash'}
      
                              </h4>
                              <div className='flex items-center gap-5'>
                                  {deleteType === 'SD' && <UploadMedia isMultiple={true} queryClient={queryClient} />}
      
      
                                  <div className='flex gap-3'>
                                      {deleteType === 'SD' ? (
                                          <Button type='button' variant='destructive'>
                                              <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`}>
      
                                                  Trash
                                              </Link>
                                          </Button>
                                      ) : (
                                          <Button type='button' >
                                              <Link href={`${ADMIN_MEDIA_SHOW}`}>
                                                  Back To Media
                                              </Link>
                                          </Button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      </CardHeader>
                      <CardContent className='pb-5'>
      
                          {selectedMedia.length > 0
                              &&
                              <div className='py-2 px-3 bg-pink-200 mb-2 rounded flex justify-between items-center'>
                                  <Label>
                                      <Checkbox
                                          checked={selectAll}
                                          onCheckedChange={handleSelectAll}
                                          className="border-primary"
                                      />
                                      Select All
                                  </Label>
      
                                  <div className='flex gap-2'>
                                      {deleteType === 'SD' ? (
                                          <Button
                                              variant='destructive' className='cursor-pointer'
                                              onClick={() => handleDelete(selectedMedia, deleteType)}
                                          >
                                              Move Into Trash
                                          </Button>
                                      ) : (
                                          <>
                                              <Button
                                                  className='bg-green-500 hover:bg-green-600'
                                                  onClick={() => handleDelete(selectedMedia, "RSD")}
                                              >
                                                  Restore
                                              </Button>
      
                                              <Button
                                                  variant='destructive'
                                                  onClick={() => handleDelete(selectedMedia, deleteType)}
                                              >
                                                  Delete Permanently
                                              </Button>
                                          </>
                                      )}
                                  </div>
                              </div>
                          }
      
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
                                      <>
                                          {data.pages.flatMap(page => page.mediaData.map(media => media._id)).length === 0 && <div > Data not found. </div>}
                                          <div className='grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5'>
                                              {
                                                  data?.pages?.map((page, index) => (
                                                      <React.Fragment key={index}>
                                                          {
                                                              page?.mediaData?.map((media) => (
                                                                  <Media key={media._id}
                                                                      media={media}
                                                                      handleDelete={handleDelete}
                                                                      deleteType={deleteType}
                                                                      selectedMedia={selectedMedia}
                                                                      setSelectedMedia={setSelectedMedia}
                                                                  />
                                                              ))
                                                          }
                                                      </React.Fragment>
                                                  ))
                                              }
                                          </div>
                                      </>
      
                          }
      
                          {hasNextPage &&
                          <ButtonLoading type="button" className="cursor-pointer" loading={isFetching} onClick={() => fetchNextPage()} text="Load More"/>
                          }
                      </CardContent>
                  </Card>
    </div>
  );
};

export default EditMedia
