import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
type Props = {}
const columns: GridColDef[] = [
  {
    field: 'palletNo',
    headerName: 'Pallet No.',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 90
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
    field: 'modelName',
    headerName: 'Model Name',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'serialNo',
    headerName: 'Serial No.',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'createDocDate',
    headerName: 'Create Date',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'blank',
    headerName: '',
    flex: 1,
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField'
  },
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  }
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', user: 'test1' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', user: 'test2' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', user: 'test3' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', user: 'test4' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', user: 'test5' },
  { id: 6, lastName: 'Melisandre', firstName: null, user: 'test6' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', user: 'test7' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', user: 'test8' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', user: 'test9' }
]
const Loading = ({}: any) => {
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
        <Typography variant='h5'>Part and Pallet</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <Button variant='contained' sx={{ borderRadius: 50 }}>
          <DownloadIcon sx={{ pr: 1 }} />
          Download
        </Button> */}
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
            backgroundColor: '#B2D2A4'
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
            },
            '& .cold': {
              color: 'success.main'
            },
            '& .hot': {
              color: 'error.main'
            }
          }}
          rows={rows}
          columns={columns}
          getCellClassName={(params: GridCellParams<string>) => {
            if (params.field === 'customer') {
              return 'customerField'
            }
            if (params.value == 'Finished') {
              return 'cold'
            }
            if (params.value == 'Repack') {
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

// This gets called on every request
// export async function getServerSideProps() {
//   const response = await httpClient.get('/pallet', {
//     headers: {
//       Accept: 'application/json'
//     }
//   })

//   return {
//     props: {
//       pallet: response.data
//     }
//   }
// }

export default withAuth(Loading)
