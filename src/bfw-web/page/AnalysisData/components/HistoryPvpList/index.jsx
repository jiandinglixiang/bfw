import React from 'react'
import styles from './index.module.scss'
import PaginationCustom from '../PaginationCustom'
import MatchTimeTitle from '../../../home/components/MatchTimeTitle'
import TableTitle from '../TableTitle'
import { formatDate } from '../../../../../tool/util'
import defaultImg from '../../../../assets/default_team_40.png'
import moment from 'moment'

function momentDiff (a, b) {
  if (a.game_start_time === b.game_start_time) {
    return 0
  }
  return moment(a.game_start_time).isAfter(b.game_start_time) ? -1 : 1
}

function HistoryPvpList (props) {
  const { tameName, historyPvp } = props
  const historyList = historyPvp.map(v => {
    if (v) return { ...v }
    return v
  })
  historyList.sort(momentDiff)
  const listItem = historyList.map((value, index) => {
    const confrontation = value.confrontation || {}
    const winTame = value.win || {}
    const score = value.score ? (value.score.split(':') || []) : []
    return <div className={styles.appContent} key={index}>
      <div className={styles.gameNameAndTime}>
        <p>
          <span>{value.match_name}</span>
          <span>{value.match_rules}</span>
        </p>
        <p>{formatDate(value.game_start_time)}</p>
      </div>
      <div className={styles.tamePvpName}>
        <img src={confrontation.icon || defaultImg} alt=''/>
        <p>{confrontation.name}</p>
      </div>
      <div className={styles.tamePvpName}>
        <img src={winTame.icon || defaultImg} alt=''/>
        <p>{winTame.name}</p>
      </div>
      <p className={styles.tamePvpScore}>
        <span className={score[0] * 1 >= score[1] * 1 ? '' : styles.fall}>{score[0]}</span>
        <span className={styles.fall}>-</span>
        <span className={score[1] * 1 >= score[0] * 1 ? '' : styles.fall}>{score[1]}</span>
      </p>
    </div>
  })
  return <div>
    <MatchTimeTitle>{tameName}</MatchTimeTitle>
    <TableTitle title={['联赛', '对阵', '获胜', '击杀比']}/>
    <PaginationCustom listItem={listItem}/>
  </div>
}

export default HistoryPvpList
