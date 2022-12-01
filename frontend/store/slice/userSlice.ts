import { GetSession } from '@/models/auth.model'
import * as serverService from '@/services/serverServices'
import httpClient from '@/utils/httpClient'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosRequestConfig } from 'axios'
import { UserData } from 'models/user.model'
import { NextRouter } from 'next/router'
import { RootState } from '../store'
interface UserState {
  username: string
  role: string
  accessToken: string
  error?: string
  isAuthenticated: boolean
  isAuthenticating: boolean
  user?: UserData
}
interface SignInAction {
  username: string
  password: string
}

interface resetUsernameProp {
  newUserName: string
}

const initialState: UserState = {
  username: '',
  role: '',
  accessToken: '',
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
  error: ''
}

export const signIn = createAsyncThunk('user/signin', async (credential: SignInAction) => {
  const response = await serverService.signIn(credential)

  if (response.result != 'ok') {
    throw new Error('login failed')
  }

  // set access token
  httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
    if (config && config.headers) {
      config.headers['Authorization'] = `Bearer ${response.token}`
    }

    return config
  })
  return response
})

export const getSession = createAsyncThunk<GetSession>('user/fetchSession', async () => {
  const response = await serverService.getSession()

  // set access token
  if (response) {
    httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
      if (config && config.headers && response.user) {
        config.headers['Authorization'] = `Bearer ${response.user.token}`
      }
      return config
    })
  }
  return response
})

export const signOut = createAsyncThunk('user/signout', async (router: NextRouter) => {
  await serverService.signOut()

  // clear token
  httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
    if (config && config.headers) {
      config.headers['Authorization'] = ''
    }
    return config
  })

  router.push('/')
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetUsername: (state, actions: PayloadAction<resetUsernameProp>) => {
      state.username = actions.payload.newUserName
    }
  },
  extraReducers: builder => {
    // fullfiled, pending, rejected
    console.log('extrareducer')
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.token
      state.username = action.payload.username
      state.role = action.payload.role
      state.isAuthenticated = true
      state.isAuthenticating = false
    })
    builder.addCase(signIn.rejected, (state, action) => {
      // state.error = action.error.message;
      state.isAuthenticated = false
      state.isAuthenticating = false
    })
    builder.addCase(signOut.fulfilled, state => {
      state.accessToken = ''
      state.user = undefined
      state.isAuthenticated = false
      state.isAuthenticating = false
    })
    builder.addCase(getSession.fulfilled, (state, action: PayloadAction<GetSession>) => {
      state.isAuthenticating = false
      if (action.payload && action.payload.user?.token) {
        state.accessToken = action.payload.user.token
        state.user = action.payload.user
        state.role = action.payload.user.role
        state.isAuthenticated = true
        console.log(state.user)
        console.log(state.role)
      }
    })
  }
})
export const { resetUsername } = userSlice.actions

// export common user selector
export const userSelector = (store: RootState): UserData | undefined => store.user.user
export const isAuthenticatedSelector = (store: RootState): boolean => store.user.isAuthenticated
// export const roleSelector = (store: RootState): String => store.user.role?
// // export reducer
export default userSlice.reducer
