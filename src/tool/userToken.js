import { useUserInfo } from '../bfw-mobile/page/mine/UseStore.js'
import http from './http.js'

let userToken = localStorage.getItem('user_token')
export const userState = {
  userToken (token) {
    if (token) {
      userToken = token
      localStorage.setItem('user_token', token)
    }
    return userToken
  },
  clearToken () {
    http.postLoginOut(userToken)
    userToken = null
    useUserInfo.setStore({
      username: null,
      nickname: null,
      email: null,
      mobile: null,
      avatar: null,
      level: null,
      gender: null,
      birthday: null,
      money: null,
      score: null,
    })
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_info')
  }
}
