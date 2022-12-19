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
type inputLoadingDocProps = {
  ref_do_no: string
  total_qty: string
  invoice_no: string
  round: string
  customer_name: string
  address: string
  question_type: string
  status: string
}

type exportExcelProps = {
  customer: string
}

type scanPalletProps = {
  pallet_skewer?: string
  part_list: PartList[]
  question_type: string
  nw_gw?: string
}

export interface PartList {
  prod_seq: string
  id_no: string
}
type submitLoadingProps = {
  is_send_approve: boolean
  pallet_id: Number
}

export const signIn = async (user: signInProps) => {
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

export const deleteUser = async (data: String): Promise<void> => {
  const response = await httpClient.delete(`/account/delete/${data}`)
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

export const scanPallet = async (data: scanPalletProps): Promise<any> => {
  const response = await httpClient.post('/pallet/', data)
  return response.data
}
export const confirmCheckSheet1 = async (palletID: String): Promise<any> => {
  const response = await httpClient.get(`/pallet/${palletID}/section/1/submit/`)
  return response.data
}

export const confirmCheckSheet2 = async (palletID: String): Promise<any> => {
  const response = await httpClient.get(`/pallet/${palletID}/section/2/submit/`)
  return response.data
}

export const checksheetPartList = async (palletID: String): Promise<any> => {
  const response = await httpClient.get(`/pallet/part-list/${palletID}/`)
  return response.data
}

// Loading
export const inputLoadingDoc = async (data: inputLoadingDocProps, id: string): Promise<any> => {
  const response = await httpClient.patch(`/pallet/document/${id}/`, data)
  return response.data
}

export const scanLoading = async (internalPalletNo: String): Promise<any> => {
  const response = await httpClient.get(`/pallet/loading/?internal_pallet_no=${internalPalletNo}&status=finish_pack`)
  return response.data
}

export const confirmCheckSheet3 = async (palletID: String): Promise<any> => {
  const response = await httpClient.get(`/pallet/${palletID}/section/3/submit/`)
  return response.data
}

export const submitLoading = async (data: submitLoadingProps): Promise<any> => {
  const response = await httpClient.post(`/pallet/loading/submit/`, data)
  return response.data
}

export const approveDocument = async (id: string): Promise<any> => {
  const response = await httpClient.patch(`/pallet/document/${id}/`, {
    status: 'approved'
  })
  return response.data
}
