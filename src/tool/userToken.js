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
    userToken = null
    localStorage.removeItem('user_token')
  }
}
