import React, { useEffect } from 'react'
import { diffCatch, useSearch } from '../../../../tool/util'
import TipTitle from '../TipTitle/TipTitle.jsx'
import LineChart from '../LineChart/LineChart.jsx'
import CsGoMapImg from '../CsGoMapImg/CsGoMapImg.jsx'
import RadarChart from '../RadarChart/RadarChart.jsx'
import TopLogoNameScore from '../TopLogoNameScore/TopLogoNameScore.jsx'
import styles from '../index.module.scss'
import http from '../../../../tool/http.js'
import { store } from '../../../redux.js'
import { setMatchResult } from '../store.js'
import { connect } from 'react-redux'
import { comparisonUtil } from '../details.jsx'
import HeadBar from '../../../components/HeadBar/HeadBar.jsx'
import OneMember from '../OneMember/OneMember.jsx'

function BothPage (props) {
  // 历史数据
  const [search] = useSearch()
  const searchVE = diffCatch(search)({
    round: 0,
    gameName: '',
    smid: ''
  })
  const propsVE = diffCatch(props)({
    matchResult: {
      match_list: {
        end_match: [],
      }
    }
  })
  useEffect(() => {
    if (!propsVE.matchResult.match_list.end_match.length) {
      http.getMatchData(searchVE.smid, searchVE.round).then((value) => {
        store.dispatch(setMatchResult({ matchResult: value }))
      })
    }
  }, [searchVE.smid, searchVE.round, propsVE.matchResult.match_list.end_match.length])

  const endMatch = propsVE.matchResult.match_list.end_match.find(value => {
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
    <div className={styles['game-rear-' + endMatchVE.team1.game_type_id]}>
      <HeadBar title={searchVE.gameName} />
      <TopLogoNameScore isBoth endMatch={endMatchVE} />
      <div style={{ padding: '0 2%' }}>
        {equalStatus([0, 1, 3, 5]) && <TipTitle title={tipTile[0]} />}
        {equalStatus([1, 5]) && <LineChart isBoth endMatch={endMatchVE} />}
        {equalStatus([1, 5]) && (<TipTitle title={tipTile[1]} />)}
        <RadarChart endMatch={endMatchVE} />
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

function mapStateToProps (state) {
  return {
    matchResult: state.details.matchResult
  }
}

export default connect(mapStateToProps)(BothPage)
