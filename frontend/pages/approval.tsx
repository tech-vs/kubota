import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { approveDocument } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
type Props = {}

const VISIBLE_FIELDS = ['modelCode']

const rows = [
  { id: 1, customer: 'Toyota', shopping: 'OK', qGate: 'OK', loading: 'Waiting' },
  { id: 2, customer: 'AAT', shopping: 'Waiting', qGate: 'OK', loading: 'Waiting' },
  { id: 3, customer: 'Ford', shopping: 'OK', qGate: 'OK', loading: 'Waiting' },
  { id: 4, customer: 'Isuzu', shopping: 'OK', qGate: 'OK', loading: 'Waiting' },
  { id: 5, customer: 'Honda', shopping: 'OK', qGate: 'OK', loading: 'Waiting' },
  { id: 6, customer: 1, shopping: 'OK', qGate: 'Waiting', loading: 'Waiting' },
  { id: 7, customer: 1, shopping: 'Waiting', qGate: 'OK', loading: 'Waiting' },
  { id: 8, customer: 1, shopping: 'Waiting', qGate: 'OK', loading: 'Waiting' },
  { id: 9, customer: 1, shopping: 'Waiting', qGate: 'OK', loading: 'Waiting' }
]
const Approval = ({ list }: any) => {
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

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
      width: 150
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
      width: 150
    },
    {
      field: 'invoice_no',
      headerName: 'Invoice No.',
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
      width: 150
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
      headerName: 'Address',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },

    {
      field: 'blank',
      headerName: '',
      headerClassName: 'headerField',
      flex: 1
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
    },
    {
      field: 'approve',
      headerName: 'Approval',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      width: 125,
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        return (
          <Button
            variant='contained'
            onClick={async () => {
              await approveDocument(row.id)
              refreshData()
            }}
            sx={{ borderRadius: 50 }}
          >
            Approve
          </Button>
        )
      }
    }
  ]
  return (
    <Layout>
      <Box
        component='main'
        sx={{
          display: { xs: 'none', md: 'flex', flexDirection: 'row' },
          mb: 3,
          position: 'relative',
          height: '30px'
        }}
      >
        <Typography variant='h5'>Management Approval</Typography>
      </Box>

      <Box
        sx={{
          height: 360,
          width: '100%',
          '& .cold': {
            color: 'success.main'
          },
          '& .hot': {
            color: 'error.main'
          },
          '& .headerField': {
            fontSize: 16,
            backgroundColor: '#55AAFF'
          },
          '& .customerField': {
            backgroundColor: '#c7ddb5'
          },
          '& .cellField': {
            fontSize: 20,
            fontWeight: '700'
          }
        }}
      >
        <DataGrid
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          rows={list.results}
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
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableVirtualization
          disableExtendRowFullWidth
          disableIgnoreModificationsIfProcessingProps
          disableColumnSelector
        />
      </Box>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get(`pallet/document/?status=wait_approve`, {
    headers: {
      Accept: 'application/json'
    }
  })

  return {
    props: {
      list: response.data
    }
  }
}

export default withAuth(Approval)
