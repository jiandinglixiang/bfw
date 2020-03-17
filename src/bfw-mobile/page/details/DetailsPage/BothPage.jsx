import React, { useEffect, useState } from 'react'
import { diffCatch, findQuery, queryToObj } from '../../../../tool/util'
import TipTitle from '../TipTitle/TipTitle.jsx'
import LineChart from '../LineChart/LineChart.jsx'
import CsGoMapImg from '../CsGoMapImg/CsGoMapImg.jsx'
import RadarChart from '../RadarChart/RadarChart.jsx'
import TopLogoNameScore from '../TopLogoNameScore/TopLogoNameScore.jsx'
import { comparisonUtil } from '../DetailsContainer.jsx'
import OneMember from '../OneMember/OneMember.jsx'
import UseStore, { detailsData, underwayData } from '../UseStore.js'

async function getData (smid) {
  console.log(321321)
  await UseStore.getDetails(smid)
  const details = detailsData.getStore()
  UseStore.getMatchData(smid, details.match_list.current_round)
}

function BothPage () {
  // 历史数据

  const [matchResult] = underwayData.useStore()
  const [detailsMatchList] = detailsData.useStore()
  const [searchVE] = useState(function () {
    return diffCatch(queryToObj(findQuery()))({
      round: 0,
      matchName: '',
      smid: '',
      gameId: 0
    })
  })
  useEffect(function () {
    window.scrollTo(0, 0)
    if (!matchResult.match_list.end_match) {
      getData(searchVE.smid)
    }
  }, [])

  const propsVE = diffCatch(matchResult.match_list)({
    end_match: [],
  })

  const endMatch = propsVE.end_match.find(value => {
    const valueVE = diffCatch(value)({ team1: { round: 0 } })
    return valueVE.team1.round === searchVE.round
  })

  const endMatchVE = diffCatch(endMatch)({
    team1: {
      status: 0,
      game_type_id: 0
    },
    team2: {
      game_type_id: 0
    }
  })
  const equalStatus = comparisonUtil(endMatchVE.team1.game_type_id, endMatchVE.team1.status)
  const tipTile = ['对战战队数据', '对战成员数据']
  if (endMatchVE.team1.game_type_id === 3) {
    // csgo
    tipTile[0] = '对战交锋数据'
  }
  return (
    <div>
      <TopLogoNameScore isBoth endMatch={endMatchVE} matchList={detailsMatchList} />
      <div style={{
        padding: '4% 2% 2% 2%',
        backgroundColor: '#06051A'
      }}>
        {equalStatus([0, 1, 3, 5]) && <TipTitle title={tipTile[0]} />}
        {equalStatus([1, 5]) && <LineChart isBoth endMatch={endMatchVE} />}
        {equalStatus([1, 5]) && <TipTitle title={tipTile[1]} />}
        {equalStatus([1, 5]) && <RadarChart endMatch={endMatchVE} />}
        {
          equalStatus([1, 5]) && (
            <OneMember
              isBoth
              endMatch={endMatchVE}
            />)
        }
        {equalStatus(3) && (
          <CsGoMapImg
            isBoth
            endMatch={endMatchVE}
          />
        )}
      </div>
    </div>)
}

export default BothPage
