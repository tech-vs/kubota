import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { scanLoading, scanRepack } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import { Box, Button, TextField, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from 'react'
type Props = {}
const columns: GridColDef[] = [
  {
    field: 'model_code',
    headerName: 'Model Code',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'model_name',
    headerName: 'Model Name',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    type: 'string',
    cellClassName: 'cellField',
    width: 250
  },
  {
    field: 'serial_no',
    headerName: 'ID No.',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'country_code',
    headerName: 'Country Code',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'country_name',
    headerName: 'Country Name',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'distributor_code',
    headerName: 'Distributor Code',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },
  {
    field: 'distributor_name',
    headerName: 'Distributor Name',
    headerAlign: 'center',
    headerClassName: 'headerField',
    align: 'center',
    cellClassName: 'cellField',
    width: 150
  },

  {
    field: 'blank',
    headerName: '',
    headerClassName: 'headerField',
    flex: 1
  }
]
let scanLoadingResponse: any = {}
let scanLoadingResponseResult: any[] = []
const View = ({ genDoc }: any) => {
  const showForm = ({ values, setFieldValue, resetForm }: FormikProps<any>) => {
    const router = useRouter()
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
      router.replace(router.asPath)
    }
    const [scan, setScan] = useState({
      internalPalletNo: ''
    })

    useEffect(() => {
      async function call() {
        scanLoadingResponse = await scanLoading(scan.internalPalletNo)
        await scanRepack(scanLoadingResponse.pallet_id)
      }
      call()
    }, [scan])
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
          <Typography variant='h5'>Repack</Typography>
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
            value={scan.internalPalletNo}
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
          <Button
            variant='contained'
            onClick={async (e: any) => {
              e.preventDefault()
              setScan({ ...scan, internalPalletNo: e.target.value })
              setFieldValue('scan.internalPalletNo', e.target.value)

              refreshData()
            }}
            color='primary'
            sx={{ marginRight: 1 }}
          >
            OK
          </Button>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Form>
    )
  }
  return (
    <Layout>
      <Formik
        initialValues={{ file: null, customer: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(false)
          } catch (error) {
            alert('Error')
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

  return {
    props: {
      genDoc: response.data
    }
  }
}

export default withRouter(withAuth(View))