import SingleBarcode from '@/components/Barcode/SingleBarcode'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { checksheetPartList, confirmCheckSheet2 } from '@/services/serverServices'
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
import { useCallback, useEffect, useRef, useState } from 'react'
type Props = {}

const View = ({ checksheets, id }: any) => {
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const [selectedDevice, setSelectedDevice] = useState<any>()
  const [imagePrint, setImagePrint] = useState('')
  const [barcodeContent, setBarcodeContent] = useState<{
    internal_pallet_no: string
    pallet: string
  }>({
    internal_pallet_no: 'abc',
    pallet: 'abc',
  })
  const singleBarcodeRef = useRef<HTMLDivElement>(null)

  async function getDataImage() {
    if (singleBarcodeRef.current) {
        const imgUrl = await toPng(singleBarcodeRef.current)
        console.log(imgUrl)
        setImagePrint(imgUrl)
        return imgUrl
    }
  }

  function printImage() {
    return new Promise<void>((resolve, reject) => {
      if (selectedDevice) {
        selectedDevice.convertAndSendFile(imagePrint,
          (res: any) => {
            console.log(res)
            resolve()
          }, (err: any) => {
            console.error(err)
            resolve()
          })
      }
    })
  }

  function setupPrinter() {
    //Get the default device from the application as a first step. Discovery takes longer to complete.
    const BP = window.BrowserPrint
    BP.getDefaultDevice("printer", function (device: any) {
      console.log(device)
      setSelectedDevice(device)
    }, function (error: any) {
      console.log(error)
    })
  }

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
          <Typography variant='h5'>Check Sheet 2</Typography>
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
                my: 2,
                position: 'relative',
                height: '55px'
              }}
            >
              <Button variant='contained' color='primary' type='submit' sx={{ marginRight: 1 }}>
                Submit Packing
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
            // setLoading(true)
            // setTimeout(() => {
            //   setSucess(true)
            //   setLoading(false)
            // }, 4000)
            // submit check sheet 2
            await confirmCheckSheet2(id)
            // get data for render barcode to printer
            const { internal_pallet_no, pallet } = await checksheetPartList(id.toString() || '')
            console.log(internal_pallet_no);
            setBarcodeContent({
              internal_pallet_no,
              pallet
            })
            alert('Packing Successfully')
            await getDataImage()
            await printImage()
            router.push(`/preview/${id}?type=1`)
            setSubmitting(false)
          } catch (error: any) {
            if (error.response) {
              alert(JSON.stringify(error.response.data.detail))
            }
          }

          // resetForm()
          // window.confirm('test')
        }}
      >
        {props => showForm(props)}
      </Formik>
      <div style={{ position: 'relative'}}>
          <SingleBarcode ref={singleBarcodeRef} content={barcodeContent}></SingleBarcode>
          <div style={{ position: 'absolute', top: 0, left:0, width: '100%', height: '100%', background: 'white'}}></div>
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.query.id
  const response = await httpClient.get(`/pallet/${id}/section/2/question/`, {
    headers: {
      Accept: 'application/json'
    }
  })

  return {
    props: {
      checksheets: response.data,
      id
    }
  }
}

export default withAuth(View)
