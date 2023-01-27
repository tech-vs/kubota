import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import httpClient from '@/utils/httpClient'
import { alpha, Box, Button, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid, GridCellParams, gridClasses, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
type Props = {}

const ODD_OPACITY = 0.2

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}))
const Overall = ({ loadingList }: any) => {
  const router = useRouter()
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const columns: GridColDef[] = [
    {
      field: 'doc_no',
      headerName: 'Document No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'delivery_date',
      headerName: 'Delivery Date',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      type: 'string',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'ref_do_no',
      headerName: 'Ref Doc No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'total_qty',
      headerName: 'Total QTY',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'invoice_no',
      headerName: 'Invoice No',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'round',
      headerName: 'Round',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'customer_name',
      headerName: 'Customer Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'address',
      headerName: 'Customer Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'view',
      headerName: 'View',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        return (
          <Button
            variant='contained'
            onClick={() => router.push(`/preview/${row.id}?type=2`)}
            sx={{ borderRadius: 25 }}
          >
            View
          </Button>
        )
      }
    }
  ]

  const [sortModel, setSortModel] = useState<GridSortModel>(
    [{
      field: 'doc_no',
      sort: 'desc',
    }],
  );

  return (
    <>
      <Box
        component='main'
        sx={{
          display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
          mb: 3,
          position: 'relative',
          height: '30px',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h5'>View Loading List</Typography>
      </Box>

      <Box
        sx={{
          height: 720,
          width: isSM ? '100%' : 1270,
          '& .cold': {
            color: 'success.main'
          },
          '& .hot': {
            color: 'error.main'
          },
          '& .headerField': {
            fontSize: 12
          },
          '& .customerField': {
            backgroundColor: '#c7ddb5'
          },
          '& .cellField': {
            fontSize: 12
          }
        }}
      >
        <StripedDataGrid
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
          rows={loadingList.results}
          columns={columns}
          getCellClassName={(params: GridCellParams<string>) => {
            if (params.field === 'customer') {
              return 'customerField'
            }
            if (params.value == 'OK') {
              return 'cold'
            }
            if (params.value == 'Waiting') {
              return 'hot'
            }
            return ''
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          pageSize={12}
          rowsPerPageOptions={[12]}
          disableSelectionOnClick
          disableVirtualization
          disableExtendRowFullWidth
          disableIgnoreModificationsIfProcessingProps
          disableColumnSelector
        />
      </Box>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get(`/pallet/document/?status=approved`, {
    headers: {
      Accept: 'application/json'
    }
  })
  return {
    props: {
      loadingList: response.data
    }
  }
}

Overall.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}
export default Overall
