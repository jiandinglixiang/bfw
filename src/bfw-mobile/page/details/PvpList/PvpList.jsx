import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import styles from './index.module.scss'
import def from '../../../assets/default_team_60.png'
import { diffCatch, formatDate, PropTypes, useSearch } from '../../../../tool/util'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function ListItem (props) {
  const [search] = useSearch()
  const { gameId } = diffCatch(search)({
    gameId: 0
  })
  const { value } = diffCatch(props)({
    value: {
      team2_score: 0,
      team1_score: 0,
      team2_info: {},
      team1_info: {},
      game_duration_time: 0
    }
  })
  const valueVe = value
  let winLogo = <div><span>平</span></div>
  let winScore = <div><span>暂无</span></div>
  if (valueVe.team1_score * 1 > valueVe.team2_score * 1) {
    winLogo = <div>
      <Image src={valueVe.team1_info.icon || def} alt='' />
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
      <Image src={valueVe.team2_info.icon || def} alt='' />
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
  if (gameId === 2) {
    return (
      <li>
        <div className={styles.longRow}>
          <p>{valueVe.match_name}</p>
          <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
        </div>
        {winLogo}
      </li>
    )
  }
  if (gameId === 3) {
    return (
      <li className={styles.bodyItem}>
        <div className={styles.longRow}>
          <p>{valueVe.match_name}</p>
          <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
        </div>
        {winScore}
        {winLogo}
      </li>
    )
  }
  const time = parseInt(valueVe.game_duration_time / 60)
  return (
    <li className={styles.bodyItem}>
      <div className={styles.longRow}>
        <p>{valueVe.match_name}</p>
        <p>{`${valueVe.match_rules || ''} ${formatDate(valueVe.game_start_time, 'MM-DD')}`}</p>
      </div>
      <div>{time}'{valueVe.game_duration_time - (time ? time * 60 : 0)}</div>
      {winLogo}
      {winScore}
    </li>)
}

function Title ({ gameId }) {
  if (gameId === 2) {
    return (
      <li className={styles.contentTitle}>
        <div className={styles.longRow}>赛事/时间</div>
        <div>胜负</div>
      </li>
    )
  }
  if (gameId === 3) {
    return (
      <li className={styles.contentTitle}>
        <div className={styles.longRow}>赛事/时间</div>
        <div>回合比分</div>
        <div>胜负</div>
      </li>
    )
  }
  return (
    <li className={styles.contentTitle}>
      <div className={styles.longRow}>赛事/时间</div>
      <div>时长</div>
      <div>胜负</div>
      <div>击杀比</div>
    </li>
  )
}

function PvpList (props) {
  const [more, showMore] = useState(false)
  const { twoSidesConfrontation, gameId } = diffCatch(props)({
    gameId: 0,
    twoSidesConfrontation: []
  })
  const list = useMemo(function () {
    if (more) {
      return twoSidesConfrontation
    }
    return twoSidesConfrontation.length > 5 ? twoSidesConfrontation.slice(0, 5) : twoSidesConfrontation
  }, [twoSidesConfrontation, more])

  return (
    <div className={styles.content}>
      <PvpTitle title='双方对阵列表' />
      <ul className={styles.publicClass}>
        <Title gameId={gameId} />
        {
          !list.length && <li className={styles.noneAnyOne} />
        }
        {
          list.map((value, index) => <ListItem value={value} key={index} />)
        }
        {
          !more && twoSidesConfrontation.length > 5 ? <li className={styles.moreList} onClick={() => showMore(!more)}>
            点击展开更多比赛
          </li> : null
        }
      </ul>
    </div>)
}

export default PvpList

Title.propTypes = {
  gameId: PropTypes.any
}
