import React from 'react'
import styles from './index.module.scss'
import PaginationCustom from '../PaginationCustom'
import { formatDate } from '../../../../../tool/util'
import defaultImg from '../../../../assets/default_team_40.png'

function PvpList ({ twoSides }) {
  const listItem = twoSides.map((value, index) => {
    const team1Info = value.team1_info || {}
    const team2Info = value.team2_info || {}
    return <div className={styles.appContent} key={index}>
      <div className={styles.gameNameAndTime}>
        <p><span>{value.match_name}</span><span>{value.match_rules}</span></p>
        <p>{formatDate(value.game_start_time)}</p>
      </div>
      <div className={styles.tamePvpName}>
        <p className={styles.leftName}>
          {team1Info.name}
        </p>
        <img src={team1Info.icon || defaultImg} alt=''/>
        <p className={`${styles.centerScore} ${value.team1_score > value.team2_score ? styles.winOf : ''}`}>
          {value.team1_score}
        </p>
        <p className={`${styles.centerScore} ${styles.grayColor}`}>-</p>
        <p className={`${styles.centerScore} ${value.team2_score > value.team1_score ? styles.winOf : ''}`}>
          {value.team2_score}
        </p>
        <img src={team2Info.icon || defaultImg} alt=''/>
        <p className={styles.rightName}>
          {team2Info.name}
        </p>
      </div>
    </div>
  })
  return <PaginationCustom listItem={listItem} limit={5}/>
}

export default PvpList
