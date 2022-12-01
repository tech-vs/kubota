import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import PageviewIcon from '@mui/icons-material/Pageview'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
type Props = {}
const columns: GridColDef[] = [
  {
    field: 'customer',
    headerName: 'Customer',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField'
  },
  {
    field: 'shopping',
    headerName: 'Shopping',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    type: 'string',
    cellClassName: 'cellField'
  },
  {
    field: 'qGate',
    headerName: 'Q-Gate',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField'
  },
  {
    field: 'loading',
    headerName: 'Loading',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField'
  },
  {
    field: 'truckOut',
    headerName: 'Truck Out',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField'
  },
  {
    field: 'deliveryTime',
    headerName: 'Delivery Time',
    headerClassName: 'headerField',
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'blank',
    headerName: '',
    headerClassName: 'headerField',
    flex: 1
  },
  {
    field: 'action',
    headerName: '',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    width: 125,
    renderCell: () => {
      return (
        <Button variant='contained' onClick={() => null} sx={{ borderRadius: 50 }}>
          <PageviewIcon sx={{ pr: 1 }} />
          View
        </Button>
      )
    }
  }
]

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
const Overall = ({}: Props) => {
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
        <Typography variant='h5'>Delivery Daily Information</Typography>
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
          rows={rows}
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
          disableColumnFilter
          disableColumnMenu
        />
      </Box>
    </Layout>
  )
}

export default withAuth(Overall)
