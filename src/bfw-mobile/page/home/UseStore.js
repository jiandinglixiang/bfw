import { createUseReducer, createUseStore } from '../../../tool/useData.js'
import http from '../../../tool/http.js'
import { diffCatch } from '../../../tool/util.js'

export const homeMenuData = createUseStore({
  radio: '',
  banner_list: [],
  game_list: []
})

function reducer (state, action) {
  let name
  switch (action.type) {
    case 'TIME_UPDATE':
      return Object.assign({}, state, {
        time: action.time,
        gameType: action.gameType
      })
    case 'GAME_STATUS_UPDATE':
      return Object.assign({}, state, { gameType: action.gameType })
    case 'GAME_ID_UPDATE':
      return Object.assign({}, state, {
        gameId: action.gameId,
        gameType: action.gameType, // 赛程赛果
      })
    case 'ADD_SCHEDULE_LIST':
      name = 'schedule_list' + state.gameType
      return Object.assign({}, state, {
        [name]: {
          ...state[name],
          [state.gameId + state.time]: action.schedule_list
        },
      })
    default:
      throw new Error('action.type错误')
  }
}

export const homeGameX = createUseReducer(reducer, {
  gameId: 0, // 游戏id
  time: '',
  gameType: 0, // 0赛程1进行中2赛果
  schedule_list0: {}, // 'gameId-time':[]
  schedule_list1: {}, // 'gameId-time':[]
  schedule_list2: {}, // 'gameId-time':[]
})

export default {
  getHomeMenu () {
    return http.getHomeMenu().then(function (value) {
      if (value) {
        const valueVE = diffCatch(value)({
          radio: '',
          banner_list: [],
          game_list: []
        })
        homeMenuData.setStore(valueVE)
      }
    })
  },
  getScheduleList (gameId, time, type) {
    let state
    if (gameId === undefined) {
      state = homeGameX.getStoreX()
      gameId = state.gameId
    }
    if (time === undefined) {
      !state && (state = homeGameX.getStoreX())
      time = state.time
    }
    if (type === undefined) {
      !state && (state = homeGameX.getStoreX())
      type = state.gameType
    }
    return http.getHomeSchedule(gameId, time, type).then(function (value) {
      if (value) {
        const valueVE = diffCatch(value)([])
        homeGameX.dispatchX({
          type: 'ADD_SCHEDULE_LIST',
          schedule_list: valueVE
        })
      }
    })
  }
}
