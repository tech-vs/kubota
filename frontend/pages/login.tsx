import withAuth from '@/components/withAuth'
import { signIn } from '@/store/slice/userSlice'
import { useAppDispatch } from '@/store/store'
import { Box, Container, Link, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { Field, Form, Formik, FormikProps } from 'formik'
import { TextField } from 'formik-material-ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {}
function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

const Login = (props: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const showForm = ({ handleSubmit }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <Field
          component={TextField}
          name='username'
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          autoComplete='email'
          autoFocus
          style={{ mt: 1 }}
        />
        <Field
          component={TextField}
          name='password'
          margin='normal'
          required
          fullWidth
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          style={{ mt: 1 }}
        />

        <Button type='submit' variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Form>
    )
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
      <Image src='/img/kubota-icon.jpg' layout='fixed' width={350} height={100} objectFit='contain' alt='logo' />
      <Typography component='h1' variant='h5' sx={{ mt: 3 }}>
        Sign in
      </Typography>
      <Container maxWidth='xs'>
        <Box sx={{ height: 200, mt: 1 }}>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async values => {
              const response = await dispatch(signIn(values))
              if (response.meta.requestStatus === 'rejected') {
                alert('Login failed')
              } else {
                router.push('/')
              }
            }}
          >
            {props => showForm(props)}
          </Formik>
        </Box>
      </Container>
      <style jsx global>
        {`
          body {
            min-height: 100vh;
            position: relative;
            margin: 0;
            background-size: cover;
            background-image: url('/static/img/bg4.jpg');
            text-align: center;
          }
        `}
      </style>
    </Box>
  )
  {
    /* <Copyright sx={{ mt: 8, mb: 4 }} /> */
  }
}
export default withAuth(Login)
