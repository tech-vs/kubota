import { getSession } from '@/store/slice/userSlice'
import { store } from '@/store/store'
import { createTheme, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { env } from 'process'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: env.NEXT_PUBLIC_APP_ENV == 'production' ? '#3f51b5' : '#36454F'
      },
      secondary: {
        main: '#f50057'
      }

      // success: {
      //   main: '#658354'
      // },
      // warning: {
      //   main: '#FF0000'
      // }
    },
    typography: {
      fontFamily: 'Ubuntu'
    },
    shape: {
      borderRadius: 10
    }
  })
  // update session & set token
  useEffect(() => {
    store.dispatch(getSession())
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>Kubota</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
