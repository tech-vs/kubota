import Layout from '@/components/Layouts/Layout'
import { approveDocument, rejectDocument } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  alpha,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams, gridClasses } from '@mui/x-data-grid'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useState } from 'react'
import * as Yup from 'yup'
type Props = {}

const ODD_OPACITY = 0.2
const RejectSchema = Yup.object().shape({
  remark_reject: Yup.string().required('Required')
})

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}))
const Approval = ({ list, accessToken, role }: any) => {
  const router = useRouter()

  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  const isMobile = isSM || isMD || isXS

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

  //reject Document
  const [reject, setReject] = useState({
    id: '',
    remark_reject: ''
  })
  const [rejectPopUpOpen, setRejectPopUpOpen] = useState(false)

  const handleRejectPopUpOpen = () => {
    setRejectPopUpOpen(true)
  }

  const handleRejectPopUpClose = () => {
    setRejectPopUpOpen(false)
  }

  const columns: GridColDef[] = [
    {
      field: 'doc_no',
      headerName: 'Document No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'delivery_date',
      headerName: 'Delivery Date',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      type: 'string',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'ref_do_no',
      headerName: 'Ref Doc No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'total_qty',
      headerName: 'Total QTY',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'invoice_no',
      headerName: 'Invoice No.',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'round',
      headerName: 'Round',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'customer_name',
      headerName: 'Customer Name',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 150
    },
    {
      field: 'address',
      headerName: 'Address',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'role',
      headerName: 'Role',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      width: 100
    },
    {
      field: 'view',
      headerName: 'View',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      width: 100,
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        return (
          <Button
            variant='contained'
            onClick={() => router.push(`/preview/${row.id}?type=2`)}
            sx={{ borderRadius: 25 }}
          >
            View
          </Button>
        )
      }
    },
    {
      field: 'approve',
      headerName: 'Approval',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      width: 125,
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        if (role == 'Administrator') {
          return <></>
        }
        return (
          <Button
            variant='contained'
            onClick={async () => {
              await approveDocument(row.id, role, accessToken)
              refreshData()
            }}
            sx={{ borderRadius: 50 }}
            color='success'
          >
            Approve
          </Button>
        )
      }
    },
    {
      field: 'reject',
      headerName: 'Reject',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      width: 125,
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        if (role == 'Administrator') {
          return <></>
        }
        return (
          <Button
            variant='contained'
            onClick={async () => {
              setReject({ ...reject, id: row.id })
              setRejectPopUpOpen(true)
            }}
            sx={{ borderRadius: 50 }}
            color='error'
          >
            Reject
          </Button>
        )
      }
    }
  ]
  return (
    <>
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
        <Typography variant='h5'>Management Approval</Typography>
      </Box>

      <Box
        sx={{
          height: 720,
          width: isMobile ? '100%' : 1225,
          '& .cold': {
            color: 'success.main'
          },
          '& .hot': {
            color: 'error.main'
          },
          '& .headerField': {
            fontSize: 12
          },
          '& .customerField': {
            backgroundColor: '#c7ddb5'
          },
          '& .cellField': {
            fontSize: 12
          }
        }}
      >
        <StripedDataGrid
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
          rows={list}
          columns={columns}
          getCellClassName={(params: GridCellParams<string>) => {
            if (params.field === 'customer') {
              return 'customerField'
            }
            if (params.value == 'OK') {
              return 'cold'
            }
            if (params.value == 'Waiting') {
              return 'hot'
            }
            return ''
          }}
          pageSize={12}
          rowsPerPageOptions={[12]}
          disableSelectionOnClick
          disableVirtualization
          disableExtendRowFullWidth
          disableIgnoreModificationsIfProcessingProps
          disableColumnSelector
        />
      </Box>
      <Dialog open={rejectPopUpOpen} onClose={handleRejectPopUpClose} fullWidth>
        <Box position='absolute' top={0} right={0}></Box>
        <DialogContent>
          <Typography>{`Are you sure to reject this document`}</Typography>
        </DialogContent>
        <TextField
          required
          autoFocus
          margin='dense'
          id='name'
          label='Remark'
          type='text'
          fullWidth
          variant='standard'
          value={reject.remark_reject}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setReject({ ...reject, remark_reject: e.target.value })
          }}
        />
        <DialogActions>
          <Button color='primary' variant='contained' onClick={handleRejectPopUpClose}>
            Cancel
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={async () => {
              await rejectDocument(reject.id, reject.remark_reject, accessToken)
              setRejectPopUpOpen(false)
              refreshData()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  // const session = await getSession()
  // console.log(session)
  const cookies = cookie.parse(context.req.headers.cookie || '')
  const accessToken = cookies['access_token']
  const profile = await httpClient.get(`/account/profile/`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  const role = profile.data.role

  if (role == 'Leader') {
    const response = await httpClient.get(`pallet/document/?status=wait_approve`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    console.log(response.data)
    return {
      props: {
        list: response.data.results,
        accessToken,
        role
      }
    }
  }

  if (role == 'Clerk') {
    const response = await httpClient.get(`pallet/document/?status=leader_approved`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return {
      props: {
        list: response.data.results,
        accessToken,
        role
      }
    }
  }

  if (role == 'Engineer') {
    const response = await httpClient.get(`pallet/document/?status=clerk_approved`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return {
      props: {
        list: response.data.results,
        accessToken
      }
    }
  }
  if (role == 'Manager') {
    const response = await httpClient.get(`pallet/document/?status=engineer_approved`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return {
      props: {
        list: response.data.results,
        accessToken,
        role
      }
    }
  }
  if (role == 'Administrator') {
    const response_leader = await httpClient.get(`pallet/document/?status=wait_approve`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const response_leader_withRole = response_leader.data.results.map((response: any) => {
      return { ...response, role: 'Leader' }
    })
    const response_clerk = await httpClient.get(`pallet/document/?status=leader_approved`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const response_clerk_withRole = response_clerk.data.results.map((response: any) => {
      return { ...response, role: 'Clerk' }
    })
    const response_engineer = await httpClient.get(`pallet/document/?status=clerk_approved`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const response_engineer_withRole = response_engineer.data.results.map((response: any) => {
      return { ...response, role: 'Clerk' }
    })
    const response_manager = await httpClient.get(`pallet/document/?status=engineer_approved`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const response_manager_withRole = response_manager.data.results.map((response: any) => {
      return { ...response, role: 'Clerk' }
    })
    const response_all = [
      ...response_leader_withRole,
      ...response_clerk_withRole,
      ...response_engineer_withRole,
      ...response_manager_withRole
    ]
    return {
      props: {
        list: response_all,
        accessToken,
        role
      }
    }
  }
}

Approval.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Approval
