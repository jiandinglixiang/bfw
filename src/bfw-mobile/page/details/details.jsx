import React, { useEffect } from 'react'
import HeadBar from '../../components/HeadNav/HeadNav'
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

function Details () {
  const {
    matchName = '加载中...',
    gameId = 0,
    smid = 0,
  } = useParams()
  useEffect(function () {
    store.dispatch(getMatchDetailsAsync(smid)).then(function () {
      store.dispatch(getMatchAnalysisAsync(smid))
    })
    window.scrollTo(0, 0)
  }, [smid])
  return <div className={styles.content}>
    <HeadBar title={matchName} styles={{ backgroundColor: '#091329' }} />
    <PvpTameState gameId={gameId} />
    <PvpAnalyze />
    <PvpStatistics />
    <PvpList />
    <HistoryPvpList />
    <FuturePvpList />
    <OutTame />
  </div>
}

export { Details }
