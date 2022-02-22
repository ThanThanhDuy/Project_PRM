const bookApi = {
  getBook: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Getting Things Done : The Art of Stress-Free Productivity',
            image:
              'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/9/7/9780143126560.jpg'
          },
          {
            id: 2,
            name: 'Blue Ocean Strategy, Expanded Edition',
            image:
              'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_181251.jpg'
          },
          {
            id: 3,
            name: `Help Them Grow Or Watch Them Go`,
            image:
              'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/i/m/image_194977.jpg'
          },
          {
            id: 4,
            name: 'Kỷ Luật Làm Nên Con Người',
            image:
              'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/k/l/kllncn.jpg'
          },
          {
            id: 5,
            name: 'Phá Vỡ Giới Hạn Để Không Hoài Phí Tuổi Trẻ ',
            image:
              'https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/p/h/ph_-v_-gi_i-h_n-_-kh_ng-ho_i-ph_-tu_i-tr__b_a-1.jpg'
          }
        ])
      }, 1000)
    })
  }
}

export default bookApi
