import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { inputLoadingDoc } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
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
// let scanLoadingResponse: any[] = []
// const columns: GridColDef[] = [
//   {
//     field: 'pallet_skewer',
//     headerName: 'Model Code',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     cellClassName: 'cellField',
//     width: 150
//   },
//   {
//     field: 'modelName',
//     headerName: 'Model Name',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     type: 'string',
//     cellClassName: 'cellField',
//     width: 250
//   },
//   {
//     field: 'item_sharp',
//     headerName: 'ID No.',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     cellClassName: 'cellField',
//     width: 150
//   },
//   {
//     field: 'countryCode',
//     headerName: 'Country Code',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     cellClassName: 'cellField',
//     width: 150
//   },
//   {
//     field: 'countryName',
//     headerName: 'Country Name',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     cellClassName: 'cellField',
//     width: 150
//   },
//   {
//     field: 'distributoeCode',
//     headerName: 'Distributor Code',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     cellClassName: 'cellField',
//     width: 150
//   },
//   {
//     field: 'distributoeName',
//     headerName: 'Distributor Name',
//     headerAlign: 'center',
//     headerClassName: 'headerField',
//     align: 'center',
//     cellClassName: 'cellField',
//     width: 150
//   },

//   {
//     field: 'blank',
//     headerName: '',
//     headerClassName: 'headerField',
//     flex: 1
//   }
// ]

var Amatanakhon =
  '700/867 Moo 3 Amata Nakhon Industrial Estate, Tambon Nong Ka Kha,District, Panthong District, Chon Buri 20160'
var Navanakorn =
  '101/19-24 Moo 20 Navanakorn Industrial Estate, Tambon Khlongnueng,District Khlongluang, Pathumthani 12120'
const Scan = ({ genDoc }: any) => {
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const [deEx, setDeEx] = useState<string>('')
  const [customer, setCustomer] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [input, setInput] = useState({
    refNo: genDoc.ref_do_no,
    qty: genDoc.total_qty,
    invoiceNo: genDoc.invoice_no,
    round: genDoc.round,
    customerName: genDoc.customer_name,
    address: genDoc.address,
    question_type: genDoc.question_type
  })
  // const [scan, setScan] = useState({
  //   internalPalletNo: ''
  // })
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
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ pb: 4, px: 4 }}>
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
                label='Doc No.'
                variant='filled'
                value={genDoc.doc_no}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
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
                label='Del Date'
                variant='filled'
                value={genDoc.delivery_date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
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
                <InputLabel id='demo-simple-select-required-label'>Select Domestic/Export</InputLabel>
                <Select
                  labelId='demo-simple-select-required-label'
                  id='demo-simple-select-required'
                  label='deEx *'
                  value={input.question_type}
                  onChange={(e: SelectChangeEvent<string>) => {
                    e.preventDefault()
                    setInput({ ...input, question_type: e.target.value })
                    setFieldValue('input.question_type', e.target.value)
                    // setDeEx(e.target.value)
                    // setFieldValue('deEx', e.target.value)
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
                value={input.invoiceNo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, invoiceNo: e.target.value })
                  setFieldValue('input.invoiceNo', e.target.value)
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
                  value={input.customerName}
                  onChange={(e: SelectChangeEvent<string>) => {
                    e.preventDefault()
                    setInput({ ...input, customerName: e.target.value })
                    setFieldValue('customerName', e.target.value)
                  }}
                >
                  <MenuItem value={'SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)'}>
                    SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)
                  </MenuItem>
                  <MenuItem value={'SIAM KUBOTA Corporation Co., Ltd (Navanakorn Factory)'}>
                    SIAM KUBOTA Corporation Co., Ltd (Navanakorn Factory)
                  </MenuItem>
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
                value={
                  input.customerName == 'SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)'
                    ? Amatanakhon
                    : input.customerName == 'SIAM KUBOTA Corporation Co., Ltd (Navanakorn Factory)'
                    ? Navanakorn
                    : ''
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, address: e.target.value })
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
                OK
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  router.push('scan-loading/check-pallet')
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
        initialValues={{ deEx: '', refNo: '', qty: '', invoiceNo: '', round: '', customerName: '', address: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // alert(values.deEx)
          try {
            // setLoading(true)
            // setTimeout(() => {
            //   setSucess(true)
            //   setLoading(false)
            // }, 4000)

            // setInput({
            //   refNo: '',
            //   qty: '',
            //   invoiceNo: '',
            //   round: '',
            //   customerName: '',
            //   address: ''
            // })
            // setDeEx('')
            console.log({
              ref_do_no: input.refNo,
              question_type: input.question_type,
              status: 'loading',
              total_qty: input.qty,
              invoice_no: input.invoiceNo,
              round: input.round,
              customer_name: input.customerName,
              address: input.address
            })
            await inputLoadingDoc(
              {
                ref_do_no: input.refNo,
                question_type: input.question_type,
                status: 'loading',
                total_qty: input.qty,
                invoice_no: input.invoiceNo,
                round: input.round,
                customer_name: input.customerName,
                address: input.address
              },
              genDoc.id
            )

            router.push(`/scan-loading/check-pallet`)
            // router.push(`/scan-loading/checksheet1?id=${genDoc.id}`)
            setSubmitting(false)
          } catch (error) {
            alert(error)
          }
        }}
      >
        {props => showForm(props)}
      </Formik>
    </Layout>
  )
}
// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get('/pallet/document/gen-doc/', {
    headers: {
      Accept: 'application/json'
    }
  })
  console.log(response)

  return {
    props: {
      genDoc: response.data
    }
  }
}
export default withAuth(Scan)
