import { configureStore } from '@reduxjs/toolkit'
import { env } from 'process'
import { useDispatch } from 'react-redux'
import userReducer from './slice/userSlice'
const reducer = {
  user: userReducer
}

export const store = configureStore({
  reducer, // reducer: reducer
  devTools: env.NODE_ENV === 'development' ? false : true //true or false
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const userSelector = (store: RootState) => store.user
