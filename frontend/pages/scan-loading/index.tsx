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

type inputProps = {
  palletNo: string
  partSeq01: string
  partSeq02: string
  partSeq03: string
  partSeq04: string
}

var Amatanakhon =
  '700/867 Moo 3 Amata Nakhon Industrial Estate, Tambon Nong Ka Kha,District, Panthong District, Chon Buri 20160'
var Navanakorn =
  '101/19-24 Moo 20 Navanakorn Industrial Estate, Tambon Khlongnueng,District Khlongluang, Pathumthani 12120'
const Scan = ({}: Props) => {
  const router = useRouter()
  const [deEx, setDeEx] = useState<string>('')
  const [customer, setCustomer] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [input, setInput] = useState({
    refNo: '',
    qty: '',
    invoiceNo: '',
    round: '',
    customerName: '',
    address: ''
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
          <Typography variant='h5'>Scan Loading</Typography>
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
                  <MenuItem value={'domestic'}>Domestic</MenuItem>
                  <MenuItem value={'export'}>Export</MenuItem>
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
                label='Ref, D/O No.'
                variant='filled'
                value={input.refNo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, refNo: e.target.value })
                  setFieldValue('input.refNo', e.target.value)
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
                label='Total Qty'
                variant='filled'
                value={input.qty}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, qty: e.target.value })
                  setFieldValue('input.qty', e.target.value)
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
                label='Invoice No.'
                variant='filled'
                value={input.qty}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, qty: e.target.value })
                  setFieldValue('input.qty', e.target.value)
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
                label='Round'
                variant='filled'
                value={input.round}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, round: e.target.value })
                  setFieldValue('input.round', e.target.value)
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
            </Box>
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
                <InputLabel id='demo-simple-select-required-label'>Customer</InputLabel>
                <Select
                  labelId='demo-simple-select-required-label'
                  id='demo-simple-select-required'
                  label='Customer *'
                  value={customer}
                  onChange={(e: SelectChangeEvent<string>) => {
                    e.preventDefault()
                    setCustomer(e.target.value)
                    setFieldValue('customer', e.target.value)
                  }}
                >
                  <MenuItem value={'Amatanakhon'}>SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)</MenuItem>
                  <MenuItem value={'Navanakorn'}>SIAM KUBOTA Corporation Co., Ltd (Navanakorn Factory)</MenuItem>
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
                label='Address'
                variant='filled'
                value={customer == 'Amatanakhon' ? Amatanakhon : customer == 'Navanakorn' ? Navanakorn : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setAddress(e.target.value)
                  setFieldValue('address', e.target.value)
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
                  setInput({
                    refNo: '',
                    qty: '',
                    invoiceNo: '',
                    round: '',
                    customerName: '',
                    address: ''
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
        initialValues={{ deEx: '', refNo: '', qty: '', invoiceNo: '', round: '', customerName: '',address:'' }}
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
              refNo: '',
              qty: '',
              invoiceNo: '',
              round: '',
              customerName: '',
              address: ''
            }
            setInput({
              refNo: '',
              qty: '',
              invoiceNo: '',
              round: '',
              customerName: '',
              address: ''
            })
            setDeEx('')
                router.push('/scan-packing/checksheet')
            setSubmitting(false)
          } catch (error) {
            alert(error)
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
