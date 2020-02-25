import { dayName } from '../../../tool/util'
import { http } from '../../../tool/http'

export function setGameKind (data) {
  return {
    type: 'SET_GAME_KIND',
    ...data,
  }
}

export function setKindData (data) {
  return {
    type: 'SET_KIND_DATA',
    ...data,
  }
}

export function setShowType (data) {
  return {
    type: 'SET_SHOW_TYPE',
    ...data,
  }
}

export function updateKindIdOrTime (data) {
  return {
    type: 'UPDATE_KIND_ID_OR_TIME',
    ...data,
  }
}

export function getGameKindAsync () {
  return async function (dispatch, getState) {
    const products = await http.getHomeMenu()
    // console.log(products)
    if (!products) return
    const data = {
      notice: products.radio,
      bannerList: products.banner_list,
      gameKind: products.game_list,
    }
    dispatch(setGameKind(data))
    return getState()
  }
}

export function getKindDataAsync (id, time) {
  return async function (dispatch, getState) {
    const schedule = await http.getHomeSchedule(id, time)
    if (!schedule) return
    const data = {
      endMatchList: schedule.end_match_list,
      notStartMatchList: schedule.not_start_match_list,
      startMatchList: schedule.start_match_list,
      totalNumber: schedule.total_number,
      kindId: id,
      time,
    }
    dispatch(setKindData(data))
    return getState()
  }
}

function f1 (from, to, id, time) {
  const from2 = { ...from }
  from2[`${id}-${time}`] = to
  return from2
}

const current = {
  data () {
    return {
      notice: '',
      bannerList: [],
      gameKind: [],
      endMatchList: {},
      notStartMatchList: {},
      startMatchList: {},
      totalNumber: {}, // { '0-2017-01-01' }
      showType: {}, // { '0-2017-01-01' }
      kindId: null,
      time: dayName[1],
    }
  },
  reducer (state = current.data(), action) {
    // 同步
    const data = {}
    switch (action.type) {
      case setShowType().type:
        if (action.showType !== undefined) {
          data.showType = f1(state.showType, action.showType, state.kindId, state.time)
          return Object.assign({}, state, data)
        }
        return state
      case updateKindIdOrTime().type:
        if (action.time) {
          data.time = action.time
        }
        if (action.kindId) {
          data.kindId = action.kindId
        }
        if (state.showType[`${data.kindId || state.kindId}-${data.time || state.time}`] === undefined) {
          data.showType = f1(state.showType, 0, data.kindId || state.kindId, data.time || state.time) // 默认赛程
        }
        return Object.assign({}, state, data)
      case setGameKind().type:
        data.notice = action.notice
        data.bannerList = action.bannerList
        data.gameKind = action.gameKind
        if (state.kindId === null && action.gameKind && action.gameKind[0]) {
          data.kindId = action.gameKind[0].id
        }
        if (state.kindId === null) {
          data.time = dayName[1]
        }
        return Object.assign({}, state, data)
      case setKindData().type:
        if (Array.isArray(action.endMatchList)) {
          data.endMatchList = f1(state.endMatchList, action.endMatchList,
            action.kindId, action.time)
        }
        if (Array.isArray(action.notStartMatchList)) {
          data.notStartMatchList = f1(state.notStartMatchList,
            action.notStartMatchList, action.kindId, action.time)
        }
        if (Array.isArray(action.startMatchList)) {
          data.startMatchList = f1(state.startMatchList, action.startMatchList,
            action.kindId, action.time)
        }
        if (action.totalNumber) {
          data.totalNumber = f1(state.totalNumber, action.totalNumber,
            action.kindId, action.time)
        }
        data.time = action.time
        data.kindId = action.kindId
        if (state.showType[`${data.kindId || state.kindId}-${data.time || state.time}`] === undefined) {
          data.showType = f1(state.showType, 0, data.kindId || state.kindId, data.time || state.time) // 默认赛程
        }
        return Object.assign({}, state, data)
      default:
        return state
    }
  },
}

export default current
