import { createUseReducer, createUseStore } from '../../../tool/useData.js'
import http from '../../../tool/http.js'
import { diffCatch } from '../../../tool/util.js'

export const homeMenuData = createUseStore({
  radio: '',
  banner_list: [],
  game_list: []
})

function reducer (state, action) {
  switch (action.type) {
    case 'TIME_UPDATE':
      return Object.assign({}, state, {
        time: action.time,
        gameStatus: action.gameStatus
      })
    case 'GAME_STATUS_UPDATE':
      return Object.assign({}, state, { gameStatus: action.gameStatus })
    case 'GAME_ID_UPDATE':
      return Object.assign({}, state, {
        gameId: action.gameId,
        gameStatus: action.gameStatus, // 赛程赛果
      })
    case 'ADD_SCHEDULE_LIST':
      return Object.assign({}, state, {
        start_match_list: {
          ...state.start_match_list,
          [state.gameId + state.time]: action.start_match_list
        },
        not_start_match_list: {
          ...state.not_start_match_list,
          [state.gameId + state.time]: action.not_start_match_list
        },
        end_match_list: {
          ...state.end_match_list,
          [state.gameId + state.time]: action.end_match_list
        },
      })
    default:
      throw new Error('action.type错误')
  }
}

export const homeGameX = createUseReducer(reducer, {
  gameId: 0, // 游戏id
  gameStatus: 0, // 赛程赛果
  time: '',
  start_match_list: {}, // 'gameId-time':[]
  not_start_match_list: {},
  end_match_list: {},
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
  getScheduleList (gameId, time) {
    let state
    if (gameId === undefined) {
      state = homeGameX.getStoreX()
      gameId = state.gameId
    }
    if (time === undefined) {
      !state && (state = homeGameX.getStoreX())
      time = state.time
    }
    return http.getHomeSchedule(gameId, time).then(function (value) {
      if (value) {
        const valueVE = diffCatch(value)({
          start_match_list: [],
          not_start_match_list: [],
          end_match_list: [],
        })
        homeGameX.dispatchX({
          type: 'ADD_SCHEDULE_LIST',
          start_match_list: valueVE.start_match_list,
          not_start_match_list: valueVE.not_start_match_list,
          end_match_list: valueVE.end_match_list,
        })
      }
    })
  }
}
