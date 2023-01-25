import MultipleBarcode, { ILoadingSubmit, IMultipleBarcode } from '@/components/Barcode/MultipleBarcode'
import RollingLoading from '@/components/RollingLoading'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { confirmCheckSheet1, submitLoading } from '@/services/serverServices'
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
import { Form, Formik, FormikProps } from 'formik'
import { toPng } from 'html-to-image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import type { ReactElement } from 'react'
type Props = {}

const View = ({ checksheets, id }: any) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const router = useRouter()
  const { internalpalletid } = router.query

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath, undefined, {
      scroll: false
    })
  }

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const [selectedDevice, setSelectedDevice] = useState<any>()
  const [barcodeContent, setBarcodeContent] = useState<IMultipleBarcode>({
    barcodes: [
      {
        serial_no: 'test',
        model_code: 'test',
        model_name: 'test',
        gross_weight: 'test',
        net_weight: 'test',
        country_name: 'test'
      },
      {
        serial_no: 'test',
        model_code: 'test',
        model_name: 'test',
        gross_weight: 'test',
        net_weight: 'test',
        country_name: 'test'
      },
      {
        serial_no: 'test',
        model_code: 'test',
        model_name: 'test',
        gross_weight: 'test',
        net_weight: 'test',
        country_name: 'test'
      },
      {
        serial_no: 'test',
        model_code: 'test',
        model_name: 'test',
        gross_weight: 'test',
        net_weight: 'test',
        country_name: 'test'
      }
    ],
    country_name: 'test',
    net_weight: 'test',
    gross_weight: 'tes'
  })
  const multipleBarcodeRef = useRef<HTMLDivElement>(null)

  function printImage() {
    return new Promise<void>(async (resolve, reject) => {
      if (selectedDevice && multipleBarcodeRef.current) {
        console.log(barcodeContent)
        selectedDevice.convertAndSendFile(
          await toPng(multipleBarcodeRef.current),
          (res: any) => {
            console.log(res)
            setTimeout(() => {
              resolve()
            }, 2000);
          },
          (err: any) => {
            console.error(err)
            setTimeout(() => {
              resolve()
            }, 2000);
          },
          {
            resize: { width: 900, height: 600 }
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
      }
    )
  }

  useEffect(() => {
    async function call() {
      try {
        await printImage()
        MySwal.fire({
          text: 'Loading successfully',
          position: 'top',
          confirmButtonColor: theme.palette.primary.main
        })
        setLoadingApprove(false)
        setLoadingSubmit(false)
        router.push(`/scan-loading/check-pallet`)
      } catch (error) {
        MySwal.fire({
          text: 'No Printer found. Please recheck Printer',
          position: 'top',
          confirmButtonColor: theme.palette.primary.main
        })
        setLoadingApprove(false)
        setLoadingSubmit(false)
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
          <Typography variant='h5'>Loading Check Sheet</Typography>
        </Box>
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ pb: 4, px: { xs: 2, md: 4 } }}>
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
                <Typography sx={{ mt: 1, mr: 3 }}> {checksheet.text}</Typography>
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
                          // background: 'greenyellow'
                          boxShadow: 2,
                          color: 'success.main',
                        },
                        minWidth: '140px',
                        height: '1rem'
                      }}
                      control={
                        <Radio
                          size="small"
                          onChange={async () => {
                            const response = await httpClient.patch(
                              `/pallet/question/${checksheet.id}/status/`,
                              {
                                status: true
                              },
                              {
                                headers: {
                                  'Content-Type': 'application/json'
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
                      label='OK'
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
                          shadow: 2,
                          color: 'secondary.main',
                        },
                        minWidth: '140px',
                        height: '1rem'
                      }}
                      control={
                        <Radio
                          size="small"
                          onChange={async () => {
                            const response = await httpClient.patch(
                              `/pallet/question/${checksheet.id}/status/`,
                              {
                                status: false
                              },
                              {
                                headers: {
                                  'Content-Type': 'application/json'
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
                  height: { xs: '60px', md: 'auto' }
                }}
              >
                <Button
                  variant='contained'
                  onClick={async () => {
                    try {
                      setLoadingSubmit(true)
                      if (typeof internalpalletid === 'string') {
                        const internalpalletidInt = parseInt(internalpalletid)
                        const res = await submitLoading({
                          is_send_approve: false,
                          pallet_id: internalpalletidInt
                        })
                        console.log(res.status)
                        if (res.status === 400) {
                          throw Error(res.data.detail)
                        }
                        const data: ILoadingSubmit[] = res.data
                        let template: IMultipleBarcode = {
                          barcodes: [],
                          country_name: '',
                          net_weight: '',
                          gross_weight: ''
                        }

                        template = {
                          ...template,
                          barcodes: data,
                          country_name: data[0]?.country_name,
                          net_weight: data[0]?.net_weight,
                          gross_weight: data[0]?.gross_weight
                        }

                        setBarcodeContent(template)
                      }
                    } catch (error) {
                      console.error(error);
                      setLoadingSubmit(false)
                    }
                  }}
                  color='primary'
                  size='large'
                  disabled={loadingSubmit || loadingApprove}
                  sx={{ marginRight: 1, width: '30%', height: '100%' }}
                >
                  {loadingSubmit && <RollingLoading />} Submit
                </Button>
                <Button
                  variant='contained'
                  onClick={async () => {
                    try {
                      setLoadingApprove(true)
                      if (typeof internalpalletid === 'string') {
                        const internalpalletidInt = parseInt(internalpalletid)
                        const res = await submitLoading({
                          is_send_approve: true,
                          pallet_id: internalpalletidInt
                        })
                        console.log(res.status)
                        if (res.status === 400) {
                          throw Error(res.data.detail)
                        }
                        const data: ILoadingSubmit[] = res.data
                        let template: IMultipleBarcode = {
                          barcodes: [],
                          country_name: '',
                          net_weight: '',
                          gross_weight: ''
                        }

                        template = {
                          ...template,
                          barcodes: data,
                          country_name: data[0]?.country_name,
                          net_weight: data[0]?.net_weight,
                          gross_weight: data[0]?.gross_weight
                        }

                        setBarcodeContent(template)

                        // await MySwal.fire({
                        //   text: 'Last loading successfully and Request Approval',
                        //   position: 'top',
                        //   confirmButtonColor: theme.palette.primary.main
                        // })
                        // alert('Last oading successfully and Request Approval')
                        router.push(`/scan-loading`)
                      }
                    } catch (error) {
                      console.error(error);
                      setLoadingApprove(false)
                    }
                  }}
                  color='success'
                  size='large'
                  disabled={loadingSubmit || loadingApprove}
                  sx={{ marginRight: 1, width: '70%', height: '100%' }}
                >
                  {loadingApprove && <RollingLoading />} Submit & Request Approval
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
            await confirmCheckSheet1(id)
            router.push(`scan-loading/check-pallet/`)
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
            setLoadingApprove(false)
            setLoadingSubmit(false)
          }
        }}
      >
        {props => showForm(props)}
      </Formik>
      <div style={{ position: 'relative', marginTop: '1rem' }}>
        <MultipleBarcode ref={multipleBarcodeRef} content={barcodeContent}></MultipleBarcode>
        <Box
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: (theme) => theme.palette.background.default }}
        ></Box>
      </div>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const internalpalletid = context.query.internalpalletid
  const response = await httpClient.get(`/pallet/${internalpalletid}/section/3/question/`, {
    headers: {
      Accept: 'application/json'
    }
  })

  return {
    props: {
      checksheets: response.data,
      id: internalpalletid
    }
  }
}

View.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default View
