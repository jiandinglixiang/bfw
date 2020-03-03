import React from 'react'
import { diffCatch } from '../../../../tool/util'
import TipTitle from '../TipTitle/TipTitle.jsx'
import LineChart from '../LineChart/LineChart.jsx'
import { OneMember, TeamSing } from '../OneMember/OneMember.jsx'
import def1 from '../../../assets/default_teamred_40.png'
import def2 from '../../../assets/default_teamblue_40.png'
import tianhui from '../../../assets/tianhui.png'
import yemo from '../../../assets/yemo.png'
import Kotsubone, { useStatePublicBoth } from '../Kotsubone/Kotsubone.jsx'
import CsGoMapImg from '../CsGoMapImg/CsGoMapImg.jsx'
import RadarChart from '../RadarChart/RadarChart.jsx'

function bothInit () {

}

function matchAction () {

}

function BothPage (props) {
  // 历史数据
  const [endMatch] = useStatePublicBoth()
  const propsVe = diffCatch(endMatch)({
    poor_economy: {},
    team1: {},
    team2: {},
    battle_data: {},
    real_history: {}
  })
  const realPlayers = []
  return <div>
    <TipTitle title='对战战队数据' />
    <div style={{ height: '10px' }} />
    <LineChart dataArr={propsVe.matchResult.economic_curve_list} />
    <TipTitle title='对战战队数据' />
    <div style={{ height: '10px' }} />
    <LineChart dataArr={propsVe.matchResult.economic_curve_list} />
    <TipTitle title='对战实时成员数据' />
    <div style={{ height: '10px' }} />
    <RadarChart />
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
    <Kotsubone
      endMatch={propsVe.matchResult.match_list.end_match}
    />
    <div>
      csgo
      <CsGoMapImg />
    </div>
  </div>
}

export default BothPage
