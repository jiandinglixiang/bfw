import React, { useMemo } from 'react'
import styles from './index.module.scss'
import closeIcon from '../../../assets/close.png'
import { Modal } from 'antd-mobile'
import { formatDate, inning, PropTypes } from '../../../../tool/util'
import liveBtnOn from '../../../assets/btn_live_on.png'
import liveBtnOff from '../../../assets/btn_live_off.png'
import def from '../../../assets/default_team_60.png'
import { connect } from 'react-redux'
import { gameRound } from '../../home/MatchItem/MatchItem'

const alert = Modal.alert
const alertStyle = {
  lineHeight: '40px',
  height: '40px',
  backgroundColor: '#203457',
}

function liveClick (liveList) {
  try {
    const alertCopy = alert('',
      <div className={styles.alertTitle}>
        <span>请选择直播源</span>
        <img src={closeIcon} onClick={() => alertCopy.close()} alt='' />
      </div>,
      liveList.map(value => {
        return {
          text: value.live_name,
          onPress: () => {
            window.open(value.live_h5_url || value.live_url, '_blank')
          },
          style: alertStyle,
        }
      })
    )
  } catch (e) {
    return false
  }
}

function PvpTameState ({ gameId, matchList, liveList }) {
  const status = matchList.status * 1
  const { scoreArr, round, title, dis, } = useMemo(function () {
    const score = matchList.score || ''
    const scoreList = matchList.score_list || []
    let scoreArr = [] // 当前比分
    let round = null // 当前局
    let title = null // 状态
    let dis = '-' // 中间显示横杠或
    if (status === 1) {
      let len = null
      title = '进行中'
      if (scoreList.length && (len = scoreList[scoreList.length - 1])) {
        scoreArr = [len.team1, len.team2]
        round = gameRound(scoreList, matchList.round_total)
      } else {
        scoreArr = [0, 0]
        round = '第一局'
      }
    } else if (status === 2) {
      round = inning(scoreList.length)
      scoreArr = score.split(',').map(v => v || '0')
      title = '已结束'
    } else {
      round = '全局'
      title = `${formatDate(matchList.game_start_time, 'HH:mm')} 未开始`
      dis = 'VS'
    }
    return { scoreArr, round, title, dis, }
  }, [matchList, status])
  try {
    return <div className={`${styles.content} ${styles[`game-rear-${gameId}`]}`}>
      <div className={`${styles.topState} ${styles[`topState${status}`]}`}>
        <p> {matchList.match_rules}/{round}</p>
        <p> {title}</p>
      </div>
      <div className={styles.centerTameName}>
        <p className={styles.name} style={{ textAlign: 'right' }}>{matchList.host_team_name}</p>
        <img className={styles.logo} src={matchList.host_team_logo || def} alt='' />
        <div className={styles.pvpScore}>
          <p>{scoreArr[0]}</p>
          <p>{dis}</p>
          <p>{scoreArr[1]}</p>
        </div>
        <img className={styles.logo} src={matchList.guest_team_logo || def} alt='' />
        <p className={styles.name}>{matchList.guest_team_name}</p>
      </div>
      <p className={styles.bottomDate}>
        {
          formatDate(matchList.game_start_time, 'YYYY-MM-DD')
        }
      </p>
      {
        liveList.length
          ? <img
            onClick={() => liveClick(liveList)} src={liveBtnOn} width='80' height='30'
            alt='' />
          : <img src={liveBtnOff} width='80' height='30' alt='' />
      }
    </div>
  } catch (e) {
    return <div className={styles.content} />
  }
}

PvpTameState.propTypes = {
  gameId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  matchList: PropTypes.object,
  liveList: PropTypes.array
}
export default connect(function (state) {
  return {
    matchList: state.details.matchList,
    liveList: state.details.liveList
  }
})(PvpTameState)
