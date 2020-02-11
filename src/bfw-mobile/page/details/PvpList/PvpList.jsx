import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import styles from './index.module.scss'
import def from '../../../assets/default_team_60.png'
import { connect } from 'react-redux'
import { formatDate2, PropTypes } from '../../../../tool/util'

function initList (value, index) {
  let winLogo = <div><span>平</span></div>
  let winScore = <div><span>暂无</span></div>
  if (value.team1_score * 1 > value.team2_score * 1) {
    winLogo = <div>
      <img src={value.team1_info.icon || def} alt='' />
      <p>{value.team1_info.name}</p>
    </div>
    winScore = <div>
      <p className={styles.scoreArr}>
        <span className={styles.winScore}>{value.team1_score}</span>
        <span>-</span>
        <span>{value.team2_score}</span>
      </p>
    </div>
  } else if (value.team2_score * 1 > value.team1_score * 1) {
    winLogo = <div>
      <img src={value.team2_info.icon || def} alt='' />
      <p>{value.team2_info.name}</p>
    </div>
    winScore = <div>
      <p className={styles.scoreArr}>
        <span>{value.team1_score}</span>
        <span>-</span>
        <span className={styles.winScore}>{value.team2_score}</span>
      </p>
    </div>
  }
  return <li className={styles.bodyItem} key={index}>
    <div className={styles.longRow}>
      <p>{value.match_name}</p>
      <p>{`${value.match_rules || ''} ${formatDate2(value.game_start_time)}`}</p>
    </div>
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
  twoSidesConfrontation: PropTypes.array
}
export default connect(function (state) {
  return {
    twoSidesConfrontation: state.details.twoSidesConfrontation
  }
})(PvpList)
