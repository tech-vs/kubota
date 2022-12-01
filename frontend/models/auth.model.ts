import { UserData } from './user.model'

export interface SignIn {
  result: string
  token: string
  error?: string
  user: UserData
}

export interface GetSession {
  result: string
  error?: string
  user?: UserData
  role: string
}
