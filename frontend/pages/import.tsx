import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { importExcel } from '@/services/serverServices'
import { Alert, Box, Button, Card, CardContent, Snackbar, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { Form, Formik, FormikProps } from 'formik'
import { ChangeEvent, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useTheme } from "@mui/material";
type Props = {}

const Import = ({}: Props) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const [file, setFile] = useState<File>()
  const [fileName, setFileName] = useState<string>('')
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
          <Typography variant='h5'>Import Master plan file</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card sx={{ mx: 6 }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
            <Box
              component='main'
              sx={{
                display: { xs: 'none', md: 'flex', flexDirection: 'row' },
                my: 3,
                position: 'relative'
              }}
            >
              <Button fullWidth variant='contained' component='label'>
                Choose file
                <input
                  hidden
                  multiple
                  type='file'
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    if (e.target.files) {
                      setFile(e.target.files[0])
                      setFieldValue('file', e.target.files[0]) // for upload
                      setFileName(e.target.files[0].name)
                    }
                  }}
                  name='image'
                  click-type='type1'
                  accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                  id='files'
                  style={{ padding: '20px 0 0 20px' }}
                />
              </Button>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Typography sx={{ color: 'green' }}>{fileName}</Typography>
            <Box
              component='main'
              sx={{
                display: { xs: 'none', md: 'flex', flexDirection: 'row' },
                my: 5,
                position: 'relative'
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Button variant='contained' color='primary' type='submit' sx={{ marginRight: 1 }}>
                Submit
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  setFieldValue('file', null)
                  setFileName('')
                }}
                color='secondary'
                sx={{ marginRight: 1 }}
              >
                Clear
              </Button>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Box sx={{ width: '100%', my: 5 }}>
              {loading ? <LinearProgress /> : <></>}
              {success ? (
                <Snackbar open={success} autoHideDuration={6000} onClose={() => setSucess(false)}>
                  <Alert onClose={() => setSucess(false)} severity='success' sx={{ width: '100%' }}>
                    complete!
                  </Alert>
                </Snackbar>
              ) : (
                <></>
              )}
            </Box>
          </CardContent>
        </Card>
      </Form>
    )
  }
  return (
    <Layout>
      <Formik
        initialValues={{ file: null }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // alert(values.customer)
          try {
            if (values.file) {
              let data = new FormData()
              data.append('file', values.file)

              await importExcel(data)

              // setLoading(true)
              // setTimeout(() => {
              //   setSucess(true)
              //   setLoading(false)
              // }, 1000)

              resetForm({
                values: {
                  file: null
                }
              })

              setFileName('')
              setSubmitting(false)
            }
          } catch (error) {
            console.error(error)
            MySwal.fire({
              text: JSON.stringify(error),
              position: 'top',
              confirmButtonColor: theme.palette.primary.main
            })
          }

          // resetForm()
          // window.confirm('test')
        }}
      >
        {props => showForm(props)}
      </Formik>
    </Layout>
  )
}

export default withAuth(Import)
