import { diffCatch, searchFormat } from './util'

let aboutUrl = ''
let baseURL = '/'
if (process.env.REACT_APP_build_url === 'test') {
  baseURL = 'http://scoreapitest.firebulls.net'
  aboutUrl = baseURL + '/help/about'
  // 打包测试地址
} else if (process.env.REACT_APP_build_url === 'prod') {
  baseURL = 'https://scoreapi.firebulls.net'
  aboutUrl = baseURL + '/help/about'
  // 打包正式地址
} else if (process.env.NODE_ENV !== 'production') {
  // 开发
  baseURL = '/prod'
  aboutUrl = baseURL + '/help/about'
}
export const StaticURL = {
  about: aboutUrl
}
const headers = new Headers()

// headers.append('Content-Type', 'application/json; charset=utf-8')

function responseInit (response) {
  try {
    if (response.ok) {
      // return response.json()
      return response.json().then(value => {
        if (value && (value.code || value.data)) {
          return value.data
        }
        return Promise.reject(value)
      })
    } else {
      return Promise.reject(response)
    }
  } catch (e) {
    return Promise.reject(response)
  }
}

const Http = {
  get (url = '', params = {}, head) {
    url = `${baseURL}${url}${searchFormat(params)}`
    if (head) {
      Object.entries(head).forEach(val => {
        headers.append(val[0], val[1])
      })
    }
    return fetch(url, {
      method: 'GET',
      headers,
    }).then(responseInit)
  },
  post (url = '', data = {}, params = {}, head) {
    url = `${baseURL}${url}${searchFormat(params)}`
    const formData = new FormData()
    Object.entries(data).forEach(val => {
      formData.append(val[0], val[1])
    })
    if (head) {
      Object.entries(head).forEach(val => {
        headers.append(val[0], val[1])
      })
    }
    return fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    }).then(responseInit)
  },
}

export const http = {
  getHomeMenu () {
    return Http.get('/home')
  },
  getHomeSchedule (gameId, time, type) {
    return Http.get('/schedule', {
      game_id: gameId,
      type,
      time,
    })
  },
  getMatchDetails (smid) {
    return Http.get('/details', { smid })
  },
  getMatchAnalysis (smid) {
    return Http.get('/analysis', { smid })
  },
  getMatchData (smid, round) {
    return Http.get('/match', {
      smid,
      round
    }).then(value => {
      return diffCatch(value)({
        economic_curve_list: [],
        match_list: {
          real_players: [],
          end_match: []
        }
      })
    })
  },
  postLogin (mobile, password) {
    return Http.post('/login', {
      mobile,
      password,
      device_type: 'web'
    })
  },
  postCode (mobile) {
    return Http.post('/code', {
      mobile,
    })
  },
  postRegister ({ password, mobile, confirmPassword, code }) {
    return Http.post('/register', {
      password,
      mobile,
      confirm_password: confirmPassword,
      code
    })
  },
  postPasswordReset ({ password, mobile, code }) {
    return Http.post('/passwordReset', {
      password,
      mobile,
      code
    })
  },
  postLoginOut (Token) {
    return Http.post('/logout', {}, {}, {
      'XX-Token': Token,
      'XX-Device-Type': 'web'
    })
  },
  postChangePassword ({ password, mobile, confirmPassword, code }) {
    return Http.post('/changePassword', {
      mobile,
      password,
      confirm_password: confirmPassword
    })
  }
}
export default http
