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
  const response = await httpClient.delete(`/account/delete/${data}/`)
  return response.data
}

export const exportExcel = async (data: exportExcelProps): Promise<void> => {
  const response = await httpClient.post('/export', data, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
  })
  return response.data
}

export const scanPallet = async (data: scanPalletProps, accessToken: string): Promise<any> => {
  const response = await httpClient.post('/pallet/', data, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}
export const confirmCheckSheet1 = async (palletID: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/${palletID}/section/1/submit/`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

export const confirmCheckSheet2 = async (palletID: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/${palletID}/section/2/submit/`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

export const checksheetPartList = async (palletID: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/part-list/${palletID}/`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

// Loading
export const inputLoadingDoc = async (data: inputLoadingDocProps, id: string, accessToken: string): Promise<any> => {
  const response = await httpClient.patch(`/pallet/document/${id}/`, data, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

export const scanLoading = async (internalPalletNo: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/loading/?internal_pallet_no=${internalPalletNo}&status=finish_pack`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}
export const scanRepack = async (internalPalletNo: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/loading/?internal_pallet_no=${internalPalletNo}&status=repack`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

export const previewDocLoading = async (id: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/document/${id}/`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

export const confirmCheckSheet3 = async (palletID: String, accessToken: string): Promise<any> => {
  const response = await httpClient.get(`/pallet/${palletID}/section/3/submit/`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

export const submitLoading = async (data: submitLoadingProps, accessToken: string): Promise<any> => {
  const response = await httpClient.post(`/pallet/loading/submit/`, data, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response
}

export const approveDocument = async (id: string, role: string, accessToken: string): Promise<any> => {
  if (role == 'Leader') {
    const response = await httpClient.patch(
      `/pallet/document/${id}/`,
      {
        status: 'leader_approved'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    return response.data
  }
  if (role == 'Clerk') {
    const response = await httpClient.patch(
      `/pallet/document/${id}/`,
      {
        status: 'clerk_approved'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    return response.data
  }
  if (role == 'Engineer') {
    const response = await httpClient.patch(
      `/pallet/document/${id}/`,
      {
        status: 'engineer_approved'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    return response.data
  }
  if (role == 'Manager') {
    const response = await httpClient.patch(
      `/pallet/document/${id}/`,
      {
        status: 'manager_approved'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    return response.data
  }
}

export const rejectDocument = async (id: string, remark_reject: string, accessToken: string): Promise<any> => {
  const response = await httpClient.patch(
    `/pallet/document/${id}/reject/`,
    {
      remark_reject
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  )
  return response.data
}
export const importExcel = async (data: FormData): Promise<any> => {
  try {
    const response = await httpClient.post('/syncdata/master-loading/upload/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    alert(error)

    return error
  }
}

export const repack = async (id: string, accessToken: string): Promise<any> => {
  try {
    const response = await httpClient.patch(
      `/pallet/${id}/repack/`,
      {
        status: 'repack'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    return response.data
  } catch (error) {
    alert(error)

    return error
  }
}
