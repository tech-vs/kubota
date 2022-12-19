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
import { useRouter } from 'next/router'
import { useState } from 'react'
type Props = {}

const View = ({ checksheets, id }: any) => {
  const router = useRouter()
  const { internalpalletid } = router.query

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
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
                    await submitLoading({
                      is_send_approve: false,
                      pallet_id: internalpalletidInt
                    })
                  }
                  alert('Loading successfully')
                  router.push(`/scan-loading/check-pallet`)
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
                  alert('Last oading successfully and Request Approval')
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
              alert(JSON.stringify(error.response.data.detail))
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
