import React, { useEffect, useMemo } from 'react'
import PvpStatistics from '../PvpStatistics/PvpStatistics.jsx'
import BeforeData from '../BeforeData/BeforeData.jsx'
import PvpList from '../PvpList/PvpList.jsx'
import HistoryPvpList from '../HistoryPvpList/HistoryPvpList.jsx'
import FuturePvpList from '../FuturePvpLits/FuturePvpLits.jsx'
import OutTame from '../OutTame/OutTame.jsx'
import UseStore, { analysisData, detailsData } from '../UseStore.js'
import { useLocation } from 'react-router-dom'
import { diffCatch, queryToObj } from '../../../../tool/util.js'
import def1 from '../../../assets/default_teamred_40.png'
import def2 from '../../../assets/default_teamblue_40.png'

function Page1 () {
  // 历史数据
  const location = useLocation()
  const search = useMemo(function () {
    return queryToObj(location.search)
  }, [location.search])

  const [analysis] = analysisData.useStore()
  const [details] = detailsData.useStore()

  const teamInfo = useMemo(function () {
    const matchList = diffCatch(details.match_list)({
      host_team_name: '',
      host_team_logo: def1,
      guest_team_name: '',
      guest_team_logo: def2,
    })
    return {
      team1: {
        name: matchList.host_team_name,
        logo: matchList.host_team_logo,
      },
      team2: {
        name: matchList.guest_team_name,
        logo: matchList.guest_team_logo,
      }
    }
  }, [details.match_list])

  useEffect(function () {
    UseStore.getAnalysis(search.smid)
  }, [search.smid])
  return (
    <div>
      <PvpStatistics
        teamInfo={teamInfo}
        confrontation={analysis.confrontation}
        histotyConfrontationStatistics={analysis.histoty_confrontation_statistics} />
      <BeforeData
        teamInfo={teamInfo}
        matchAnalysis={analysis.match_analysis} />
      <PvpList gameId={search.gameId} twoSidesConfrontation={analysis.two_sides_confrontation} />
      <HistoryPvpList
        gameId={search.gameId}
        teamInfo={teamInfo}
        historyCompetition={analysis.history_competition} />
      <FuturePvpList
        teamInfo={teamInfo} futureSchedule={analysis.future_schedule} />
      <OutTame
        teamInfo={teamInfo} players={analysis.players} />
    </div>
  )
}

export default Page1
