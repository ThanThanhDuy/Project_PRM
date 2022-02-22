// api/axiosClient.js
import axios from 'axios'
import queryString from 'query-string'
// Set up default config for http requests here

const axiosApi = axios.create({
  baseURL: 'http://trahetmon.site/api/',
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
})
axiosApi.interceptors.request.use(async config => {
  // Handle token here ...
  console.log(
    '-----------------------------------Start Request----------------------------------'
  )
  console.log('Starting Request', JSON.stringify(config, null, 2))
  return config
})
axiosApi.interceptors.response.use(
  response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    console.log(
      '-----------------------------------End Request----------------------------------'
    )
    return response
  },
  error => {
    // Handle errors
    throw error
  }
)
export default axiosApi
