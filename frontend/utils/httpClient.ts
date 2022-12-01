import axios from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
})

export default httpClient
