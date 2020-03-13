import { createUseStore } from '../../../tool/useData.js'
import http from '../../../tool/http.js'
import { diffCatch } from '../../../tool/util.js'

export const detailsData = createUseStore({
  live_list: [],
  match_list: {}
})
export const analysisData = createUseStore({
  confrontation: [],
  histoty_confrontation_statistics: [],
  match_analysis: [],
  two_sides_confrontation: [],
  history_competition: {},
  future_schedule: {},
  players: {},
})
export const underwayData = createUseStore({
  economic_curve_list: [],
  match_list: {},
})

export default {
  detailsInitData () {
    detailsData.setStore({
      live_list: [],
      match_list: {}
    })
    analysisData.setStore({
      confrontation: [],
      histoty_confrontation_statistics: [],
      match_analysis: [],
      two_sides_confrontation: [],
      history_competition: {},
      future_schedule: {},
      players: {},
    })
    underwayData.setStore({
      economic_curve_list: [],
      match_list: {},
    })
  },
  getDetails (smid) {
    return http.getMatchDetails(smid).then(function (value) {
      if (value) {
        const details = diffCatch(value)({
          live_list: [],
          match_list: {}
        })
        detailsData.setStore(details)
        return details
      }
      return value
    })
  },
  getAnalysis (smid) {
    return http.getMatchAnalysis(smid).then(function (value) {
      if (value) {
        analysisData.setStore(diffCatch(value)({
          confrontation: [],
          histoty_confrontation_statistics: [],
          match_analysis: [],
          two_sides_confrontation: [],
          history_competition: {},
          future_schedule: {},
          players: {},
        }))
      }
    })
  },
  getMatchData (smid, round) {
    return http.getMatchData(smid, round).then(function (value) {
      if (value) {
        underwayData.setStore(diffCatch(value)({
          economic_curve_list: [],
          match_list: {},
        }))
      }
    })
  }
}
