import React from 'react'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import moment from 'moment'
import defaultImg from '../../../../assets/default_team_40.png'
import { gameRound } from '../../../../../bfw-mobile/page/home/MatchItem/MatchItem'

export function format (time, swf) {
  try {
    return moment(time).format(swf || 'YYYY年MM月DD日')
  } catch (e) {
    return time
  }
}

export function scoreListReduce (scoreList) {
  return scoreList.reduce(function (sum, top = {}) {
    // 计算总比分  使首页比分取值同步
    sum[0] = (top.team1 || 0) + sum[0]
    sum[1] = (top.team2 || 0) + sum[1]
    return sum
  }, [0, 0])
}

function TameNowStatus (props) {
  const { matchList = {}, liveList, gameId } = props
  const status = matchList.status * 1
  const scoreList = matchList.score_list || []
  const score = matchList.score || ''
  let scoreArr = []
  let round = ''
  let dis = '-'

  if (status === 1) {
    if (scoreList.length) {
      scoreArr = scoreListReduce(scoreList)
      round = gameRound(scoreList, matchList.round_total)
    } else {
      scoreArr = [0, 0]
      round = '第一局'
    }
  } else if (status === 2) {
    round = '已结束'
    scoreArr = score.split(/:|,/).map(v => (v && parseInt(v)) || 0)
  } else {
    round = `${format(matchList.game_start_time, 'HH:mm')} 未开始`
    dis = 'VS'
  }

  return <div className={`${styles.appContent} ${styles[`game-rear-${gameId}`]}`}>
    <div className={`${styles.roundTitle} ${styles[`status-${status}`]}`}>
      <p><span>{format(matchList.game_start_time)}</span>
        <span>{matchList.game_name}</span><span>{matchList.match_rules}</span></p>
      <p>{round}</p>
    </div>
    <div className={styles.tamePvpName}>
      <p className={styles.leftName}>
        {matchList.host_team_name}
      </p>
      <img
        src={matchList.host_team_logo || defaultImg}
        alt=''
      />
      <p className={styles.centerScore}>{scoreArr[0]}</p>
      <p className={styles.centerScore}>{dis}</p>
      <p className={styles.centerScore}>{scoreArr[1]}</p>
      <img
        src={matchList.guest_team_logo || defaultImg}
        alt=''
      />
      <p className={styles.rightName}>
        {matchList.guest_team_name}
      </p>
    </div>
    <ul className={styles.pvpLiveList}>
      {
        (liveList || []).map((value, index) => {
          return <li key={index}><a
            href={value.live_url}
            target='_blank'
            rel='noopener noreferrer'
          >{value.live_name}</a></li>
        })
      }
    </ul>
  </div>
}

function mapStateToProps (state) {
  return {
    matchList: state.details.matchList,
    liveList: state.details.liveList
  }
}

export default connect(mapStateToProps, null)(TameNowStatus)
