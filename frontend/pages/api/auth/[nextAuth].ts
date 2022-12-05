// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { clearCookie, setCookie } from '@/utils/cookiesUtil'
import httpClient from '@/utils/httpClient'
import cookie from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nextAuth } = req.query
  if (req.method === 'POST' && nextAuth === 'signin') {
    return signin(req, res)
  } else if (req.method === 'GET' && nextAuth === 'signout') {
    return signout(req, res)
  } else if (req.method === 'GET' && nextAuth === 'session') {
    return getSession(req, res)
  } else if (req.method === 'POST' && nextAuth === 'adduser') {
    return addUser(req, res)
  } else if (req.method === 'DELETE' && nextAuth === 'deleteuser') {
    return deleteUser(req, res)
  } else {
    return res.status(405).end(`test`)
  }
}

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await httpClient.post('/account/login', req.body)

    const { token } = response.data
    setCookie(res, 'access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/'
    })
    res.json(response.data)
  } catch (error: any) {
    res.status(400).end('hey')
  }
}

const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const accessToken = cookies['access_token']
    if (accessToken) {
      const response = await httpClient.get(`/account/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      res.json(response.data)
    } else {
      res.json({ result: 'nok' })
    }
  } catch (error: any) {
    res.json({ result: 'nok' })
  }
}
const signout = async (req: NextApiRequest, res: NextApiResponse) => {
  clearCookie(res, 'access_token')
  res.json({ result: 'ok' })
}

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const accessToken = cookies['access_token']
    if (accessToken) {
      const response = await httpClient.post(`/account/register`, req.body)
      res.json(response.data)
    } else {
      res.json({ result: 'nok' })
    }
  } catch (error: any) {
    res.json({ result: 'nok' })
  }
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const accessToken = cookies['access_token']
    if (accessToken) {
      console.log(req.body)

      const response = await httpClient.delete(`/account/delete`, {
        data: req.body,
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      res.json(response.data)
    } else {
      res.json({ result: 'nok' })
    }
  } catch (error: any) {
    res.json({ result: 'nok' })
  }
}

export default handler
