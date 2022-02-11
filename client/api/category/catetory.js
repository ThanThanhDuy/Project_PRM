const cateApi = {
  getCate: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Science - Technology'
          },
          {
            id: 2,
            name: 'Business - Finance'
          },
          {
            id: 3,
            name: 'Music'
          },
          {
            id: 4,
            name: 'Health'
          },
          {
            id: 5,
            name: 'Lifestyle'
          },
          {
            id: 6,
            name: 'Others'
          }
        ])
      }, 1000)
    })
  }
}

export default cateApi
