import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import styles from '../PvpList/index.module.scss'
import def from '../../../assets/default_team_60.png'
import { formatDate2, objCatch, PropTypes } from '../../../../tool/util'
import styles2 from './index.module.scss'
import { connect } from 'react-redux'

export function TameNameLogo ({ name, logo, mode }) {
  return <div className={`${styles2.tameNameLogo} ${mode ? styles2.background2 : ''}`}>
    <img src={logo || def} alt='' />
    <p>{name || '加载中...'}</p>
  </div>
}

function initItem (value, index) {
  const confrontation = objCatch(value)('confrontation')
  const win = objCatch(value)('win')
  const scoreArr = (value.score || '').split(/:|,/)
  let scoreE = <span>暂无</span>
  if (scoreArr.length) {
    scoreE = <p className={styles.scoreArr}>
      <span className={scoreArr[0] > scoreArr[1] ? styles.winScore : ''}>{scoreArr[0]}</span>
      <span>-</span>
      <span className={scoreArr[1] > scoreArr[0] ? styles.winScore : ''}>{scoreArr[1]}</span>
    </p>
  }
  return <li className={styles.bodyItem} key={index}>
    <div>
      <img src={confrontation.icon || def} alt='' />
      <p>{confrontation.name}</p>
    </div>
    <div className={styles.longRow}>
      <p>{value.match_name}</p>
      <p>{`${value.match_rules || ''} ${formatDate2(value.game_start_time)}`}</p>
    </div>
    <div>
      <img src={win.icon || def} alt='' />
      <p>{win.name}</p>
    </div>
    <div>
      {scoreE}
    </div>
  </li>
}

function initList (list, len, more, showMore) {
  if (len) {
    return <ul className={`${styles.publicClass} ${styles.compactRow}`}>
      <li className={styles.contentTitle}>
        <div>对阵</div>
        <div className={styles.longRow}>赛事/时间</div>
        <div>胜负</div>
        <div>击杀比</div>
      </li>
      {list.map(initItem)}
      {
        !more && len > 5 ? <li className={styles.moreList} onClick={() => showMore(!more)}>
          点击展开更多比赛
        </li> : null
      }
    </ul>
  }
  return <div className={styles2.withOut}>暂无数据</div>
}

function HistoryPvpList ({ hostName, hostLogo, guestName, guestLogo, hostList, guestList }) {
  const [more1, showMore1] = useState(false)
  const [more2, showMore2] = useState(false)
  const host = useMemo(function () {
    if (more1) {
      return hostList
    }
    return hostList.length > 5 ? hostList.slice(0, 5) : hostList
  }, [hostList, more1])
  const guest = useMemo(function () {
    if (more2) {
      return guestList
    }
    return guestList.length > 5 ? guestList.slice(0, 5) : guestList
  }, [guestList, more2])
  return <div className={styles.content}>
    <PvpTitle title='历史比赛列表' />
    <div className={styles2.paddingTop15} />
    <TameNameLogo name={hostName} logo={hostLogo} />
    {initList(host, hostList.length, more1, showMore1)}
    <div className={styles2.paddingTop15} />
    <TameNameLogo name={guestName} logo={guestLogo} />
    {initList(guest, guestList.length, more2, showMore2)}
  </div>
}

HistoryPvpList.propTypes = {
  hostName: PropTypes.string,
  hostLogo: PropTypes.string,
  guestName: PropTypes.string,
  guestLogo: PropTypes.string,
  hostList: PropTypes.array,
  guestList: PropTypes.array
}
TameNameLogo.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
  mode: PropTypes.bool
}

export default connect(function (state) {
  const historyCompetition = objCatch(state.details)('historyCompetition')
  const matchList = objCatch(state.details)('matchList')
  return {
    hostName: matchList.host_team_name,
    hostLogo: matchList.host_team_logo,
    guestName: matchList.guest_team_name,
    guestLogo: matchList.guest_team_logo,
    hostList: historyCompetition.team1_history_competition || [],
    guestList: historyCompetition.team2_history_competition || []
  }
})(HistoryPvpList)
