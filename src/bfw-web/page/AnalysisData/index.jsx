import React, { useEffect } from 'react'
import styles from './index.module.scss'
import TopNav from '../../components/TopNav'
import FriendlyLink from '../../components/FriendlyLink'
import DownloadQcr from '../../components/DownloadQcr'
import DownBar from '../../components/DownBar'
import TameNowStatus from './components/TameNowStatus'
import PvpAnalysis from './components/PvpAnalysis'
import TitleAndTameNameContent from './components/TitleAndTameNameContent'
import PvpList from './components/PvpList'
import HistoryPvpList from './components/HistoryPvpList'
import FuturePvpList from './components/FuturePvpList'
import OutMemberList from './components/OutMemberList'
import PvpStatistics from './components/PvpStatistics'
import NavAnalysis from './components/NavAnalysis'
import FixedRightContainer from '../../components/FixedRightContainer'
import store from '../../store'
import { getMatchAnalysisAsync, getMatchDetailsAsync } from './store'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { searchFormat, searchToObject } from '../../../tool/util'

function AnalysisData (props) {
  const { guestName, hostName, oddsList, stat, historyStat, historyPvp, futurePvp, players, twoSides } = props
  const { search } = useLocation()
  const searchParams = searchToObject(search, true)
  const smid = searchParams.get('smid')
  const gameName = searchParams.get('gameName')
  const tamePvp = searchParams.get('tamePvp')
  const matchName = searchParams.get('matchName')
  const gameId = searchParams.get('gameId')
  useEffect(function () {
    store.dispatch(getMatchDetailsAsync(smid)).then(() => {
      store.dispatch(getMatchAnalysisAsync(smid))
    })
  }, [smid])
  return (<div className={styles.appContent}>
    <TopNav/>
    <div className={styles.homeBody}>
      <div className={styles.topPath}>
        <p>当前</p>
        <p>
          <span><Link to='/'>首页</Link></span>
          <span>
            <Link
              replace
              to={{ pathname: '/', search: searchFormat({ gameId: gameId }) }}
            >
              {gameName || '加载失败..'}
            </Link>
          </span>
          <span><Link to='/'>{matchName || '加载失败..'}</Link></span>
          <span>{tamePvp || '加载失败..'}</span>
        </p>
      </div>
      <TameNowStatus gameId={gameId}/>
      <TitleAndTameNameContent title='指数分析' id='nav-anchor-0'>
        <PvpAnalysis oddsList={oddsList}/>
      </TitleAndTameNameContent>
      <div className={styles.twoRowBody} id='nav-anchor-1'>
        <TitleAndTameNameContent
          tameName={[hostName, guestName]}
          title='对战交锋数据'>
          <PvpStatistics stat={stat}/>
        </TitleAndTameNameContent>
        <TitleAndTameNameContent
          tameName={[hostName, guestName]}
          title='历史对战数据统计'>
          <PvpStatistics stat={historyStat} showMode/>
        </TitleAndTameNameContent>
      </div>
      <TitleAndTameNameContent title='双方对阵列表' id='nav-anchor-2'>
        <PvpList twoSides={twoSides || []}/>
      </TitleAndTameNameContent>
      <TitleAndTameNameContent title='历史比赛列表' id='nav-anchor-3'>
        <div className={styles.twoRowBody2}>
          <HistoryPvpList
            tameName={hostName}
            historyPvp={historyPvp.team1_history_competition || []}/>
          <HistoryPvpList
            tameName={guestName}
            historyPvp={historyPvp.team2_history_competition || []}/>
        </div>
      </TitleAndTameNameContent>
      <TitleAndTameNameContent title='未来赛程' id='nav-anchor-4'>
        <div className={styles.twoRowBody2}>
          <FuturePvpList
            tameName={hostName}
            futurePvp={futurePvp.team1_future_schedule || []}
          />
          <FuturePvpList
            tameName={guestName}
            futurePvp={futurePvp.team2_future_schedule || []}
          />
        </div>
      </TitleAndTameNameContent>
      <TitleAndTameNameContent title='出场名单' id='nav-anchor-5'>
        <div className={styles.twoRowBody2}>
          <OutMemberList
            tameName={hostName}
            players={players.team1_players || []}
          />
          <OutMemberList
            tameName={guestName}
            players={players.team2_players || []}
          />
        </div>
      </TitleAndTameNameContent>
    </div>
    <FriendlyLink/>
    <DownBar/>
    <FixedRightContainer>
      <NavAnalysis/>
      <DownloadQcr/>
    </FixedRightContainer>
  </div>)
}

function mapStateToProps (state) {
  let oddsList = []
  if (!state.details.matchList) {
    return {
      guestName: '',
      hostName: '',
      oddsList,
      historyStat: [],
      stat: [],
      twoSides: [],
      historyPvp: {},
      futurePvp: {},
      players: {}
    }
  }
  if (Array.isArray(state.details.matchList.odds_list)) {
    oddsList = state.details.matchList.odds_list
  } else if (Object.prototype.toString.call(state.details.matchList.odds_list) === '[object Object]') {
    oddsList = Object.entries(state.details.matchList.odds_list).map(value => value[1])
  }
  return {
    guestName: state.details.matchList.guest_team_name,
    hostName: state.details.matchList.host_team_name,
    oddsList,
    historyStat: state.details.histotyConfrontationStatistics || [],
    stat: state.details.confrontation || [],
    historyPvp: state.details.historyCompetition || {},
    futurePvp: state.details.futureSchedule || {},
    players: state.details.players || {},
    twoSides: state.details.twoSidesConfrontation || []
  }
}

export default connect(mapStateToProps, null)(AnalysisData)
