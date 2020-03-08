import { createUseReducer, createUseStore } from '../../../tool/useData.js'
import moment from 'moment'
import http from '../../../tool/http.js'
import { diffCatch } from '../../../tool/util.js'

export const [useStoreMenu, menuDispatch] = createUseStore({
  radio: '',
  banner_list: [],
  game_list: []
})

function reducer (state, action) {
  switch (action.type) {
    case 'TIME_UPDATE':
      return {
        ...state,
        time: action.time
      }
    case 'GAME_ID_UPDATE':
      return {
        ...state,
        gameId: action.gameId
      }
    case 'GAME_STATUS_UPDATE':
      return {
        ...state,
        gameStatus: action.gameStatus
      }
    case 'ADD_SCHEDULE_LIST':
      return {
        gameId: action.gameId, // 游戏id
        time: action.time,
        gameStatus: 0, // 赛程赛果
        start_match_list: {
          ...state.start_match_list,
          [action.gameId + action.time]: action.start_match_list
        },
        not_start_match_list: {
          ...state.not_start_match_list,
          [action.gameId + action.time]: action.not_start_match_list
        },
        end_match_list: {
          ...state.end_match_list,
          [action.gameId + action.time]: action.end_match_list
        },
      }
    default:
      throw new Error('action.type错误')
  }
}

export const { useStore: useStoreHome, dispatchFunc: homeDispatch, getState: getHomeData } = createUseReducer(reducer, {
  gameId: 0, // 游戏id
  gameStatus: 0, // 赛程赛果
  time: moment(Date.now()).format('YYYY-MM-DD'),
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
        menuDispatch(valueVE)
      }
    })
  },
  getScheduleList (gameId, time) {
    let state
    if (gameId === undefined) {
      state = getHomeData()
      gameId = state.gameId
    }
    if (time === undefined) {
      !state && (state = getHomeData())
      time = state.time
    }
    return http.getHomeSchedule(gameId, time).then(function (value) {
      if (value) {
        const valueVE = diffCatch(value)({
          start_match_list: [],
          not_start_match_list: [],
          end_match_list: [],
        })
        homeDispatch({
          type: 'ADD_SCHEDULE_LIST',
          gameId: gameId, // 游戏id
          time: time,
          start_match_list: valueVE.start_match_list,
          not_start_match_list: valueVE.not_start_match_list,
          end_match_list: valueVE.end_match_list,
        })
      }
    })
  }
}
