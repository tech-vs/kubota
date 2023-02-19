import SingleBarcode from '@/components/Barcode/SingleBarcode'
import Layout from '@/components/Layouts/Layout'
import RollingLoading from '@/components/RollingLoading'
import { IContentSingleBarcode } from '@/models/barcode.model'
import { checksheetPartList, confirmCheckSheet2, repack } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme
} from '@mui/material'
import { green, pink } from '@mui/material/colors'
import cookie from 'cookie'
import { Form, Formik, FormikProps } from 'formik'
import { toPng } from 'html-to-image'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
type Props = {}

const View = ({ checksheets, id, accessToken }: any) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath, undefined, {
      scroll: false
    })
  }
  // const [scan, setScan] = useState({
  //   internalPalletNo: ''
  // })

  // const [scanLoadingResponse, setScanLoadingResponse] = useState<any>({})
  // const [scanLoadingResponseResult, setScanLoadingResponseResult] = useState<any>([])

  // useEffect(() => {
  //   async function call() {
  //     const res = await scanLoading(scan.internalPalletNo)
  //     console.log(res)
  //     setScanLoadingResponse(res)
  //     setScanLoadingResponseResult(res.item_list)
  //   }
  //   call()
  // }, [scan])

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const [selectedDevice, setSelectedDevice] = useState<any>()
  // const [imagePrint, setImagePrint] = useState<string>('')
  const [barcodeContent, setBarcodeContent] = useState<IContentSingleBarcode>({
    internal_pallet_no: 'test',
    pallet_string: 'test',
    question_type: 'Export'
  })
  const singleBarcodeRef = useRef<HTMLDivElement>(null)

  function printImage() {
    return new Promise<void>(async (resolve, reject) => {
      if (selectedDevice && singleBarcodeRef.current) {
        console.log(barcodeContent)
        selectedDevice.convertAndSendFile(
          await toPng(singleBarcodeRef.current),
          (res: any) => {
            console.log(res)
            setTimeout(() => {
              resolve()
            }, 2000)
          },
          (err: any) => {
            console.error(err)
            setTimeout(() => {
              resolve()
            }, 2000)
          },
          {
            resize: { width: 600, height: 200 }
          }
        )
      }
    })
  }

  function setupPrinter() {
    //Get the default device from the application as a first step. Discovery takes longer to complete.
    const BP = window.BrowserPrint
    BP.getDefaultDevice(
      'printer',
      function (device: any) {
        console.log(device)
        setSelectedDevice(device)
      },
      function (error: any) {
        console.log(error)
        MySwal.fire({
          text: 'Printer is Not Ready',
          position: 'top',
          confirmButtonColor: theme.palette.primary.main
        })
      }
    )
  }

  useEffect(() => {
    async function call() {
      try {
        await printImage()
        await MySwal.fire({
          text: 'Packing Successfully',
          position: 'top',
          confirmButtonColor: theme.palette.primary.main
        })
        setLoading(false)
        router.push(`/scan-packing`)
      } catch (error) {
        MySwal.fire({
          text: 'No Printer found. Please recheck Printer',
          position: 'top',
          confirmButtonColor: theme.palette.primary.main
        })
        setLoading(false)
      }
    }
    call()
  }, [barcodeContent])

  useEffect(() => {
    try {
      setupPrinter()
    } catch (error) {
      MySwal.fire({
        text: 'No Printer found. Please recheck Printer',
        position: 'top',
        confirmButtonColor: theme.palette.primary.main
      })
    }
  }, [])

  const showForm = ({ values, setFieldValue, resetForm }: FormikProps<any>) => {
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
          <Typography variant='h5'>Packing Check Sheet 2</Typography>
        </Box>
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ pb: 4, px: { xs: 4, md: 8 } }}>
            {checksheets.map((checksheet: any) => (
              <Box
                key={checksheet.id}
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'column' },
                  my: 2,
                  position: 'relative',
                  minHeight: '55px'
                }}
              >
                <Typography sx={{ mt: 1, mr: 3, fontSize: '13px' }}> {checksheet.text}</Typography>
                <FormControl>
                  {/* <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={checksheet.status}
                    sx={{
                      gap: '1rem',
                      justifyContent: 'center'
                    }}
                  >
                    <FormControlLabel
                      value='true'
                      sx={{
                        padding: '1rem',
                        margin: '1rem 0',
                        border: 'solid 1px',
                        borderColor: 'success.main',
                        borderRadius: '1rem',
                        '&:has(.Mui-checked)': {
                          boxShadow: 2,
                          color: 'success.main'
                        },
                        minWidth: '110px',
                        height: '1rem'
                      }}
                      control={
                        <Radio
                          size='small'
                          onChange={async () => {
                            const response = await httpClient.patch(
                              `/pallet/question/${checksheet.id}/status/`,
                              {
                                status: true
                              },
                              {
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${accessToken}`
                                }
                              }
                            )
                            refreshData()
                          }}
                          sx={{
                            color: green[800],
                            '&.Mui-checked': {
                              color: green[600]
                            }
                          }}
                        />
                      }
                      label='Ok'
                    />
                    <FormControlLabel
                      value='false'
                      sx={{
                        padding: '1rem',
                        margin: '1rem 0',
                        border: 'solid 1px',
                        borderColor: 'secondary.main',
                        borderRadius: '1rem',
                        '&:has(.Mui-checked)': {
                          boxShadow: 2,
                          color: 'secondary.main'
                        },
                        minWidth: '110px',
                        height: '1rem'
                      }}
                      control={
                        <Radio
                          size='small'
                          onChange={async () => {
                            const response = await httpClient.patch(
                              `/pallet/question/${checksheet.id}/status/`,
                              {
                                status: false
                              },
                              {
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${accessToken}`
                                }
                              }
                            )
                            refreshData()
                          }}
                          sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                              color: pink[600]
                            }
                          }}
                        />
                      }
                      label='NG'
                    />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ flexGrow: 1 }} />
              </Box>
            ))}

            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 2,
                position: 'relative',
                height: '55px'
              }}
            >
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
                  size='large'
                  color='primary'
                  type='submit'
                  disabled={loading}
                  sx={{ marginRight: 1, width: { xs: '100%', md: '200px' }, height: '100%' }}
                >
                  {loading && <RollingLoading />} Submit Packing
                </Button>
                <Button
                  variant='contained'
                  onClick={async () => {
                    try {
                      if (id) {
                        const res = await repack(id, accessToken)
                        console.log(res)

                        MySwal.fire({
                          text: 'Reset สำเร็จ ดำเนินการ Repack ใหม่',
                          position: 'top',
                          confirmButtonColor: theme.palette.primary.main
                        })
                        router.push(`/scan-packing/`)
                      } else {
                        MySwal.fire({
                          text: 'Reset ไม่สำเร็จ',
                          position: 'top',
                          confirmButtonColor: theme.palette.primary.main
                        })
                        refreshData()
                      }
                      // setScan({ internalPalletNo: '' })
                      refreshData()
                    } catch (error) {
                      MySwal.fire({
                        text: 'ไม่สำเร็จ กรุณาทำการ Repack ใหม่',
                        position: 'top',
                        confirmButtonColor: theme.palette.primary.main
                      })
                    }
                  }}
                  color='error'
                  sx={{ marginRight: 1, width: { xs: '100%', md: '200px' }, height: '100%' }}
                >
                  Reset
                </Button>
                <Button
                  variant='contained'
                  onClick={async () => {
                    try {
                      if (id) {
                        const res = await repack(id)
                        console.log(res)

                        MySwal.fire({
                          text: 'Reset สำเร็จ ดำเนินการ Repack ใหม่',
                          position: 'top',
                          confirmButtonColor: theme.palette.primary.main
                        })
                        router.push(`/scan-packing/`)
                      } else {
                        MySwal.fire({
                          text: 'Reset ไม่สำเร็จ',
                          position: 'top',
                          confirmButtonColor: theme.palette.primary.main
                        })
                        refreshData()
                      }
                      // setScan({ internalPalletNo: '' })
                      refreshData()
                    } catch (error) {
                      MySwal.fire({
                        text: 'ไม่สำเร็จ กรุณาทำการ Repack ใหม่',
                        position: 'top',
                        confirmButtonColor: theme.palette.primary.main
                      })
                    }
                  }}
                  color='error'
                  sx={{ marginRight: 1, width: { xs: '100%', md: '200px' }, height: '100%' }}
                >
                  Reset
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
          // alert(values.customer)
          try {
            setLoading(true)
            // submit check sheet 2
            await confirmCheckSheet2(id, accessToken)
            // get data for render barcode to printer
            const { internal_pallet_no, pallet_string, question_type } = await checksheetPartList(
              id.toString() || '',
              accessToken
            )
            console.log(internal_pallet_no)
            setBarcodeContent(barcodeContent => ({
              ...barcodeContent,
              internal_pallet_no,
              pallet_string,
              question_type
            }))

            setSubmitting(false)
          } catch (error: any) {
            if (error.response) {
              await MySwal.fire({
                text: JSON.stringify(error.response.data.detail),
                position: 'top',
                confirmButtonColor: theme.palette.primary.main
              })
              // alert(JSON.stringify(error.response.data.detail))
            }
            setLoading(false)
          }
        }}
      >
        {props => showForm(props)}
      </Formik>
      <div style={{ position: 'relative', marginTop: '1rem' }}>
        <SingleBarcode ref={singleBarcodeRef} content={barcodeContent}></SingleBarcode>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: theme => theme.palette.background.default
          }}
        ></Box>
      </div>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.query.id
  const cookies = cookie.parse(context.req.headers.cookie || '')
  const internalpalletid = context.query.internalpalletid
  const accessToken = cookies['access_token']
  const response = await httpClient.get(`/pallet/${id}/section/2/question/`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })

  return {
    props: {
      checksheets: response.data,
      id,
      accessToken
    }
  }
}

View.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default View
