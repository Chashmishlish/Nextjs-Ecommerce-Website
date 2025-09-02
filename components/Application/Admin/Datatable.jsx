import React from 'react'
// tanstack querykey leta hai
const Datatable = ({
    queryKey, 
    fetchUrl,
    columnsConfig,
    initialPageSize = 10,
    exportEndpoint,
    deleteEndpoint,
    deleteType,
    trashView,
    createAction
}) => {

    // filter , sorting and pagination states
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilters, setGlobalFilters] = useState('')
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize
    })

  return (
    <div>
      Datatable
    </div>
  )
}

export default Datatable
