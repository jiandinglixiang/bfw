import React, { useEffect, useMemo } from 'react'
import { queryToObj, useDiffCatch } from '../../../../tool/util'
import TipTitle from '../TipTitle/TipTitle.jsx'
import LineChart from '../LineChart/LineChart.jsx'
import { OneMember } from '../OneMember/OneMember.jsx'
import Kotsubone from '../Kotsubone/Kotsubone.jsx'
import CsGoMapImg from '../CsGoMapImg/CsGoMapImg.jsx'
import { comparisonUtil } from '../details.jsx'
import UseStore, { detailsData, underwayData } from '../UseStore.js'
import { useLocation } from 'react-router-dom'

function Page2 () {
  // 历史数据
  const location = useLocation()

  const [details] = detailsData.useStore()
  const [matchResult] = underwayData.useStore()
  const matchListVE = useDiffCatch(details.match_list)({
    status: 0,
    game_type_id: 0,
    score_list: [],
    round_total: 0
  })
  const matchResultVE = useDiffCatch(matchResult)({
    economic_curve_list: [],
    match_list: {}
  })

  const search = useMemo(function () {
    return queryToObj(location.search)
  }, [location.search])

  useEffect(() => {
    UseStore.getMatchData(search.smid, matchListVE.current_round)
  }, [search.smid, matchListVE.current_round])

  const equalStatus = comparisonUtil(matchListVE.game_type_id, matchListVE.status)

  const tipTile = ['对战实时战队数据', '对战实时成员数据']
  if (matchListVE.game_type_id === 3) {
    // csgo
    tipTile[0] = '对战实时交锋数据'
  }
  return <div>
    {equalStatus([0, 1, 3, 5], [0, 1]) && <TipTitle title={tipTile[0]} />}
    {equalStatus([1, 5], [0, 1]) && <LineChart
      matchList={matchListVE}
      matchResult={matchResultVE}
    />}
    {equalStatus([1, 5], [0, 1]) && (<TipTitle title={tipTile[1]} />)}
    {
      equalStatus([1, 5], [0, 1]) && (
        <OneMember
          matchList={matchListVE}
          matchResult={matchResultVE}
        />)
    }
    {equalStatus(3, [0, 1]) && (
      <CsGoMapImg
        matchList={matchListVE}
        matchResult={matchResult}
      />
    )}
    <Kotsubone
      matchList={matchListVE}
      matchResult={matchResult}
    />
  </div>
}

export default Page2
