import axiosApi from '../axiosApi/axiosApi'

const axiosBookApi = {
  getBookPopular: (tokenStr, params) => {
    const url = 'Book/GetBook'
    return axiosApi.get(url, {
      headers: { Authorization: `Bearer ${tokenStr}` },
      params: params
    })
  },
  getBookByCate: (tokenStr, params) => {
    const url = 'Book/GetBookByCate'
    return axiosApi.get(url, {
      headers: { Authorization: `Bearer ${tokenStr}` },
      params: params
    })
  },
  getBookBySearch: (tokenStr, params) => {
    const url = 'Book/FindBook'
    return axiosApi.get(url, {
      headers: { Authorization: `Bearer ${tokenStr}` },
      params: params
    })
  }
}

export default axiosBookApi
