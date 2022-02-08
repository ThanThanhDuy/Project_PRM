const userApi = {
  getUser: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: {
            firstName: 'Thanh',
            lastName: 'Duy'
          }
        })
      }, 1000)
    })
  }
}

export default userApi
