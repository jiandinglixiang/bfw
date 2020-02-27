import http from '../../../tool/http'

export function setMatchDetails (data) {
  return {
    type: 'SET_MATCH_DETAILS',
    ...data,
  }
}

export function setMatchAnalysis (data) {
  return {
    type: 'SET_MATCH_ANALYSIS',
    ...data,
  }
}

export function setMatchResult (data) {
  return {
    type: 'SET_MATCH_RESULT',
    ...data,
  }
}

export function getMatchDetailsAsync (smid) {
  return async function (dispatch) {
    const details = await http.getMatchDetails(smid).catch((err) => {
      dispatch(setMatchDetails(
        {
          matchList: {},
          liveList: [],
        },
      ))
      return Promise.reject(err)
    })
    if (!details) return
    const data = {
      matchList: details.match_list,
      liveList: details.live_list || [],
    }
    dispatch(setMatchDetails(data))
  }
}

export function getMatchAnalysisAsync (smid) {
  return async function (dispatch) {
    const analysis = await http.getMatchAnalysis(smid).catch((err) => {
      return Promise.reject(err)
    })
    if (!analysis) return
    dispatch(setMatchAnalysis(analysis))
  }
}

const current = {
  data () {
    return {
      matchList: {},
      liveList: [],
      confrontation: [],
      histoty_confrontation_statistics: [],
      match_analysis: [],
      two_sides_confrontation: {},
      history_competition: {},
      future_schedule: {},
      players: {},
      matchResult: {
        economic_curve_list: [],
        match_list: {
          real_players: [],
          end_match: []
        }
      }
    }
  },
  reducer (state = current.data(), action) {
    // 同步
    switch (action.type) {
      case setMatchDetails().type:
        return Object.assign({}, state, {
          matchList: action.matchList,
          liveList: action.liveList,
        })
      case setMatchAnalysis().type:
        return Object.assign({}, state, {
          confrontation: action.confrontation,
          histoty_confrontation_statistics: action.histoty_confrontation_statistics,
          match_analysis: action.match_analysis,
          two_sides_confrontation: action.two_sides_confrontation,
          history_competition: action.history_competition,
          future_schedule: action.future_schedule,
          players: action.players,
        })
      case setMatchResult().type:
        return Object.assign({}, state, {
          matchResult: action.matchResult
        })
      default:
        return state
    }
  },
}

export default current
