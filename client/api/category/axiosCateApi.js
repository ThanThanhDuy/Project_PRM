import axiosApi from '../axiosApi/axiosApi'

const axiosCateApi = {
  getCatePopular: tokenStr => {
    const url = 'Category/GetCate'
    return axiosApi.get(url, {
      headers: { Authorization: `Bearer ${tokenStr}` }
    })
  }
}

export default axiosCateApi
