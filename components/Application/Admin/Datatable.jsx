import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  useMaterialReactTable
} from 'material-react-table'
import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import Link from 'next/link'
import RecyclingIcon from '@mui/icons-material/Recycling'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import useDeleteMutation from '@/hooks/useDeleteMutation'
import ButtonLoading from '../ButtonLoading'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { showToast } from '@/lib/showToast'
import { download, generateCsv, mkConfig } from 'export-to-csv'

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
  // filters, sorting and pagination states
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize
  })

  // row selection state
  const [rowSelection, setRowSelection] = useState({})
  // export loading state
  const [exportLoading, setExportLoading] = useState(false)

  // delete hook
  const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint)

  // delete handler
  const handleDelete = (ids, deleteType) => {
    let c
    if (deleteType === 'PD') {
      c = confirm('Are you sure you want to delete the data permanently?')
    } else {
      c = confirm('Are you sure you want to move data to trash?')
    }

    if (c) {
      deleteMutation.mutate({ ids, deleteType })
      setRowSelection({})
    }
  }

  // // export handler
  // const handleExport = async (selectedRows) => {
  //   setExportLoading(true)
  //   try {
  //     const csvConfig = mkConfig({
  //       fieldSeparator: ',',
  //       decimalSeparator: ',',
  //       useKeysAsHeaders: true,
  //       filename: 'csv-data'
  //     })

  //     let csv

  //     if (Object.keys(rowSelection).length > 0) {
  //       // export only selected rows
  //       const rowData = selectedRows.map((row) => row.original)
  //       csv = generateCsv(csvConfig)(rowData)
  //     } else {
  //       // export all rows
  //       const { data: response } = await axios.get(exportEndpoint)
  //       if (!response.success) throw new Error(response.message)
  //       csv = generateCsv(csvConfig)(response.data)
  //     }

  //     download(csvConfig)(csv)
  //   } catch (error) {
  //     console.log(error)
  //     showToast('error', error.message)
  //   } finally {
  //     setExportLoading(false)
  //   }
  // }

  const handleExport = async (selectedRows) => {
    setExportLoading(true)
    try {
        const csvConfig = mkConfig({
            fieldSeparator: ',',
            decimalSeparator: ',',
            useKeysAsHeaders: true,
            filename: 'export-data'   // generic name
        })

        let rowData = []

        if (selectedRows && Object.keys(rowSelection).length > 0) {
            // selected rows export
            rowData = selectedRows.map(row => row.original)
        } else {
            // fetch all rows from backend (generic endpoint)
            const { data: response } = await axios.get(exportEndpoint)

            // safe fallback
            rowData = response?.data || []

            if (!Array.isArray(rowData) || rowData.length === 0) {
                showToast('error', 'No data available to export')
                return
            }
        }

        const csv = generateCsv(csvConfig)(rowData)
        download(csvConfig)(csv)
    } catch (error) {
        console.log(error)
        showToast('error', error?.message || 'Something went wrong')
    } finally {
        setExportLoading(false)
    }
}


  // fetch data
  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading
  } = useQuery({
    queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
    queryFn: async () => {
      const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
      url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`)
      url.searchParams.set('size', `${pagination.pageSize}`)
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      url.searchParams.set('globalFilter', globalFilter ?? '')
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []))
      url.searchParams.set('deleteType', deleteType)

      const { data: response } = await axios.get(url.href)
      return response
    },
    placeholderData: keepPreviousData
  })

  // init table
  const table = useMaterialReactTable({
    columns: columnsConfig,
    data,
    enableRowSelection: true,
    // getRowId: (row) => row._id,  
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    enableColumnOrdering: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,

    muiToolbarAlertBannerProps: isError
      ? { color: 'error', children: 'Error loading data' }
      : undefined,

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: meta?.totalRowCount ?? 0,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
      rowSelection
    },

    getRowId: (originalRow) => originalRow._id,

    // fixed: return statement added
    renderToolbarInternalActions: ({ table }) => (
      <>
        {/* built-in buttons */}
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />

        {/* recycle bin link */}
        {deleteType !== 'PD' && (
          <Tooltip title="Recycle Bin">
            <Link href={trashView}>
              <IconButton>
                <RecyclingIcon />
              </IconButton>
            </Link>
          </Tooltip>
        )}

        {/* delete all */}
        {deleteType === 'SD' && (
          <Tooltip title="Delete All">
  <span>
    <IconButton
      disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
      onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
    >
      <DeleteIcon />
    </IconButton>
  </span>
</Tooltip>
        )}

        {/* restore + permanent delete */}
        {deleteType === 'PD' && (
          <>
            <Tooltip title="Restore Data">
              <IconButton
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={() => handleDelete(Object.keys(rowSelection), 'RSD')}
              >
                <RestoreFromTrashIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Permanently">
              <IconButton
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </>
    ),

    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActionMenuItems: ({ row }) => createAction(row, deleteType, handleDelete),

    //  fixed: added return
    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip title="Export Data">
        <span>
          <ButtonLoading
            type="button"
            text={
              <>
                <SaveAltIcon fontSize='25' /> Export
              </>
            }
            loading={exportLoading}
            onClick={() => handleExport(table.getSelectedRowModel().rows)}
            className='cursor-pointer'
          />
        </span>
      </Tooltip>
    )
  })

  return <MaterialReactTable table={table} />
}

export default Datatable










// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { MaterialReactTable, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton, useMaterialReactTable } from 'material-react-table'
// import { MRT_ToggleGlobalFilterButton  } from 'material-react-table';
// import React, { useState } from 'react'
// import { IconButton, Tooltip } from '@mui/material'
// import Link from 'next/link'
// import RecyclingIcon from '@mui/icons-material/Recycling';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
// import useDeleteMutation from '@/hooks/useDeleteMutation'
// import ButtonLoading from '../ButtonLoading'
// import SaveAltIcon from '@mui/icons-material/SaveAlt';
// import { showToast } from '@/lib/showToast'
// import { download, generateCsv, mkConfig } from 'export-to-csv'

// const Datatable = ({
//     queryKey,                    // tanstack querykey leta hai
//     fetchUrl,
//     columnsConfig,
//     initialPageSize = 10,
//     exportEndpoint,
//     deleteEndpoint,
//     deleteType,
//     trashView,
//     createAction                 // for action button on every row ...
// }) => {

//     // filter , sorting and pagination states
//     const [columnFilters, setColumnFilters] = useState([])
//     const [globalFilter, setGlobalFilter] = useState('')
//     const [sorting, setSorting] = useState([])
//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: initialPageSize
//     })

//     // Row selection state
//     const [rowSelection, setRowSelection] = useState({})

//     //Export loading state
//     const [exportLoading, setExportLoading] = useState(false)


//     // handle selete method
//     const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint)

//     // delete method
//     const handleDelete = (ids, deleteType) => {
//         let c
//         if (deleteType === 'PD') {
//             c = confirm('Are you sure you want to delete the data permanently?')
//         } else {
//             c = confirm('Are you sure you want to move data to trash?')
//         }

//         if (c) {
//             // folder hook>useDeleteMutation
//             deleteMutation.mutate({ ids, deleteType })
//             setRowSelection({})
//         }
//     }

//     // export method 

//     const handleExport = async (selectedRows) => {
//         setExportLoading(true)
//         try {
//             const csvConfig = mkConfig({
//                 fieldSeparator: ',',
//                 decimalSeparator: ',',
//                 useKeyAsHeaders: true,
//                 filename: 'csv-data'
//             })

//             let csv

//             if (Object.keys(rowSelection).length > 0) {
//                 // export only seleted rows
//                 const rowData = selectedRows.map((row) => row.original)
//                 csv = generateCsv(csvConfig)(rowData)
//             } else {
//                 //export all data
//                 const { data: response } = await axios.get(exportEndpoint)
//                 if (!response.success) {
//                     throw new Error(response.message)
//                 }
//                 const rowData = response.data
//                 csv = generateCsv(csvConfig)(rowData)
//             }

//             download(csvConfig)(csv)

//         } catch (error) {
//             console.log(error);
//             showToast('error', error.message)
//         } finally {
//             setExportLoading(false)
//         }
//     }

//     // Data fetching logics
//     const {
//         data: { data = [], meta } = {},
//         isError,
//         isRefetching,
//         isLoading
//     } = useQuery({
//         queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
        
//         queryFn: async () => {
//             const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            
//             //read our state and pass it to the API as query params
//             url.searchParams.set(
//                 'start',
//                 `${pagination.pageIndex * pagination.pageSize}`,
//             );
//             url.searchParams.set('size', `${pagination.pageSize}`);
//             url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
//             url.searchParams.set('globalFilter', globalFilter ?? '');
//             url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
//             url.searchParams.set('deleteType', deleteType );

//             const { data: response } = await axios.get(url.href)
//             return response
//         },

//         placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
//     });

//     // init table 
//     const table = useMaterialReactTable({
//         columns: columnsConfig,
//         data,
//         enableRowSelection: true,
//         columnFilterDisplayMode: 'popover',
//         paginationDisplayMode: 'pages',
//         enableColumnOrdering: true,
//         enableStickyHeader: true,
//         enableStickyFooter: true,
//         initialState: { showColumnFilters: true },
//         manualFiltering: true,
//         manualPagination: true,
//         manualSorting: true,
//         muiToolbarAlertBannerProps: isError
//             ? {
//                 color: 'error',
//                 children: 'Error loading data',
//             }
//             : undefined,

//         onColumnFiltersChange: setColumnFilters,
//         onGlobalFilterChange: setGlobalFilter,
//         onPaginationChange: setPagination,
//         onSortingChange: setSorting,
//         rowCount: data?.meta?.totalRowCount ?? 0,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             columnFilters,
//             globalFilter,
//             isLoading,
//             pagination,
//             showAlertBanner: isError,
//             showProgressBars: isRefetching,
//             sorting,
//             rowSelection
//         },

//         getRowId: (originalRow) => originalRow._id,

//         renderToolbarInternalActions: ({ table }) => {
            
//             <>
//                 {/* built-in buttons */}
//                 <MRT_ToggleGlobalFilterButton  table={table} />
//                 <MRT_ShowHideColumnsButton table={table} />
//                 <MRT_ToggleFullScreenButton table={table} />
//                 <MRT_ToggleDensePaddingButton table={table} />
            


//                 {deleteType !== 'PD' && (
//                     <Tooltip title="Recycle Bin">
//                         <Link href={trashView}>
//                             <IconButton>
//                                 <RecyclingIcon />
//                             </IconButton>
//                         </Link>
//                     </Tooltip>
//                 )}

//                 {deleteType === 'SD'
//                     &&
//                     <Tooltip title="Delete All">
//                         <IconButton
//                             disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
//                             onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
//                         >
//                             <DeleteIcon />
//                         </IconButton>
//                     </Tooltip>
//                 }

//                 {deleteType === 'PD'
//                     &&
//                     <>
//                         <Tooltip title="Restored Data">
//                             <IconButton
//                                 disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
//                                 onClick={() => handleDelete(Object.keys(rowSelection), 'RSD')}
//                             >
//                                 <RestoreFromTrashIcon />
//                             </IconButton>
//                         </Tooltip>

//                         <Tooltip title="Delete Permanently">
//                             <IconButton
//                                 disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
//                                 onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
//                             >
//                                 <DeleteForeverIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </>
//                 }
//             </>
//         },

//         enableRowActions: true,
//         positionActionsColumn: 'last',
//         renderRowActionMenuItems: ({ row }) => createAction(row, deleteType, handleDelete),

//         renderTopToolbarCustomActions: ({ table }) => {
//             <Tooltip>
//                 <ButtonLoading
//                     type="button"
//                     text={<><SaveAltIcon /> Export </>}
//                     loading={exportLoading}
//                     onClick={() => handleExport(table.getSelectedRowModel().rows)}
//                 />
//             </Tooltip>
//         }
//     });

//     return (
//         <MaterialReactTable table={table} />
//     )
    
// }

// export default Datatable
// // export method : https://www.npmjs.com/package/export-to-csv
