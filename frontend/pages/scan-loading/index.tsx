import Layout from '@/components/Layouts/Layout'
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
  Typography,
  useTheme
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type Props = {}

var Amatanakhon =
  '700/867 Moo 3 Amata Nakhon Industrial Estate, Tambon Nong Ka Kha,District, Panthong District, Chon Buri 20160'
var Navanakorn =
  '101/19-24 Moo 20 Navanakorn Industrial Estate, Tambon Khlongnueng,District Khlongluang, Pathumthani 12120'
const Scan = ({ genDoc }: any) => {
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath, undefined, {
      scroll: false
    })
  }

  const [deEx, setDeEx] = useState<string>('')
  const [customer, setCustomer] = useState<string>('SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)')
  const [address, setAddress] = useState<string>(Amatanakhon)
  const [input, setInput] = useState({
    refNo: genDoc.ref_do_no || '',
    qty: genDoc.total_qty || '',
    invoiceNo: genDoc.invoice_no || '',
    round: genDoc.round || '',
    customerName: genDoc.customer_name || '',
    address: genDoc.address || '',
    question_type: genDoc.question_type
  })

  function resetStateFormData() {
    setInput(previousInputs => ({
      ...previousInputs,
      refNo: '',
      qty: '',
      invoiceNo: '',
      round: '',
      customerName: '',
      address: ''
    }))
  }

  const doNoRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   if (doNoRef.current) {
  //     console.log(doNoRef)
  //     doNoRef.current.focus()
  //   }
  // }, [doNoRef.current])

  useEffect(() => {
    async function call() {
      setInput({
        ...input,
        address:
          input.customerName == 'SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)'
            ? Amatanakhon
            : input.customerName == 'SIAM KUBOTA Corporation Co., Ltd (Navanakorn Factory)'
            ? Navanakorn
            : ''
      })
    }
    call()
  }, [input.customerName])

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSucess] = useState<boolean>(false)
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
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
          <Typography variant='h5'>Scan Loading</Typography>
        </Box>
        <Card sx={{ mx: { xs: 0, md: 6 } }}>
          <CardContent sx={{ py: 4, px: { xs: 4, md: 8 } }}>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 3,
                position: 'relative'
              }}
            >
              <TextField
                size='small'
                required
                fullWidth
                id='filled-basic'
                label='Doc No.'
                variant='outlined'
                value={genDoc.doc_no}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                }}
              />
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
                size='small'
                required
                fullWidth
                id='filled-basic'
                label='Del Date'
                variant='outlined'
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
                my: 3,
                position: 'relative'
              }}
            >
              <FormControl fullWidth required>
                <InputLabel id='demo-simple-select-required-label'>Select...</InputLabel>
                <Select
                  labelId='demo-simple-select-required-label'
                  id='demo-simple-select-required'
                  label='deEx *'
                  value={input.question_type}
                  onChange={(e: SelectChangeEvent<string>) => {
                    // e.preventDefault()
                    // always reset data before setnew data
                    resetStateFormData()
                    resetForm()

                    setInput(previousInputs => ({ ...previousInputs, question_type: e.target.value }))
                    setFieldValue('input.question_type', e.target.value)
                    // setDeEx(e.target.value)
                    // setFieldValue('deEx', e.target.value)
                  }}
                  onClose={() => {
                    setTimeout(() => {
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur()
                      }
                    }, 0)
                  }}
                  onBlur={() => {
                    doNoRef.current?.focus()
                  }}
                >
                  <MenuItem value={'Domestic'}>Domestic</MenuItem>
                  <MenuItem value={'Export'}>Export</MenuItem>
                </Select>
              </FormControl>
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
                inputRef={doNoRef}
                size='small'
                required
                fullWidth
                id='filled-basic'
                label='Ref, D/O No.'
                variant='outlined'
                value={input.refNo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, refNo: e.target.value })
                  setFieldValue('input.refNo', e.target.value)
                }}
              />
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
                size='small'
                required
                fullWidth
                id='filled-basic'
                label='Total Qty'
                variant='outlined'
                value={input.qty}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, qty: e.target.value })
                  setFieldValue('input.qty', e.target.value)
                }}
              />
            </Box>
            <Box
              component='main'
              sx={{
                display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                my: 3,
                position: 'relative'
              }}
            >
              {input.question_type == 'Domestic' ? (
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Invoice No.'
                  variant='outlined'
                  value={input.invoiceNo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setInput({ ...input, invoiceNo: e.target.value })
                    setFieldValue('input.invoiceNo', e.target.value)
                  }}
                />
              ) : input.question_type == 'Export' ? (
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Container No. / Seal No.'
                  variant='outlined'
                  value={input.invoiceNo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setInput({ ...input, invoiceNo: e.target.value })
                    setFieldValue('input.invoiceNo', e.target.value)
                  }}
                />
              ) : (
                ''
              )}
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
                size='small'
                required
                fullWidth
                id='filled-basic'
                label='Round'
                variant='outlined'
                value={input.round}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setInput({ ...input, round: e.target.value })
                  setFieldValue('input.round', e.target.value)
                }}
              />
            </Box>
            {input.question_type == 'Domestic' ? (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <FormControl fullWidth required>
                  <InputLabel id='demo-simple-select-required-label'>Customer</InputLabel>
                  <Select
                    fullWidth
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
              </Box>
            ) : (
              ''
            )}
            {input.question_type == 'Domestic' ? (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Address'
                  variant='outlined'
                  value={
                    input.customerName == 'SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)'
                      ? Amatanakhon
                      : input.customerName == 'SIAM KUBOTA Corporation Co., Ltd (Navanakorn Factory)'
                      ? Navanakorn
                      : ''
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    if (input.address == null) {
                      setInput({ ...input, address: Amatanakhon })
                    } else {
                      setInput({ ...input, address: e.target.value })
                      setFieldValue('address', e.target.value)
                    }
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            ) : (
              ''
            )}
            {input.question_type == 'Export' ? (
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
                  label='Customer'
                  variant='outlined'
                  value={input.customerName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setInput({ ...input, customerName: e.target.value })
                    setFieldValue('customerName', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            ) : (
              ''
            )}
            {input.question_type == 'Export' ? (
              <Box
                component='main'
                sx={{
                  display: { xs: 'flex', md: 'flex', flexDirection: 'row' },
                  my: 3,
                  position: 'relative'
                }}
              >
                <TextField
                  size='small'
                  required
                  fullWidth
                  id='filled-basic'
                  label='Address'
                  variant='outlined'
                  value={input.address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setInput({ ...input, address: e.target.value })
                    setFieldValue('address', e.target.value)
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
            ) : (
              ''
            )}
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
                  height: { xs: '60px', md: 'auto' },
                  justifyContent: 'center',
                  background: { xs: '#fff' }
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  sx={{ marginRight: 1, width: { xs: '50%', md: '200px' }, height: '100%' }}
                >
                  OK
                </Button>
                <Button
                  variant='outlined'
                  size='large'
                  onClick={() => {
                    // router.push('scan-loading/check-pallet')
                    resetStateFormData()
                    resetForm()
                  }}
                  color='secondary'
                  sx={{ marginRight: 1, width: { xs: '50%', md: '200px' }, height: '100%' }}
                >
                  Clear
                </Button>
              </Box>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
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
    <Formik
      initialValues={{ deEx: '', refNo: '', qty: '', invoiceNo: '', round: '', customerName: '', address: '' }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
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
          setSubmitting(false)
        } catch (error) {
          await MySwal.fire({
            text: JSON.stringify(error),
            position: 'top',
            confirmButtonColor: theme.palette.primary.main
          })
        }
      }}
    >
      {props => showForm(props)}
    </Formik>
  )
}
// This gets called on every request
export async function getServerSideProps() {
  const response = await httpClient.get('/pallet/document/gen-doc/', {
    headers: {
      Accept: 'application/json'
    }
  })

  return {
    props: {
      genDoc: response.data
    }
  }
}

Scan.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Scan
