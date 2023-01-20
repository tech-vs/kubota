import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { confirmCheckSheet1 } from '@/services/serverServices'
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
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
type Props = {}

const View = ({ checksheets, id }: any) => {
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

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

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
          <Typography variant='h5'>Packing Check Sheet 1</Typography>
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
                      gap: '1rem'
                    }}
                  >
                    <FormControlLabel
                      value='true'
                      sx={{
                        padding: '1rem',
                        margin: '1rem 0',
                        border: 'solid 1px',
                        borderRadius: '1rem',
                        '&:has(.Mui-checked)': {
                          background: 'greenyellow'
                        },
                        minWidth: '140px'
                      }}
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
                      sx={{
                        padding: '1rem',
                        margin: '1rem 0',
                        border: 'solid 1px',
                        borderRadius: '1rem',
                        '&:has(.Mui-checked)': {
                          background: '#ff6e6e'
                        },
                        minWidth: '140px'
                      }}
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
              <Box sx={{
                display: { xs: 'flex' },
                position: { xs: 'fixed', md: 'relative' },
                bottom: { xs: '0' },
                left: { xs: '0' },
                width: { xs: '100%', md: '100%' },
                zIndex: { xs: '1201' },
                padding: { xs: '4px' },
                gap: { xs: '4px' },
                height: { xs: '80px', md: 'auto' }
              }}>
                <Button variant='contained' size="large" color='primary' type='submit'
                  sx={{ marginRight: 1, width: '100%', height: '100%' }}>
                  Ok
                </Button>
              </Box>
              {/* <Button variant='contained' color='primary' type='submit' sx={{ marginRight: 1 }}>
                Ok
              </Button> */}
              {/* <Box sx={{ flexGrow: 1 }} /> */}
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

            await confirmCheckSheet1(id)
            router.push(`/scan-packing/checksheet2?id=${id}`)
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
          }
        }}
      >
        {props => showForm(props)}
      </Formik>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.query.id
  const response = await httpClient.get(`/pallet/${id}/section/1/question/`, {
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

export default View
