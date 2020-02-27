import React, { useEffect } from 'react'
import { diffCatch } from '../../../../tool/util'
import { connect } from 'react-redux'
import http from '../../../../tool/http.js'
import { store } from '../../../redux.js'
import { setMatchResult } from '../store.js'
import Kotsubone from '../Kotsubone/Kotsubone.jsx'

function CsGoPage3 (props) {
  // 历史数据
  const propsVe = diffCatch(props)({
    smid: 0,
    matchResult: {
      economic_curve_list: [],
      match_list: {
        real_players: [],
        end_match: []
      }
    },
    matchList: {
      score_list: [],
      round_total: 0
    }
  })
  const scoreListLen = propsVe.matchList.score_list.length
  useEffect(function () {
    http.getMatchData(propsVe.smid, scoreListLen).then((value) => {
      store.dispatch(setMatchResult({
        matchResult: value
      }))
    })
  }, [propsVe.smid, scoreListLen])

  return <div>
    <div style={{ height: '10px' }} />
    <Kotsubone endMatch={propsVe.matchResult.match_list.end_match} />
  </div>
}

function mapStateToProps (state) {
  return {
    matchResult: state.details.matchResult,
    confrontation: state.details.confrontation,
    historyConfrontation: state.details.histoty_confrontation_statistics
  }
}

export default connect(mapStateToProps)(CsGoPage3)
