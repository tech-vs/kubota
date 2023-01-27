import { getSession } from '@/store/slice/userSlice'
import { store } from '@/store/store'
import { createTheme, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { env } from 'process'
import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import type { NextPage } from 'next'
import { Provider } from 'react-redux'
import '../global.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#009ef7',
        contrastText: '#fff'
      },
      secondary: {
        main: '#f50057',
        contrastText: '#fff'
      },
      background: {
        default: "#F9F9F9"
      },
      success: {
        main: '#50cd89',
        contrastText: '#fff'
      },
      error: {
        main: '#f1416c'
      },
    },
    typography: {
      fontFamily: 'Ubuntu',
      htmlFontSize: 16,
    },
    shape: {
      borderRadius: 10
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        }
      }
    }
  })
  const getLayout = Component.getLayout ?? ((page) => page)
  // update session & set token
  useEffect(() => {
    store.dispatch(getSession())
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>Kubota</title>
          <meta name="viewport" content="width=device-width, initial-scale=0.75, user-scalable=no" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
