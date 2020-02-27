import React, { useEffect } from 'react'
import HeadBar from '../../components/HeadBar/HeadBar.jsx'
import { useParams } from 'react-router-dom'
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
import { diffCatch, PropTypes } from '../../../tool/util.js'
import AgainstLogoTime from './AgainstLogoTime/AgainstLogoTime.jsx'
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
import { globalDataInit } from '../../../tool/useData.js'

const useGDetails = globalDataInit({
  index: 0,
  page: <div />,
  data: {}
})

function equalActive (page, eq) {
  return page === eq ? styles.active : ''
}

function TabsList ({ gameOver }) {
  const [state, update] = useGDetails()
  return <div className={styles.tabsList}>
    <div
      className={equalActive(state.index, 0)}
      onClick={() => update(Object.assign(state, { index: 0 }))}>
      <p>指数分析</p>
    </div>
    <div
      className={equalActive(state.index, 1)}
      onClick={() => update(Object.assign(state, { index: 1 }))}>
      <p>历史数据</p>
    </div>
    {
      // 已结束
      gameOver ? <div
        className={equalActive(state.index, 3)}
        onClick={() => update(Object.assign(state, { index: 3 }))}>
        <p>赛果</p>
      </div> : <div
        className={equalActive(state.index, 2)}
        onClick={() => update(Object.assign(state, { index: 2 }))}>
        <p>赛况</p>
      </div>
    }
  </div>
}

function Details (props) {
  const params = useParams()
  const [tabs] = useGDetails()
  const { matchName, gameId, smid } = diffCatch(params)({
    matchName: '加载中...',
    gameId: 0,
    smid: 0,
  })
  const { matchList } = diffCatch(props)({
    matchList: {
      odds_list: [],
      poor_economy: {
        time: 0,
        gold: 0
      },
      team1_more_attr: {
        other_more_attr: {},
        players: []
      },
      team2_more_attr: {
        other_more_attr: {},
        players: []
      },
      score: '',
      status: 0 // 状态 0：未开始 1：进行中 2：已结束
    }
  })

  useEffect(function () {
    store.dispatch(getMatchDetailsAsync(smid))
    window.scrollTo(0, 0)
  }, [smid])

  return <div className={styles.content}>
    <div className={styles['game-rear-' + gameId]}>
      <HeadBar title={matchName} />
      <AgainstLogoTime gameId={gameId} page={tabs.index} matchList={matchList} />
      <TabsList gameOver={matchList.status === 2} />
      {false && <BPList isBan />}
      {false && <BPList />}
    </div>
    <div className={styles.paddingBody}>
      <div style={{ display: tabs.index === 0 ? 'block' : 'none' }}>
        <PvpAnalyze oddList={matchList.odds_list} />
      </div>
      {
        tabs.index === 1 && <CsGoPage1 matchList={matchList} smid={smid} />
      }
      {
        tabs.index === 2 && <CsGoPage2 matchList={matchList} smid={smid} />
      }
      {
        tabs.index === 3 && <CsGoPage3 matchList={matchList} smid={smid} />
      }
    </div>
    {false && <div>
      <div>
        <div>
          <RadarChart />
          <LineChart />
          <PieChart />
          <PieChart />
        </div>
        <AgainstLogoTime />
        <BPList />
        <TipTitle title='第一局' />
        <BoutTitleBar />
        <CsGoMapImg />
        <CsGoNowStatus />
        <PvpAnalyze />
        <div>
          <BeforeData />
        </div>
        <div>
          <TipTitle />
          <RoleContent />
        </div>
      </div>
      <div>
        <PvpTameState gameId={gameId} />
        <PvpStatistics />
        <PvpList />
        <HistoryPvpList />
        <FuturePvpList />
        <OutTame />
      </div>
    </div>}
  </div>
}

export default connect(function (state) {
  return {
    matchList: state.details.matchList
  }
})(Details)

TabsList.propTypes = {
  gameOver: PropTypes.bool
}
