import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton, MRT_ToggleGlobalFilterButton, useMaterialReactTable } from 'material-react-table'
import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import Link from 'next/link'
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
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

    // Row selection state
    const [rowSelection, setRowSelection] = useState()

    // handle selete method
    const handleDelete = () => {

    }

    // Data fetching logics
    const {
        data: { data = [], meta } = {},
        isError,
        isRefetching,
        isLoading
    } = useQuery({
        queryKey: [queryKey, { columnFilters, globalFilters, pagination, sorting }],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            //read our state and pass it to the API as query params
            url.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            );
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

            const { data: response } = await axios.get(url.href)
            return response
        },

        placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
    });

    // init table 
    const table = useMaterialReactTable({
         columns: columnsConfig,
         data,
         enableRowSelection: true,
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
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,

         onColumnFiltersChange: setColumnFilters,
         onGlobalFilterChange: setGlobalFilter,
         onPaginationChange: setPagination,
         onSortingChangeange: setSorting,
         rowCount: data?.meta?.totalRowCount ?? 0,
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

         renderToolbarInternalActions: ({ table }) => {
            <>
                {/* built-in buttons */}
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />


                {deleteType !== 'PD' && (
                    <Tooltip title="Recycle Bin">
                        <Link href={trashView}>
                            <IconButton>
                                <RecyclingIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                )}

                {deleteType === 'SD' && (
                    <Tooltip title="Delete All">
                        <IconButton
                            disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                            onClick={() => handleDelete()}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}

                {deleteType === 'PD' 
                && 
                    <>
                        <Tooltip title="Restored Data">
                            <IconButton
                                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                onClick={() => handleDelete()}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Permanently">
                            <IconButton
                                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                onClick={() => handleDelete()}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </>
       },
  });

    return 
        <div>
            Datatable
        </div>
}

export default Datatable
