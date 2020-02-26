import React, { useEffect, useState } from 'react'
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
import { getMatchAnalysisAsync, getMatchDetailsAsync } from './store'
import { diffCatch, PropTypes } from '../../../tool/util.js'
import AgainstLogoTime from './AgainstLogoTime/AgainstLogoTime.jsx'
import BPList from './BPList/BPList.jsx'
import BeforeData from './BeforeData/BeforeData.jsx'
import TipTitle from './TipTitle/TipTitle.jsx'
import RoleContent from './RoleContent/RoleContent.jsx'
import BoutTitleBar from './BoutTitleBar/BoutTitleBar.jsx'
import CsGoNowStatus from './CsGoNowStatus/CsGoNowStatus.jsx'
import CsGoMapImg from './CsGoMapImg/CsGoMapImg.jsx'
import PieChart from './PieChart/PieChart.jsx'
import LineChart from './LineChart/LineChart.jsx'
import RadarChart from './RadarChart/RadarChart.jsx'
import { connect } from 'react-redux'

function equalActive (page, eq) {
  return page === eq ? styles.active : ''
}

function TabsFire (props) {
  const { children = [] } = props
  const [page, setPage] = useState(2)
  return <div>
    <div className={styles.tabsList}>
      <div className={equalActive(page, 0)} onClick={() => setPage(0)}><p>指数分析</p></div>
      <div className={equalActive(page, 1)} onClick={() => setPage(1)}><p>历史数据</p></div>
      {<div className={equalActive(page, 2)} onClick={() => setPage(2)}><p>赛况</p>
      </div> || <div className={equalActive(page, 3)} onClick={() => setPage(3)}><p>赛果</p></div>}
    </div>
    <div style={{ display: page === 0 ? 'block' : 'none' }}>{children[0]}</div>
    <div style={{ display: page === 1 ? 'block' : 'none' }}>{children[1]}</div>
    <div style={{ display: page === 2 ? 'block' : 'none' }}>{children[2]}</div>
    <div style={{ display: page === 3 ? 'block' : 'none' }}>{children[3]}</div>
  </div>
}

TabsFire.propTypes = {
  children: PropTypes.array
}

function Details (props) {
  const params = useParams()
  const [page, setPage] = useState(0)
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
    store.dispatch(getMatchDetailsAsync(smid)).then(function () {
      store.dispatch(getMatchAnalysisAsync(smid))
    })
    window.scrollTo(0, 0)
  }, [smid])
  return <div className={styles.content}>
    <HeadBar title={matchName} />
    <div className={styles.paddingBody}>
      <div style={{
        minHeight: '106px',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
      }}>
        <AgainstLogoTime gameId={gameId} page={page} matchList={matchList} />
      </div>
      <div className={styles.tabsList}>
        <div className={equalActive(page, 0)} onClick={() => setPage(0)}><p>指数分析</p></div>
        <div className={equalActive(page, 1)} onClick={() => setPage(1)}><p>历史数据</p></div>
        {
          // 已结束
          matchList.status === 2 ? <div className={equalActive(page, 3)} onClick={() => setPage(3)}><p>
            赛果</p></div> : <div className={equalActive(page, 2)} onClick={() => setPage(2)}><p>
            赛况</p></div>
        }
      </div>
      <div style={{ display: page === 0 ? 'block' : 'none' }}>
        <PvpAnalyze oddList={matchList.odds_list} />
      </div>
      <div style={{ display: page === 1 ? 'block' : 'none' }}>
        <PvpStatistics />
      </div>
      <div style={{ display: page === 2 ? 'block' : 'none' }}>2</div>
      <div style={{ display: page === 3 ? 'block' : 'none' }}>3</div>
    </div>
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
      <TabsFire>
        <PvpAnalyze />
        <div>
          <BeforeData />
        </div>
        <div>
          <TipTitle />
          <RoleContent />
        </div>
      </TabsFire>
    </div>
    <div>
      <PvpTameState gameId={gameId} />
      <PvpStatistics />
      <PvpList />
      <HistoryPvpList />
      <FuturePvpList />
      <OutTame />
    </div>
  </div>
}

Details.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  matchList: PropTypes.object,
}
export default connect(function (state) {
  return {
    matchList: state.details.matchList
  }
})(Details)
