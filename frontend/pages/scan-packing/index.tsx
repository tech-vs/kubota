import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

type Props = {}

type scanProps = {
  palletNo: string
  partSeq01: string
  partSeq02: string
  partSeq03: string
  partSeq04: string
}

const Scan = ({}: Props) => {
  const router = useRouter()
  const [deEx, setDeEx] = useState<string>('')
  const [scan, setScan] = useState<scanProps>({
    palletNo: '',
    partSeq01: '',
    partSeq02: '',
    partSeq03: '',
    partSeq04: ''
  })
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
          <Typography variant='h5'>Scan</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card sx={{ mx: 6 }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 5,
                position: 'relative',
                height: '55px'
              }}
            >
              <FormControl fullWidth required sx={{ minWidth: 120, minHeight: 60 }}>
                <InputLabel id='demo-simple-select-required-label'>Select Domestic/Export</InputLabel>
                <Select
                  labelId='demo-simple-select-required-label'
                  id='demo-simple-select-required'
                  label='deEx *'
                  value={deEx}
                  onChange={(e: SelectChangeEvent<string>) => {
                    e.preventDefault()
                    setDeEx(e.target.value)
                    setFieldValue('deEx', e.target.value)
                  }}
                >
                  <MenuItem value={'Domestic'}>Domestic</MenuItem>
                  <MenuItem value={'Export'}>Export</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
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
                id='filled-basic'
                label='Pallet No.'
                variant='filled'
                value={scan.palletNo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setScan({ ...scan, palletNo: e.target.value })
                  setFieldValue('scan.palletNo', e.target.value)
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
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
                id='filled-basic'
                label='Part Seq01'
                variant='filled'
                value={scan.partSeq01}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setScan({ ...scan, partSeq01: e.target.value })
                  setFieldValue('scan.partSeq01', e.target.value)
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
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
                id='filled-basic'
                label='Part Seq02'
                variant='filled'
                value={scan.partSeq02}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setScan({ ...scan, partSeq02: e.target.value })
                  setFieldValue('scan.partSeq02', e.target.value)
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
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
                id='filled-basic'
                label='Part Seq03'
                variant='filled'
                value={scan.partSeq03}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setScan({ ...scan, partSeq03: e.target.value })
                  setFieldValue('scan.partSeq03', e.target.value)
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
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
                id='filled-basic'
                label='Part Seq04'
                variant='filled'
                value={scan.partSeq04}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setScan({ ...scan, partSeq04: e.target.value })
                  setFieldValue('scan.partSeq04', e.target.value)
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
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
                  // window.location.reload()
                  setDeEx('')
                  setScan({
                    palletNo: '',
                    partSeq01: '',
                    partSeq02: '',
                    partSeq03: '',
                    partSeq04: ''
                  })
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
                    This is a success message!
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
        initialValues={{ deEx: '', palletNo: '', partSeq01: '', partSeq02: '', partSeq03: '', partSeq04: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // alert(values.deEx)
          try {
            // setLoading(true)
            // setTimeout(() => {
            //   setSucess(true)
            //   setLoading(false)
            // }, 4000)
            let data = {
              deEx: values.deEx,
              palletNo: scan.palletNo,
              partSeq01: scan.partSeq01,
              partSeq02: scan.partSeq02,
              partSeq03: scan.partSeq03,
              partSeq04: scan.partSeq04
            }
            console.log(data)
            setScan({
              palletNo: '',
              partSeq01: '',
              partSeq02: '',
              partSeq03: '',
              partSeq04: ''
            })
            setDeEx('')
            router.push('/scan-packing/checksheet')
            setSubmitting(false)
          } catch (error) {
            alert('Error')
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

export default withAuth(Scan)
