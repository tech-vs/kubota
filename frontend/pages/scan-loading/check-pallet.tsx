import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { scanLoading } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter, withRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
type Props = {}
const columns: GridColDef[] = [
  {
    field: 'model_code',
    headerName: 'Model Code',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'model_name',
    headerName: 'Model Name',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    type: 'string',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'serial_no',
    headerName: 'ID No.',
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
  }
]
const View = ({ genDoc }: any) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const showForm = ({ values, setFieldValue, resetForm }: FormikProps<any>) => {
    const router = useRouter()
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
      router.replace(router.asPath)
    }
    const [scan, setScan] = useState({
      internalPalletNo: ''
    })

    const [scanLoadingResponse, setScanLoadingResponse] = useState<any>({})
    const [scanLoadingResponseResult, setScanLoadingResponseResult] = useState<any>({})

    useEffect(() => {
      async function call() {
        const res = await scanLoading(scan.internalPalletNo)
        setScanLoadingResponse(res)
        setScanLoadingResponseResult(res.item_list)
      }
      call()
    }, [scan])
    return (
      <Form>
        <Box
          component='main'
          sx={{
            display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
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
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              setScan({ ...scan, internalPalletNo: e.target.value })
              setFieldValue('scan.internalPalletNo', e.target.value)

              // refreshData()
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
        </Box>

        <Box
          sx={{
            height: 360,
            width: 700,
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
            getRowId={scanLoadingResponseResult => scanLoadingResponseResult.serial_no}
            sx={{
              boxShadow: 2,
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main'
              },
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                outline: 'none'
              }
            }}
            rows={scanLoadingResponseResult}
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
            pageSize={4}
            rowsPerPageOptions={[4]}
            disableSelectionOnClick
            disableVirtualization
            disableExtendRowFullWidth
            disableIgnoreModificationsIfProcessingProps
            disableColumnSelector
          />
        </Box>

        <Box
          component='main'
          sx={{
            display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
            my: 5,
            position: 'relative'
          }}
        >
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box
            sx={{
              display: { xs: 'flex' },
              position: { xs: 'fixed', md: 'relative' },
              bottom: { xs: '0' },
              left: { xs: '0' },
              width: { xs: '100%' },
              zIndex: { xs: '1201' },
              padding: { xs: '4px' },
              gap: { xs: '4px' },
              height: { xs: '80px', md: 'auto' }
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                if (scanLoadingResponse.pallet_id) {
                  router.push(
                    `/scan-loading/checksheet1?id=${genDoc.id}&internalpalletid=${scanLoadingResponse.pallet_id}`
                  )
                } else {
                  MySwal.fire({
                    text: 'ไม่พบ Pallet',
                    position: 'top',
                    confirmButtonColor: theme.palette.primary.main
                  })
                }
              }}
              color='primary'
              sx={{ marginRight: 1, width: '100%', height: '100%' }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Form>
    )
  }
  return (
    <Layout>
      <Formik
        initialValues={{ file: null, customer: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(false)
          } catch (error) {
            MySwal.fire({
              text: 'Error',
              position: 'top',
              confirmButtonColor: theme.palette.primary.main
            })
          }
        }}
      >
        {props => showForm(props)}
      </Formik>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get('/pallet/document/gen-doc/', {
    headers: {
      Accept: 'application/json'
    }
  })

  return {
    props: {
      genDoc: response.data
    }
  }
}

export default withRouter(withAuth(View))
