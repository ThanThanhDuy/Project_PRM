import { atom } from 'recoil'

export const userState = atom({
  key: 'userData',
  default: {}
})

export const userAccessTokenState = atom({
  key: 'userAccessToken',
  default: ''
})
