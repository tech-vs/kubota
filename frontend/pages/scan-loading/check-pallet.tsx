import Layout from '@/components/Layouts/Layout'
import { scanLoading } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import { alpha, Box, Button, Card, CardContent, styled, TextField, Typography, useTheme } from '@mui/material'
import { DataGrid, GridCellParams, gridClasses, GridColDef } from '@mui/x-data-grid'
import cookie from 'cookie'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter, withRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
  }
]
const View = ({ genDoc, accessToken }: any) => {
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

    const palletNoRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      setTimeout(() => {
        palletNoRef.current?.click()
        palletNoRef.current?.focus()
      }, 500)
    }, [])

    useEffect(() => {
      async function call() {
        const res = await scanLoading(scan.internalPalletNo, accessToken)
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
            height: '30px',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h5'>Scan Internal Pallet</Typography>
        </Box>
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 3,
                position: 'relative'
              }}
            >
              <TextField
                inputRef={palletNoRef}
                required
                fullWidth
                size='small'
                id='filled-basic'
                label='Pallet No.'
                variant='outlined'
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
                width: '100%',
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
                getRowId={scanLoadingResponseResult => scanLoadingResponseResult.serial_no}
                getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
                sx={{
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
                  height: { xs: '60px', md: 'auto' },
                  justifyContent: 'center',
                  background: { xs: '#fff' }
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
                  sx={{ marginRight: 1, width: { xs: '100%', md: '200px' }, height: '100%' }}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Form>
    )
  }
  return (
    <>
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
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const cookies = cookie.parse(context.req.headers.cookie || '')
  const accessToken = cookies['access_token']
  const response = await httpClient.get(`/pallet/document/gen-doc/`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  return {
    props: {
      genDoc: response.data,
      accessToken
    }
  }
}

const warpper: any = withRouter(View)

export default warpper

warpper.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
