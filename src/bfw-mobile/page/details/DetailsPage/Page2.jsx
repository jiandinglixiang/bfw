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
import CsGoMapImg from '../CsGoMapImg/CsGoMapImg.jsx'
import { comparisonUtil } from '../details.jsx'

export function Member (propsVe, realPlayers) {
  // 成员列表
  return <div>
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
  </div>
}

function Page2 (props) {
  // 历史数据
  const propsVE = diffCatch(props)({
    smid: 0,
    matchResult: {
      economic_curve_list: []
    },
    matchList: {
      status: 0,
      game_type_id: 0,
      score_list: [],
      round_total: 0
    }
  })
  const equalStatus = comparisonUtil(propsVE.matchList.game_type_id, propsVE.matchList.status)
  const scoreListLen = propsVE.matchList.score_list.length
  useEffect(() => {
    http.getMatchData(propsVE.smid, scoreListLen).then((value) => {
      store.dispatch(setMatchResult({ matchResult: value }))
    })
  }, [propsVE.smid, scoreListLen])
  const tipTile = ['对战实时战队数据', '对战实时成员数据']
  if (propsVE.matchList.game_type_id === 3) {
    // csgo
    tipTile[0] = '对战实时交锋数据'
  }
  return <div>
    {equalStatus([0, 1, 3, 5], [0, 1]) && <TipTitle title={tipTile[0]} />}
    {equalStatus([1, 5], [0, 1]) && <LineChart
      matchList={propsVE.matchList}
      matchResult={propsVE.matchResult}
    />}
    {equalStatus([1, 5], [0, 1]) && (<TipTitle title={tipTile[1]} />)}
    {
      equalStatus([1, 5], [0, 1]) && (
        <Member
          matchList={propsVE.matchList}
          matchResult={propsVE.matchResult}
        />)
    }
    {equalStatus(3, [0, 1]) && (
      <CsGoMapImg
        matchList={propsVE.matchList}
        matchResult={propsVE.matchResult}
      />
    )}
    <Kotsubone
      matchList={propsVE.matchList}
      matchResult={propsVE.matchResult}
    />
  </div>
}

function mapStateToProps (state) {
  return {
    matchResult: state.details.matchResult
  }
}

export default connect(mapStateToProps)(Page2)
