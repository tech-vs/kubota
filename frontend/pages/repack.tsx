import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { repack, scanLoading } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import {
  Box, Button, TextField, Typography, useTheme, Card,
  CardContent, styled, alpha
} from '@mui/material'
import { DataGrid, GridCellParams, gridClasses, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter, withRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import type { ReactElement } from 'react'
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
    width: 250
  },
  {
    field: 'serial_no',
    headerName: 'ID No.',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
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

const Repack = ({ genDoc }: any) => {
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
            height: '30px',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h5'>Scan Repack</Typography>
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
                  fontSize: 12,
                },
                '& .customerField': {
                  backgroundColor: '#c7ddb5'
                },
                '& .cellField': {
                  fontSize: 12,
                }
              }}
            >
              {/* <DataGrid
                getRowId={scanLoadingResponseResult => scanLoadingResponseResult.serial_no}
                sx={{
                  boxShadow: 0,
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
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                disableVirtualization
                disableExtendRowFullWidth
                disableIgnoreModificationsIfProcessingProps
                disableColumnSelector
              /> */}
              <StripedDataGrid
                getRowId={scanLoadingResponseResult => scanLoadingResponseResult.serial_no}
                sx={{
                  boxShadow: 0,
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main'
                  },
                  '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                    outline: 'none'
                  }
                }}
                getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
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
                pageSize={12}
                rowsPerPageOptions={[12]}
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
                  onClick={async () => {
                    try {
                      if (scanLoadingResponse.pallet_id) {
                        await repack(genDoc.id)
                        MySwal.fire({
                          text: 'Repack สำเร็จ',
                          position: 'top',
                          confirmButtonColor: theme.palette.primary.main
                        })
                      } else {
                        MySwal.fire({
                          text: 'ไม่สำเร็จ กรุณาทำการ Repack ใหม่',
                          position: 'top',
                          confirmButtonColor: theme.palette.primary.main
                        })
                      }
                      setScan({ internalPalletNo: '' })
                      refreshData()
                    } catch (error) {
                      MySwal.fire({
                        text: 'ไม่สำเร็จ กรุณาทำการ Repack ใหม่',
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
              {/* <Box sx={{ flexGrow: 1 }} /> */}
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


const warpper: any = withRouter(Repack)

export default warpper

warpper.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}
