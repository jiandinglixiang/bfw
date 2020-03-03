import React, { useEffect } from 'react'
import { diffCatch } from '../../../../tool/util'
import PvpStatistics from '../PvpStatistics/PvpStatistics.jsx'
import { store } from '../../../redux.js'
import { getMatchAnalysisAsync } from '../store.js'
import { connect } from 'react-redux'
import BeforeData from '../BeforeData/BeforeData.jsx'
import PvpList from '../PvpList/PvpList.jsx'
import HistoryPvpList from '../HistoryPvpList/HistoryPvpList.jsx'
import FuturePvpList from '../FuturePvpLits/FuturePvpLits.jsx'
import OutTame from '../OutTame/OutTame.jsx'

function Page1 (props) {
  // 历史数据
  const propsVe = diffCatch(props)({
    smid: 0,
    confrontation: [],
    historyConfrontation: [],
    matchAnalysis: [],
    matchList: {}
  })
  useEffect(function () {
    store.dispatch(getMatchAnalysisAsync(propsVe.smid))
  }, [propsVe.smid])

  return <div>
    <PvpStatistics
      matchList={propsVe.matchList}
      confrontation={propsVe.confrontation}
      historyConfrontation={propsVe.historyConfrontation}
    />
    <BeforeData
      matchAnalysis={propsVe.matchAnalysis}
      matchList={propsVe.matchList}
    />
    <PvpList />
    <HistoryPvpList />
    <FuturePvpList />
    <OutTame />
  </div>
}

function mapStateToProps (state) {
  return {
    matchAnalysis: state.details.match_analysis,
    confrontation: state.details.confrontation,
    historyConfrontation: state.details.histoty_confrontation_statistics
  }
}

export default connect(mapStateToProps)(Page1)
