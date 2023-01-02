import MultipleBarcode, { ILoadingSubmit, IMultipleBarcode } from '@/components/Barcode/MultipleBarcode'
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
  Typography
} from '@mui/material'
import { green, pink } from '@mui/material/colors'
import { Form, Formik, FormikProps } from 'formik'
import { toPng } from 'html-to-image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useTheme } from "@mui/material";
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

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const [selectedDevice, setSelectedDevice] = useState<any>()
  const [barcodeContent, setBarcodeContent] = useState<IMultipleBarcode>(
    {
      barcodes: [
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
        {
          serial_no: 'test',
          model_code: 'test',
          model_name: 'test',
          gross_weight: 'test',
          net_weight: 'test',
          country_name: 'test',
        },
      ],
      country_name: 'test',
      net_weight: 'test',
      gross_weight: 'tes',
    }
  )
  const multipleBarcodeRef = useRef<HTMLDivElement>(null)

  function printImage() {
    return new Promise<void>(async (resolve, reject) => {
      if (selectedDevice && multipleBarcodeRef.current) {
        console.log(barcodeContent)
        selectedDevice.convertAndSendFile(
          await toPng(multipleBarcodeRef.current),
          (res: any) => {
            console.log(res)
            resolve()
          },
          (err: any) => {
            console.error(err)
            resolve()
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
      }
    )
  }

  useEffect(() => {
    async function call() {
      await printImage()
      router.push(`/scan-loading/check-pallet`)
    }
    call()
  }, [barcodeContent])

  useEffect(() => {
    setupPrinter()
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
            height: '30px'
          }}
        >
          <Typography variant='h5'>Check Sheet 1</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ pb: 4, px: { xs: 2, md: 4 } }}>
            {checksheets.map((checksheet: any) => (
              <Box
                key={checksheet.id}
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 2,
                  position: 'relative',
                  minHeight: '55px'
                }}
              >
                <FormControl sx={{ minWidth: { xs: '140px' }, flexBasis: { xs: '140px' } }}>
                  {/* <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel> */}
                  <RadioGroup
                    sx={{ width: { xs: '140px' } }}
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={checksheet.status}
                  >
                    <FormControlLabel
                      value='true'
                      control={
                        <Radio
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
                      label='Ok'
                    />
                    <FormControlLabel
                      value='false'
                      control={
                        <Radio
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

                <Typography sx={{ mt: 1, mr: 3 }}> {checksheet.text}</Typography>

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
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant='contained'
                onClick={async () => {
                  if (typeof internalpalletid === 'string') {
                    const internalpalletidInt = parseInt(internalpalletid)
                    const res: ILoadingSubmit[] = await submitLoading({
                      is_send_approve: false,
                      pallet_id: internalpalletidInt
                    })
                    console.log(res);
                    let template: IMultipleBarcode = {
                      barcodes: [],
                      country_name: '',
                      net_weight: '',
                      gross_weight: ''
                    }
  
                    template = {
                      ...template,
                      barcodes: res,
                      country_name: res[0]?.country_name,
                      net_weight: res[0]?.net_weight,
                      gross_weight: res[0]?.gross_weight,
                    }
  
                    setBarcodeContent(template)

                    MySwal.fire({
                      text: 'Loading successfully',
                      position: 'top',
                      confirmButtonColor: theme.palette.primary.main
                    })
                    // alert('Loading successfully')
                  }
                }}
                color='primary'
                sx={{ marginRight: 1 }}
              >
                Submit
              </Button>
              <Button
                variant='contained'
                onClick={async () => {
                  if (typeof internalpalletid === 'string') {
                    const internalpalletidInt = parseInt(internalpalletid)
                    await submitLoading({
                      is_send_approve: true,
                      pallet_id: internalpalletidInt
                    })
                  }
                  await MySwal.fire({
                    text: 'Last oading successfully and Request Approval',
                    position: 'top',
                    confirmButtonColor: theme.palette.primary.main,
                  })
                  // alert('Last oading successfully and Request Approval')
                  router.push(`/scan-loading`)
                }}
                color='primary'
                sx={{ marginRight: 1 }}
              >
                Submit & Request Approval
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
          try {
            // setLoading(true)
            // setTimeout(() => {
            //   setSucess(true)
            //   setLoading(false)
            // }, 4000)

            await confirmCheckSheet1(id)
            router.push(`scan-loading/check-pallet/`)
            setSubmitting(false)
          } catch (error: any) {
            if (error.response) {
              await MySwal.fire({
                text: JSON.stringify(error.response.data.detail),
                position: 'top',
                confirmButtonColor: theme.palette.primary.main,
              })
              // alert(JSON.stringify(error.response.data.detail))
            }
          }
        }}
      >
        {props => showForm(props)}
      </Formik>
      <div style={{ position: 'relative' }}>
        <MultipleBarcode ref={multipleBarcodeRef} content={barcodeContent}></MultipleBarcode>
        <div
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'white' }}
        ></div>
      </div>
    </Layout>
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

export default withAuth(View)
