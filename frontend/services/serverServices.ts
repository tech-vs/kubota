import { GetSession } from '@/models/auth.model'
import httpClient from '@/utils/httpClient'
type signInProps = {
  username: string
  password: string
}

type addUserProps = {
  username: string
  password: string
  role: string
}
type deleteUserProps = {
  username: string
}

type exportExcelProps = {
  customer: string
}

export const signIn = async (user: signInProps) => {
  console.log('services')

  const { data: response } = await httpClient.post('/auth/signin', user, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response
}

export const getSession = async (): Promise<GetSession> => {
  const response = await httpClient.get(`/auth/session`, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })

  return response.data
}

export const signOut = async (): Promise<void> => {
  const response = await httpClient.get(`/auth/signout`, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response.data
}

export const addUser = async (data: addUserProps): Promise<void> => {
  const response = await httpClient.post('/auth/adduser', data, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response.data
}

export const deleteUser = async (data: deleteUserProps): Promise<void> => {
  const response = await httpClient.delete('/auth/deleteuser', {
    data: data,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response.data
}

export const exportExcel = async (data: exportExcelProps): Promise<void> => {
  const response = await httpClient.post('/export', data, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response.data
}

export const importExcel = async (data: FormData): Promise<void> => {
  const response = await httpClient.post('/import', data, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response.data
}
