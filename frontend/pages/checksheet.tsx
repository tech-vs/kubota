import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
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
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import type { ReactElement } from 'react'
type Props = {}

const View = ({ checksheets }: any) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const [fileName, setFileName] = useState<string>('')
  const [customer, setCustomer] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)

  const showForm = ({ values, setFieldValue, resetForm }: FormikProps<any>) => {
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
          <Typography variant='h5'>Check Sheet</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card sx={{ mx: 6 }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
            {checksheets.map((checksheet: any) => (
              <Box
                key={checksheet.id}
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 2,
                  position: 'relative',
                  height: '55px'
                }}
              >
                <FormControl>
                  {/* <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={checksheet.questionStatus}
                  >
                    <FormControlLabel
                      value='true'
                      control={
                        <Radio
                          onChange={async () => {
                            const response = await httpClient.post(
                              '/checksheet',
                              {
                                id: checksheet.id,
                                questionStatus: true
                              },
                              {
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                              }
                            )
                          }}
                          sx={{
                            color: green[800],
                            '&.Mui-checked': {
                              color: green[600]
                            }
                          }}
                        />
                      }
                      label='Yes'
                    />
                    <FormControlLabel
                      value='false'
                      control={
                        <Radio
                          onChange={async () => {
                            await httpClient.post(
                              '/checksheet',
                              {
                                id: checksheet.id,
                                questionStatus: false
                              },
                              {
                                headers: {
                                  'Access-Control-Allow-Origin': '*',
                                  'Access-Control-Allow-Methods': 'POST',
                                  Accept: 'application/json'
                                }
                              }
                            )
                          }}
                          sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                              color: pink[600]
                            }
                          }}
                        />
                      }
                      label='No'
                    />
                  </RadioGroup>
                </FormControl>

                <Typography sx={{ mt: 1, mr: 3 }}> {checksheet.questionText}</Typography>
                <Button size='small' sx={{ mb: 2, color: 'success.dark' }}>
                  Check
                </Button>
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            ))}

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
                Request Approval
              </Button>
              <Box sx={{ flexGrow: 1 }} />
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
            // alert('Error')
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

View.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default View
