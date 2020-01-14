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
      dispatch(setMatchDetails(
        {
          confrontation: [],
          futureSchedule: {
            team1_future_schedule: [],
            team2_future_schedule: [],
          },
          historyCompetition: {
            team1_history_competition: [],
            team2_history_competition: [],
          },
          histotyConfrontationStatistics: [],
          players: {
            team1_players: [],
            team2_players: [],
          },
          twoSidesConfrontation: [],
        },
      ))
      return Promise.reject(err)
    })
    if (!analysis) return
    // console.log(analysis.two_sides_confrontation)
    const data = {
      confrontation: analysis.confrontation || [],
      futureSchedule: {
        team1_future_schedule: (analysis.future_schedule &&
          analysis.future_schedule.team1_future_schedule) || [],
        team2_future_schedule: (analysis.future_schedule &&
          analysis.future_schedule.team2_future_schedule) || [],
      },
      historyCompetition: {
        team1_history_competition: (analysis.history_competition &&
          analysis.history_competition.team1_history_competition) || [],
        team2_history_competition: (analysis.history_competition &&
          analysis.history_competition.team2_history_competition) || [],
      },
      histotyConfrontationStatistics: analysis.histoty_confrontation_statistics ||
        [],
      players: {
        team1_players: (analysis.players && analysis.players.team1_players) ||
          [],
        team2_players: (analysis.players && analysis.players.team2_players) ||
          [],
      },
      twoSidesConfrontation: analysis.two_sides_confrontation || [],
    }
    dispatch(setMatchAnalysis(data))
  }
}

const current = {
  data () {
    return {
      matchList: {},
      liveList: [],
      confrontation: [],
      futureSchedule: {
        team1_future_schedule: [],
        team2_future_schedule: [],
      },
      historyCompetition: {
        team1_history_competition: [],
        team2_history_competition: [],
      },
      histotyConfrontationStatistics: [],
      players: {
        team1_players: [],
        team2_players: [],
      },
      twoSidesConfrontation: [],
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
          futureSchedule: action.futureSchedule,
          historyCompetition: action.historyCompetition,
          histotyConfrontationStatistics: action.histotyConfrontationStatistics,
          players: action.players,
          twoSidesConfrontation: action.twoSidesConfrontation,
        })
      default:
        return state
    }
  },
}

export default current
