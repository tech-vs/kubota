import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import httpClient from '@/utils/httpClient'
import {
  Box,
  Button,
  Card,
  CardContent, TextField,
  Typography
} from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
type Props = {}
const columns: GridColDef[] = [
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
    type: 'string',
    cellClassName: 'cellField',
    width: 250
  },
  {
    field: 'serialNo',
    headerName: 'ID No.',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'countryCode',
    headerName: 'Country Code',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
    {
    field: 'countryName',
    headerName: 'Country Name',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'distributoeCode',
    headerName: 'Distributor Code',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'distributoeName',
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
]

const rows:any[] = []
const View = ({ checksheets }: any) => {
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const [fileName, setFileName] = useState<string>('')
  const [customer, setCustomer] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const showForm = ({ values, setFieldValue, resetForm }: FormikProps<any>) => {
    const router = useRouter()
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
      router.replace(router.asPath)
    }
    const [scan, setScan] = useState({
      internalPalletNo: '',
    })
    return (
      <Form>
        <Box
          component='main'
          sx={{
            display: { xs: 'none', md: 'flex', flexDirection: 'row' },
            mb: 3,
            position: 'relative',
            height: '30px'
          }}
        >
          <Typography variant='h5'>Scan Internal Pallet</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 3,
                position: 'relative'
              }}
            >
              <TextField
                required
                fullWidth
                id='filled-basic'
                label='Pallet No.'
                variant='filled'
                value={scan.internalPalletNo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setScan({ ...scan, internalPalletNo: e.target.value })
                  setFieldValue('scan.internalPalletNo', e.target.value)

                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 5,
                position: 'relative'
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant='contained'
                onClick={() => {
                  alert("test success")
                  refreshData()
                }}
                color='primary'
                sx={{ marginRight: 1 }}
              >
                Check
              </Button>
              <Box sx={{ flexGrow: 1 }} />
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
        <Card sx={{ mx: 6 }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
            <Box
              component='main'
              sx={{
                display: { xs: 'none', md: 'flex', flexDirection: 'row' },
                my: 2,
                position: 'relative',
                height: '55px'
              }}
            >
              <Button size='small' sx={{ color: 'success.dark' }}>
                Submit
              </Button>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            
          </CardContent>
        </Card>
      </Form>
    )
  }
  return (
    <Layout>
      <Formik
        initialValues={{ file: null, customer: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // alert(values.customer)
          try {
            setLoading(true)
            setTimeout(() => {
              setSucess(true)
              setLoading(false)
            }, 4000)

            resetForm({
              values: {
                file: null,
                customer: ''
              }
            })
            setCustomer('')
            setFileName('')
            setSubmitting(false)
          } catch (error) {
            alert('Error')
          }

          // resetForm()
          // window.confirm('test')
        }}
      >
        {props => showForm(props)}
      </Formik>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get('/checksheet?questionID=1', {
    headers: {
      Accept: 'application/json'
    }
  })

  return {
    props: {
      checksheets: response.data
    }
  }
}

export default withAuth(View)
