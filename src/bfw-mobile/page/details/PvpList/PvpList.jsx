import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import styles from './index.module.scss'
import def from '../../../assets/default_team_60.png'
import { connect } from 'react-redux'
import { diffCatch, formatDate, formatDate2, PropTypes } from '../../../../tool/util'

function initList (value, index) {
  const valueVe = diffCatch(value)({
    team2_score: 0,
    team1_score: 0,
    team2_info: {},
    team1_info: {},
    game_duration_time: 0
  })
  let winLogo = <div><span>平</span></div>
  let winScore = <div><span>暂无</span></div>
  if (valueVe.team1_score * 1 > valueVe.team2_score * 1) {
    winLogo = <div>
      <img src={valueVe.team1_info.icon || def} alt='' />
      <p>{valueVe.team1_info.name}</p>
    </div>
    winScore = <div>
      <p className={styles.scoreArr}>
        <span className={styles.winScore}>{valueVe.team1_score}</span>
        <span>-</span>
        <span>{valueVe.team2_score}</span>
      </p>
    </div>
  } else if (valueVe.team2_score * 1 > valueVe.team1_score * 1) {
    winLogo = <div>
      <img src={valueVe.team2_info.icon || def} alt='' />
      <p>{valueVe.team2_info.name}</p>
    </div>
    winScore = <div>
      <p className={styles.scoreArr}>
        <span>{valueVe.team1_score}</span>
        <span>-</span>
        <span className={styles.winScore}>{valueVe.team2_score}</span>
      </p>
    </div>
  }
  const time = parseInt(valueVe.game_duration_time / 60)
  return <li className={styles.bodyItem} key={index}>
    <div className={styles.longRow}>
      <p>{valueVe.match_name}</p>
      <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
    </div>
    <div>{time}'{valueVe.game_duration_time - (time ? time * 60 : 0)}</div>
    {winLogo}
    {winScore}
  </li>
}

function PvpList ({ twoSidesConfrontation = [] }) {
  const [more, showMore] = useState(false)
  const list = useMemo(function () {
    if (more) {
      return twoSidesConfrontation
    }
    return twoSidesConfrontation.length > 5 ? twoSidesConfrontation.slice(0, 5) : twoSidesConfrontation
  }, [twoSidesConfrontation, more])
  try {
    return <div className={styles.content}>
      <PvpTitle title='双方对阵列表' />
      <ul className={styles.publicClass}>
        {
          list.length ? <li className={styles.contentTitle}>
            <div className={styles.longRow}>赛事/时间</div>
            <div>时长</div>
            <div>胜负</div>
            <div>击杀比</div>
          </li> : <li className={styles.noneAnyOne} />
        }
        {
          list.map(initList)
        }
        {
          !more && twoSidesConfrontation.length > 5 ? <li className={styles.moreList} onClick={() => showMore(!more)}>
            点击展开更多比赛
          </li> : null
        }
      </ul>
    </div>
  } catch (e) {
    return <div className={`${styles.content} ${styles.noneAnyOne}`} />
  }
}

PvpList.propTypes = {
  twoSidesConfrontation: PropTypes.any
}
export default connect(function (state) {
  return {
    twoSidesConfrontation: state.details.two_sides_confrontation
  }
})(PvpList)
