import { diffCatch, searchFormat } from './util'

let baseURL = '/'
if (process.env.REACT_APP_build_url === 'test') {
  baseURL = 'http://scoreapitest.firebulls.net'
  // 打包测试地址
} else if (process.env.REACT_APP_build_url === 'prod') {
  baseURL = 'https://scoreapi.firebulls.net'
  // 打包正式地址
} else if (process.env.NODE_ENV !== 'production') {
  // 开发
  baseURL = '/dev'
}

const headers = new Headers()

// headers.append('Content-Type', 'application/json; charset=utf-8')

function responseInit (response) {
  try {
    if (response.ok) {
      return response.json().then(value => {
        if (value.data) {
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
  get (url = '', params = {}) {
    url = `${baseURL}${url}${searchFormat(params)}`
    return fetch(url, {
      method: 'GET',
      headers,
    }).then(responseInit)
  },
  post (url = '', data = {}, params = {}) {
    url = `${baseURL}${url}${searchFormat(params)}`
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then(responseInit)
  },
}

export const http = {
  getHomeMenu () {
    return Http.get('/home')
  },
  getHomeSchedule (gameId, time) {
    return Http.get('/schedule', {
      game_id: gameId,
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

}
export default http
