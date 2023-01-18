import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import httpClient from '@/utils/httpClient'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

type Props = {}

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
const Overall = ({ packingList }: any) => {
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'internal_pallet_no',
      headerName: 'Internal Pallet No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'model_code',
      headerName: 'Model Code',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      type: 'string',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'model_name',
      headerName: 'Model Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'serial_no',
      headerName: 'Serial No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'country_code',
      headerName: 'Country Code',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'country_name',
      headerName: 'Country Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'distributor_code',
      headerName: 'Distributor Code',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'distributor_name',
      headerName: 'Distributor Name',
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
            onClick={() => router.push(`/preview/${row.pallet_id}?type=1`)}
            sx={{ borderRadius: 25 }}
          >
            View
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
          display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
          mb: 3,
          position: 'relative',
          height: '30px'
        }}
      >
        <Typography variant='h5'>View Packing List</Typography>
      </Box>

      <Box
        sx={{
          height: 720,
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
            fontSize: 12,
            fontWeight: '700'
          }
        }}
      >
        <DataGrid
          getRowId={packingList => packingList.serial_no}
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          rows={packingList}
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
          pageSize={12}
          rowsPerPageOptions={[12]}
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
  const response = await httpClient.get(`/pallet/part-list/?packing_status=TRUE`)

  return {
    props: {
      packingList: response.data
    }
  }
}
export default withAuth(Overall)
