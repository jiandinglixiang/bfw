import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import styles from '../PvpList/index.module.scss'
import def from '../../../assets/default_team_60.png'
import { diffCatch, formatDate, PropTypes, useSearch } from '../../../../tool/util'
import styles2 from './index.module.scss'
import { connect } from 'react-redux'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

export function TameNameLogo ({ name, logo, mode }) {
  return <div className={`${styles2.tameNameLogo} ${mode ? styles2.background2 : ''}`}>
    <Image src={logo || def} alt='' />
    <p>{name || '加载中...'}</p>
  </div>
}

function ListItem (props) {
  const [search] = useSearch()
  const { gameId } = diffCatch(search)({
    gameId: 0
  })
  const { value } = diffCatch(props)({
    value: {
      confrontation: {},
      win: {}
    }
  })
  const valueVe = value
  const scoreArr = (valueVe.score || '').split(/:|,/)
  let scoreE = <span>暂无</span>
  if (scoreArr.length) {
    scoreE = <p className={styles.scoreArr}>
      <span className={scoreArr[0] > scoreArr[1] ? styles.winScore : ''}>{scoreArr[0]}</span>
      <span>-</span>
      <span className={scoreArr[1] > scoreArr[0] ? styles.winScore : ''}>{scoreArr[1]}</span>
    </p>
  }
  if (gameId === 2) {
    return (
      <li>
        <div>
          <Image src={valueVe.confrontation.icon || def} alt='' />
          <p>{valueVe.confrontation.name}</p>
        </div>
        <div className={styles.longRow}>
          <p>{valueVe.match_name}</p>
          <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
        </div>
        <div>
          <Image src={valueVe.win.icon || def} alt='' />
          <p>{valueVe.win.name}</p>
        </div>
      </li>
    )
  }
  if (gameId === 3) {
    return (
      <li>
        <div>
          <Image src={valueVe.confrontation.icon || def} alt='' />
          <p>{valueVe.confrontation.name}</p>
        </div>
        <div className={styles.longRow}>
          <p>{valueVe.match_name}</p>
          <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
        </div>
        <div>
          {scoreE}
        </div>
        <div>
          <Image src={valueVe.win.icon || def} alt='' />
          <p>{valueVe.win.name}</p>
        </div>
      </li>
    )
  }
  const time = parseInt(valueVe.game_duration_time / 60)
  return <li className={styles.bodyItem}>
    <div>
      <Image src={valueVe.confrontation.icon || def} alt='' />
      <p>{valueVe.confrontation.name}</p>
    </div>
    <div className={styles.longRow}>
      <p>{valueVe.match_name}</p>
      <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
    </div>
    <div>
      {time}'{valueVe.game_duration_time - (time ? time * 60 : 0)}
    </div>
    <div>
      <Image src={valueVe.win.icon || def} alt='' />
      <p>{valueVe.win.name}</p>
    </div>
    <div>
      {scoreE}
    </div>
  </li>
}

function Title () {
  const [search] = useSearch()
  const { gameId } = diffCatch(search)({
    gameId: 0
  })
  if (gameId === 2) {
    return (
      <li className={styles.contentTitle}>
        <div>对阵</div>
        <div className={styles.longRow}>联赛</div>
        <div>胜负</div>
      </li>
    )
  }
  if (gameId === 3) {
    return (
      <li className={styles.contentTitle}>
        <div>对阵</div>
        <div className={styles.longRow}>联赛</div>
        <div>回合比分</div>
        <div>胜负</div>
      </li>
    )
  }
  return (
    <li className={styles.contentTitle}>
      <div>对阵</div>
      <div className={styles.longRow}>联赛</div>
      <div>时长</div>
      <div>胜负</div>
      <div>击杀比</div>
    </li>
  )
}

function initList (list, len, more, showMore) {
  if (len) {
    return <ul className={`${styles.publicClass} ${styles.compactRow}`}>
      <Title />
      {list.map((value, index) => <ListItem key={index} value={value} />)}
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
  return {
    hostName: state.details.matchList.host_team_name,
    hostLogo: state.details.matchList.host_team_logo,
    guestName: state.details.matchList.guest_team_name,
    guestLogo: state.details.matchList.guest_team_logo,
    hostList: state.details.history_competition.team1_history_competition || [],
    guestList: state.details.history_competition.team2_history_competition || []
  }
})(HistoryPvpList)
