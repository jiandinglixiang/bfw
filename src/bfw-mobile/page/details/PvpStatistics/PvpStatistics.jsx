import React from 'react'
import styles from './index.module.scss'
import { diffCatch } from '../../../../tool/util'
import PvpTitle from '../PvpTitle/PvpTitle'
import { connect } from 'react-redux'
import PieChart from '../PieChart/PieChart.jsx'

const hideRatio = ['gpm', 'xpm', 'rating', 'adr', 'kda']

function confrontationMap (confrontation) {
  return confrontation.map((value, index) => {
    value = diffCatch(value)({
      name: '',
      team1_count: '',
      team2_count: '',
      team1_ratio: 0,
      team2_ratio: 0,
      type: 0
    })
    if (value.type > 0) {
      return <li key={index}>
        <PieChart value={value} />
      </li>
    }
    let team1Ratio = 0
    let team2Ratio = 0
    if (value.team1_ratio || value.team2_ratio) {
      team1Ratio = (value.team1_ratio && value.team1_ratio >= value.team2_ratio)
        ? value.team1_ratio + 2
        : value.team1_ratio
      team2Ratio = (value.team2_ratio && value.team2_ratio >= value.team1_ratio)
        ? value.team2_ratio + 2
        : value.team2_ratio
      team1Ratio /= 2
      team2Ratio /= 2
    }
    return <li key={index}>
      <div className={styles.itemTop}>
        <p>{value.team1_count}</p>
        <p>{value.name}</p>
        <p>{value.team2_count}</p>
      </div>
      <div className={styles.itemBottom}>
        <p>{hideRatio.includes(value.name.toLocaleLowerCase()) ? '0'
          : <span>{value.team1_ratio}%</span>}</p>
        <div className={styles.centerStatisticsHistory}>
          <div style={{
            width: `${team1Ratio}%`,
            zIndex: team1Ratio >= team2Ratio ? 1 : 'auto',
          }} />
          <div style={{
            width: `${team2Ratio}%`,
            zIndex: team2Ratio > team1Ratio ? 1 : 'auto',
          }} />
        </div>
        <p>{hideRatio.includes(value.name.toLocaleLowerCase()) ? '0'
          : <span>{value.team2_ratio}%</span>}</p>
      </div>
    </li>
  })
}

function PvpStatistics (props) {
  const { confrontation, historyConfrontation, matchList } = diffCatch(props)({
    confrontation: [],
    historyConfrontation: [],
    matchList: {}
  })
  return <div className={styles.content}>
    <PvpTitle title='对战交锋数据' />
    <div className={styles.tameNames}>
      <p>{matchList.host_team_name}</p>
      <p>{matchList.guest_team_name}</p>
    </div>
    <ul>
      {confrontationMap(confrontation)}
    </ul>
    <PvpTitle title='历史对战数据统计' />
    <div className={styles.tameNames}>
      <p>{matchList.host_team_name}</p>
      <p>{matchList.guest_team_name}</p>
    </div>
    <ul>
      {confrontationMap(historyConfrontation)}
    </ul>
  </div>
}

function mapStateToProps (state) {
  return {
    confrontation: state.details.confrontation,
    historyConfrontation: state.details.histotyConfrontationStatistics
  }
}

export default connect(mapStateToProps)(PvpStatistics)
