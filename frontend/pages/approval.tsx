import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
type Props = {}

const VISIBLE_FIELDS = ['modelCode']
const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'createdBy',
    headerName: 'Created By',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    type: 'string',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'idNo',
    headerName: 'ID No.',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'modelCode',
    headerName: 'Model Code',
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
    field: 'approve',
    headerName: 'Approval',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    width: 125,
    renderCell: () => {
      return (
        <Button variant='contained' onClick={() => null} sx={{ borderRadius: 50 }}>
          Approve
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
const Approval = ({}: Props) => {
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
          disableVirtualization
          disableExtendRowFullWidth
          disableIgnoreModificationsIfProcessingProps
          disableColumnSelector
          // disableColumnFilter
          // disableColumnMenu
        />
      </Box>
    </Layout>
  )
}

export default withAuth(Approval)
