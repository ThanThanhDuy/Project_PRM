import axiosApi from '../axiosApi/axiosApi'

const axiosUserApi = {
  checkUser: params => {
    const url = 'User/CheckUser'
    return axiosApi.get(url, { params })
  }
}

export default axiosUserApi
