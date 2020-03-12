import { createUseStore } from '../../../tool/useData.js'
import http from '../../../tool/http.js'
import { userState } from '../../../tool/userToken.js'

export const loginLinkState = createUseStore('')
const userInfo = localStorage.getItem('user_info')
export const useUserInfo = createUseStore((userInfo && JSON.parse(userInfo)) || {
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

export default {
  userLogin (mobile, password) {
    return http.postLogin(mobile, password).then(value => {
      if (value) {
        userState.userToken(value.token)
        localStorage.setItem('user_info', JSON.stringify(value.user_info))
        useUserInfo.setStore(value.user_info)
        return value
      }
    })
  }
}
