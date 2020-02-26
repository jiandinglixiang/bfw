import React from 'react'
import styles from './index.module.scss'
import { PropTypes } from '../../../../tool/util'
import PvpTitle from '../PvpTitle/PvpTitle'

const hideRatio = ['gpm', 'xpm', 'rating', 'adr', 'kda']

function confrontationMap (confrontation, showMode) {
  try {
    return confrontation.map((value, index) => {
      const [originalRatio1, originalRatio2] = [value.team1_ratio * 1, value.team2_ratio * 1]
      let team1Ratio = 0
      let team2Ratio = 0
      if (originalRatio1 || originalRatio2) {
        team1Ratio = (originalRatio1 && originalRatio1 >= originalRatio2)
          ? originalRatio1 + 2
          : originalRatio1
        team2Ratio = (originalRatio2 && originalRatio2 >= originalRatio1)
          ? originalRatio2 + 2
          : originalRatio2
      }
      if (showMode) {
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
  } catch (e) {
    console.log(e)
    return <li className={styles.noneAnyOne}>暂无数据</li>
  }
}

function PvpStatistics ({ confrontation, historyConfrontation, hostName, guestName }) {
  return <div className={styles.content}>
    <PvpTitle title='对战交锋数据' />
    <div className={styles.tameNames}>
      <p>{hostName}</p>
      <p>{guestName}</p>
    </div>
    <ul>
      {confrontationMap(confrontation, false)}
    </ul>
    <PvpTitle title='历史对战数据统计' />
    <div className={styles.tameNames}>
      <p>{hostName}</p>
      <p>{guestName}</p>
    </div>
    <ul>
      {confrontationMap(historyConfrontation, true)}
    </ul>
  </div>
}

PvpStatistics.propTypes = {
  hostName: PropTypes.string,
  guestName: PropTypes.string,
  confrontation: PropTypes.array,
  historyConfrontation: PropTypes.array
}

function CsGoPage () {
  // 历史数据
  return <div>
    <div className={styles.content}>
      <PvpTitle title='对战交锋数据' />
      <div className={styles.tameNames}>
        <p>{hostName}</p>
        <p>{guestName}</p>
      </div>
      <ul>
        {confrontationMap(confrontation, false)}
      </ul>
      <PvpTitle title='历史对战数据统计' />
      <div className={styles.tameNames}>
        <p>{hostName}</p>
        <p>{guestName}</p>
      </div>
      <ul>
        {confrontationMap(historyConfrontation, true)}
      </ul>
    </div>
  </div>
}

export default CsGoPage
