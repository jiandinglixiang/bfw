import React from 'react'
import styles from './index.module.scss'
import defaultImg from '../../../../assets/default_team_40.png'
import { connect } from 'react-redux'
import { formatDate, searchFormat } from '../../../../../tool/util'

function GameOver (props) {
  const { endMatchList } = props
  const score = endMatchList.score.split(',') || []
  return <div className={styles.appContent}>
    <img src={endMatchList.icon || defaultImg} alt=''/>
    <div className={styles.gameNameAndTime}>
      <div><p>{endMatchList.game_name}</p><span>{endMatchList.match_rules}</span></div>
      <p>{formatDate(endMatchList.game_start_time)}</p>
    </div>
    <div className={styles.pvpNameOdd}>
      <p className={styles.leftName}>{endMatchList.host_team_name}</p>
      <img src={endMatchList.host_team_logo || defaultImg} alt=''/>
      <p className={styles.centerScore}>{score[0] || '-'}</p>
      <p className={styles.centerScore}>-</p>
      <p className={styles.centerScore}>{score[1] || '-'}</p>
      <img src={endMatchList.guest_team_logo || defaultImg} alt=''/>
      <p className={styles.rightName}>{endMatchList.guest_team_name}</p>
    </div>
    <a
      className={styles.navData}
      target='_blank'
      rel='noopener noreferrer'
      href={`/#/analysisData${searchFormat({
                smid: endMatchList.smid,
                gameName: endMatchList.game_type_name,
                matchName: endMatchList.game_name,
                tamePvp: `${endMatchList.host_team_name} VS ${endMatchList.guest_team_name}`,
                gameId: endMatchList.game_type_id
            })}`}
    >数据分析</a>
  </div>
}

export default connect(null, null)(GameOver)
