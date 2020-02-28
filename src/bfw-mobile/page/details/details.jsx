import React, { useEffect, useState } from 'react'
import HeadBar from '../../components/HeadBar/HeadBar.jsx'
import { Route, Switch } from 'react-router-dom'
import PvpTameState from './PvpTameState/PvpTameState'
import PvpAnalyze from './PvpAnalyze/PvpAnalyze'
import PvpStatistics from './PvpStatistics/PvpStatistics'
import styles from './index.module.scss'
import PvpList from './PvpList/PvpList'
import HistoryPvpList from './HistoryPvpList/HistoryPvpList'
import FuturePvpList from './FuturePvpLits/FuturePvpLits'
import OutTame from './OutTame/OutTame'
import { store } from '../../redux'
import { getMatchDetailsAsync } from './store'
import { diffCatch, PropTypes, useSearch } from '../../../tool/util.js'
import TopLogoNameScore from './TopLogoNameScore/TopLogoNameScore.jsx'
import BPList from './BPList/BPList.jsx'
import BeforeData from './BeforeData/BeforeData.jsx'
import TipTitle from './TipTitle/TipTitle.jsx'
import RoleContent from './OneMember/OneMember.jsx'
import BoutTitleBar from './BoutTitleBar/BoutTitleBar.jsx'
import CsGoNowStatus from './CsGoNowStatus/CsGoNowStatus.jsx'
import CsGoMapImg from './CsGoMapImg/CsGoMapImg.jsx'
import PieChart from './PieChart/PieChart.jsx'
import LineChart from './LineChart/LineChart.jsx'
import RadarChart from './RadarChart/RadarChart.jsx'
import { connect } from 'react-redux'
import CsGoPage1 from './CsGoPage/CsGoPage1.jsx'
import CsGoPage2 from './CsGoPage/CsGoPage2.jsx'
import CsGoPage3 from './CsGoPage/CsGoPage3.jsx'
import LiveButton from './LiveButton/LiveButton.jsx'

// const useStatePublic = globalDataInit({
//   index: 0,
//   page: <div />,
//   data: {}
// })

function equalActive (index, eq) {
  return index === eq ? styles.active : ''
}

export function comparisonUtil (gameId, gameStatus) {
  // equalStatus
  return function (id, status) {
    // id 游戏
    // status 0未开始1进行中2以结束
    if (id !== undefined && (id !== gameId || !(Array.isArray(id) && id.includes(gameId)))) {
      return
    }
    if (status !== undefined && (status !== gameStatus || !(Array.isArray(status) && status.includes(gameStatus)))) {
      return
    }
    return true
  }
}

function TabsList ({ gameOver, index, updateIndex }) {
  return <div className={styles.tabsList}>
    <div
      className={equalActive(index, 0)}
      onClick={() => updateIndex(0)}>
      <p>指数分析</p>
    </div>
    <div
      className={equalActive(index, 1)}
      onClick={() => updateIndex(1)}>
      <p>历史数据</p>
    </div>
    {
      // 已结束
      gameOver ? <div
        className={equalActive(index, 3)}
        onClick={() => updateIndex(3)}>
        <p>赛果</p>
      </div> : <div
        className={equalActive(index, 2)}
        onClick={() => updateIndex(2)}>
        <p>赛况</p>
      </div>
    }
  </div>
}

function Details (props) {
  const [search] = useSearch()
  const [tabIndex, update] = useState(0)
  useEffect(() => {
    store.dispatch(getMatchDetailsAsync(search.smid))
    window.scrollTo(0, 0)
  }, [search.smid])
  const { matchList, liveList } = diffCatch(props)({
    liveList: [],
    matchList: {
      game_type_id: 0,
      odds_list: [],
      score_list: [],
      status: 0 // 状态 0：未开始 1：进行中 2：已结束
    }
  })
  const equalStatus = comparisonUtil(matchList.game_type_id, matchList.status)

  return (<div>
    <div className={styles['game-rear-' + matchList.game_type_id]}>
      <HeadBar title={matchList.game_name} />
      <div style={{
        paddingTop: '16px',
        minHeight: '121px'
      }}>
        <Switch>
          <Route path='/details/both'>
            <TopLogoNameScore matchList={matchList} isBoth />
            {equalStatus(5, 1) && <BPList isBan />}
            {equalStatus([1, 5], [1, 2]) && <BPList />}
            {equalStatus(3, 1) && <CsGoNowStatus />}
          </Route>
          <Route path='/details'>
            <TopLogoNameScore matchList={matchList} />
            {equalStatus(5, 1) && <BPList isBan />}
            {equalStatus([1, 5], [1, 2]) && <BPList />}
            {equalStatus(3, 1) && <CsGoNowStatus />}
          </Route>
        </Switch>
        {!!liveList.length && <LiveButton liveList={liveList} />}
      </div>
      <Route exact path='/details'>
        <TabsList
          gameOver={matchList.status === 2}
          index={tabIndex}
          updateIndex={update}
        />
      </Route>
    </div>
    <Switch>
      <Route path='/details/both'>
        <div>
          小局
        </div>
      </Route>
      <Route path='/details'>
        <div className={styles.paddingBody}>
          <div style={{ display: tabIndex === 0 ? 'block' : 'none' }}>
            <PvpAnalyze oddList={matchList.odds_list} />
          </div>
          {
            tabIndex === 1 && <CsGoPage1 matchList={matchList} smid={matchList.smid} />
          }
          {
            tabIndex === 2 && <CsGoPage2 matchList={matchList} smid={matchList.smid} />
          }
          {
            tabIndex === 3 && <CsGoPage3 matchList={matchList} smid={matchList.smid} />
          }
        </div>
      </Route>
    </Switch>
    <div>
      <div>
        <div>
          <RadarChart />
          <LineChart />
          <PieChart />
          <PieChart />
        </div>
        <BPList />
        <TipTitle title='第一局' />
        <BoutTitleBar />
        <CsGoMapImg />
        <CsGoNowStatus />
        <div>
          <BeforeData />
        </div>
        <div>
          <TipTitle />
          <RoleContent />
        </div>
      </div>
      <div>
        <PvpTameState gameId={matchList.game_type_id} />
        <PvpStatistics />
        <PvpList />
        <HistoryPvpList />
        <FuturePvpList />
        <OutTame />
      </div>
    </div>
  </div>)
}

export default connect(function (state) {
  return {
    liveList: state.details.liveList,
    matchList: state.details.matchList
  }
})(Details)

TabsList.propTypes = {
  gameOver: PropTypes.bool,
  index: PropTypes.number,
  updateIndex: PropTypes.func
}
