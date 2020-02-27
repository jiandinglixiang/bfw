import React, { useEffect } from 'react'
import { diffCatch } from '../../../../tool/util'
import { connect } from 'react-redux'
import http from '../../../../tool/http.js'
import { store } from '../../../redux.js'
import { setMatchResult } from '../store.js'
import TipTitle from '../TipTitle/TipTitle.jsx'
import LineChart from '../LineChart/LineChart.jsx'
import { OneMember, TeamSing } from '../OneMember/OneMember.jsx'
import def1 from '../../../assets/default_teamred_40.png'
import def2 from '../../../assets/default_teamblue_40.png'
import tianhui from '../../../assets/tianhui.png'
import yemo from '../../../assets/yemo.png'
import Kotsubone from '../Kotsubone/Kotsubone.jsx'

function CsGoPage2 (props) {
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
  const realPlayers = propsVe.matchResult.match_list.real_players
  useEffect(function () {
    http.getMatchData(propsVe.smid, scoreListLen).then((value) => {
      store.dispatch(setMatchResult({
        matchResult: value
      }))
    })
  }, [propsVe.smid, scoreListLen])

  return <div>
    <TipTitle title='对战实时战队数据' />
    <div style={{ height: '10px' }} />
    <LineChart dataArr={propsVe.matchResult.economic_curve_list} />
    <TipTitle title='对战实时成员数据' />
    <div style={{ height: '10px' }} />
    <TeamSing
      sing={tianhui}
      logo={propsVe.matchList.host_team_logo || def1}
      name={propsVe.matchList.host_team_name}
    />
    <OneMember data={realPlayers[0]} />
    <TeamSing
      sing={yemo}
      logo={propsVe.matchList.guest_team_logo || def2}
      name={propsVe.matchList.guest_team_name}
    />
    <OneMember data={realPlayers[1]} blueTeam />
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

export default connect(mapStateToProps)(CsGoPage2)
