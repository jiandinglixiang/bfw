import React from 'react'
import styles from './index.module.scss'
import defaultImg from '../../../../assets/default_team_40.png'
import { formatDate, initOddAndLogo, searchFormat, toFixed } from '../../../../../tool/util'
import { connect } from 'react-redux'

function RaceOff (props) {
  const { notStartMatchList } = props
  const tameData = initOddAndLogo(notStartMatchList)

  return <div className={styles.appContent}>
    <img src={notStartMatchList.icon || defaultImg} alt=''/>
    <div className={styles.gameNameAndTime}>
      <div><p>{notStartMatchList.game_name}</p> <span>{notStartMatchList.match_rules}</span></div>
      <p>{formatDate(notStartMatchList.game_start_time)}</p>
    </div>
    <div className={styles.pvpNameOdd}>
      <div className={styles.pvpLeft}>
        <div className={styles.tameNameOdd}>
          <p>{tameData[0].name}</p>
          <p>{toFixed(tameData[0].odds)}</p>
        </div>
        <img src={tameData[0].logo || defaultImg} alt=''/>
      </div>
      <div className={styles.pvpCenter}>
        <p>VS</p>
        <p>指数</p>
      </div>
      <div className={styles.pvpRight}>
        <img src={tameData[1].logo || defaultImg} alt=''/>
        <div className={styles.tameNameOdd}>
          <p>{tameData[1].name}</p>
          <p>{toFixed(tameData[1].odds)}</p>
        </div>
      </div>
    </div>
    <a
      className={styles.navData}
      target='_blank'
      rel='noopener noreferrer'
      href={`/#/analysisData${searchFormat({
                smid: notStartMatchList.smid,
                gameName: notStartMatchList.game_type_name,
                matchName: notStartMatchList.game_name,
                tamePvp: `${notStartMatchList.host_team_name} VS ${notStartMatchList.guest_team_name}`,
                gameId: notStartMatchList.game_type_id
            })}`}
      // to={{
      //     pathname: '',
      //     search: searchFormat({
      //         smid: notStartMatchList.smid,
      //         gameName: gameName,
      //         matchName: notStartMatchList.game_name,
      //         tamePvp: `${notStartMatchList.host_team_name} VS ${notStartMatchList.guest_team_name}`,
      //         gameId: gameId
      //     })
      // }}
    >
            数据分析
    </a>
  </div>
}

export default connect(null, null)(RaceOff)
