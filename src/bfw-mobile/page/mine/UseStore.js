import { createUseStore } from '../../../tool/useData.js'
import http from '../../../tool/http.js'
import { userState } from '../../../tool/userToken.js'

export const loginLinkState = createUseStore('')
export const useUserInfo = createUseStore({
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
        useUserInfo.setStore(value.user_info)
        return value
      }
    })
  }
}
