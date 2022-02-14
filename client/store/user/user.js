import { atom } from 'recoil'

export const userGoogleState = atom({
  key: 'userGoogleData',
  default: {}
})

export const userAppState = atom({
  key: 'userAppData',
  default: {}
})

export const googleAccessTokenState = atom({
  key: 'googleAccessToken',
  default: ''
})
