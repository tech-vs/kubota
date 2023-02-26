import Layout from '@/components/Layouts/Layout'
import { addUser, deleteUser } from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { ChangeEvent, Fragment, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as Yup from 'yup'
{
  /* <Avatar sx={{ mr: 2 }}>test</Avatar> */
}

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Required'),
  role: Yup.string().required('Required')
})

const rows = [
  { id: 1, role: 'ADMIN', user: 'test1' },
  { id: 2, role: 'NOT_ADMIN', user: 'test2' },
  { id: 3, role: 'ADMIN', user: 'test3' },
  { id: 4, role: 'NOT_ADMIN', user: 'test4' },
  { id: 5, role: 'ADMIN', user: 'test5' },
  { id: 6, role: 'NOT_ADMIN', user: 'test6' },
  { id: 7, role: 'NOT_ADMIN', user: 'test7' },
  { id: 8, role: 'NOT_ADMIN', user: 'test8' },
  { id: 9, role: 'NOT_ADMIN', user: 'test9' }
]

const User = ({ user }: any) => {
  const MySwal = withReactContent(Swal)
  const theme = useTheme()
  const router = useRouter()
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const [addUserForm, setAddUserForm] = useState({
    username: '',
    password: '',
    role: 'ADMIN',
    email: '',
    first_name: '',
    last_name: ''
  })
  const [deleteUsername, setDeleteUsername] = useState({
    username: '',
    id: ''
  })
  const [addUserPopUpOpen, setAddUserPopUpOpen] = useState(false)

  const handleAddUserPopUpOpen = () => {
    setAddUserPopUpOpen(true)
  }

  const handleAddUserPopUpClose = () => {
    setAddUserPopUpOpen(false)
  }
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false)

  const handleDeletePopUpOpen = () => {
    setDeletePopUpOpen(true)
  }

  const handleDeletePopUpClose = () => {
    setDeletePopUpOpen(false)
  }

  const [editPopUpOpen, setEditPopUpOpen] = useState(false)

  const handleEditPopUpOpen = () => {
    setEditPopUpOpen(true)
  }

  const handleEditPopUpClose = () => {
    setEditPopUpOpen(false)
  }
  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'User',
      width: 150,
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField'
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField'
    },
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 200,
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField'
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      width: 200,
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField'
    },
    {
      field: 'blank',
      headerName: '',
      flex: 1,
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField'
    },
    {
      field: 'action',
      headerName: '',
      headerAlign: 'center',
      headerClassName: 'headerField',
      align: 'center',
      cellClassName: 'cellField',
      renderCell: ({ row }: GridRenderCellParams<string>) => {
        return (
          <Fragment>
            <IconButton onClick={handleEditPopUpOpen}>
              <EditIcon sx={{ color: '#B1D4E0' }} />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              onClick={() => {
                setDeletePopUpOpen(true)
                setDeleteUsername({ username: row.username, id: row.id })
              }}
            >
              <DeleteIcon sx={{ color: '#FF0000' }} />
            </IconButton>
          </Fragment>
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
          height: '30px'
        }}
      >
        <Typography variant='h5'>User Management</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleAddUserPopUpOpen}
          variant='contained'
          sx={{ borderRadius: 50 }}
          startIcon={<AddCircleIcon />}
        >
          Add User
        </Button>
      </Box>

      <Box
        sx={{
          height: 600,
          width: '100%',
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
        <DataGrid
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden'
            },
            // '& .MuiDataGrid-columnSeparator': {
            //   display: 'none'
            // },
            '& .cold': {
              backgroundColor: '#21B6A8'
            },
            '& .hot': {
              color: 'error.main'
            },
            '& .MuiDataGrid-scrollArea--right': {
              display: 'none'
            },

            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          rows={user}
          columns={columns}
          getCellClassName={(params: GridCellParams<string>) => {
            if (params.value == 'ADMIN') {
              return 'cold'
            }
            if (params.value == 'NOT_ADMIN') {
              return ''
            }
            return ''
          }}
          pageSize={15}
          rowsPerPageOptions={[15]}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          initialState={{
            pagination: {
              pageSize: 15
            }
          }}
        />
      </Box>
      <Formik
        initialValues={{ username: '', password: '', role: '', email: '', first_name: '', last_name: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            let data = {
              username: values.username,
              password: values.password,
              role: values.role,
              email: values.email,
              first_name: values.first_name,
              last_name: values.last_name
            }
            await addUser(data)
            refreshData()
            setSubmitting(false)
            setAddUserPopUpOpen(false)
          } catch (error) {
            MySwal.fire({
              text: 'Error',
              position: 'top',
              confirmButtonColor: theme.palette.primary.main
            })
          }
        }}
      >
        {props => {
          const { setFieldValue, isSubmitting, submitForm } = props
          return (
            <Dialog open={addUserPopUpOpen} onClose={handleAddUserPopUpClose}>
              <DialogTitle>Create User</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send updates occasionally.
                </DialogContentText>
                <TextField
                  required
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Username'
                  type='text'
                  fullWidth
                  variant='standard'
                  value={addUserForm.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAddUserForm({ ...addUserForm, username: e.target.value })
                    setFieldValue('username', e.target.value)
                  }}
                />
                <TextField
                  required
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Password'
                  type='password'
                  fullWidth
                  variant='standard'
                  value={addUserForm.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAddUserForm({ ...addUserForm, password: e.target.value })
                    setFieldValue('password', e.target.value)
                  }}
                />
                <TextField
                  required
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Email'
                  type='text'
                  fullWidth
                  variant='standard'
                  value={addUserForm.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAddUserForm({ ...addUserForm, email: e.target.value })
                    setFieldValue('email', e.target.value)
                  }}
                />
                <TextField
                  required
                  autoFocus
                  margin='dense'
                  id='name'
                  label='First Name'
                  type='text'
                  fullWidth
                  variant='standard'
                  value={addUserForm.first_name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAddUserForm({ ...addUserForm, first_name: e.target.value })
                    setFieldValue('first_name', e.target.value)
                  }}
                />
                <TextField
                  required
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Last Name'
                  type='text'
                  fullWidth
                  variant='standard'
                  value={addUserForm.last_name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAddUserForm({ ...addUserForm, last_name: e.target.value })
                    setFieldValue('last_name', e.target.value)
                  }}
                />
                <FormControl fullWidth required sx={{ minWidth: 120, minHeight: 60, mt: 4 }}>
                  <InputLabel required id='demo-simple-select-required-label'>
                    Role
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-required-label'
                    id='demo-simple-select-required'
                    label='Role *'
                    value={addUserForm.role}
                    onChange={(e: SelectChangeEvent<string>) => {
                      e.preventDefault()
                      setAddUserForm({ ...addUserForm, role: e.target.value })
                      setFieldValue('role', e.target.value)
                    }}
                  >
                    <MenuItem value={'Administrator'}>Administrator</MenuItem>
                    <MenuItem value={'Operator'}>Operator</MenuItem>
                    <MenuItem value={'Manager'}>Manager</MenuItem>
                    <MenuItem value={'Clerk'}>Clerk</MenuItem>
                    <MenuItem value={'Leader'}>Leader</MenuItem>
                    <MenuItem value={'Engineer'}>Engineer</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAddUserPopUpClose}>Cancel</Button>
                <Button type='submit' disabled={isSubmitting} onClick={submitForm}>
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          )
        }}
      </Formik>
      <Dialog open={deletePopUpOpen} onClose={handleDeletePopUpClose} fullWidth>
        <Box position='absolute' top={0} right={0}></Box>
        <DialogContent>
          <Typography>{`Are you sure to delete user: ${deleteUsername.username}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={handleDeletePopUpClose}>
            Cancel
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={async () => {
              await deleteUser(deleteUsername.id)
              setDeletePopUpOpen(false)
              refreshData()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editPopUpOpen} onClose={handleEditPopUpClose} fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='New Password'
            type='password'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditPopUpClose}>Cancel</Button>
          <Button onClick={handleEditPopUpClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const response = await httpClient.get('/account/user/', {
    headers: {
      Accept: 'application/json'
    }
  })
  return {
    props: {
      user: response.data.results
    }
  }
}

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default User
