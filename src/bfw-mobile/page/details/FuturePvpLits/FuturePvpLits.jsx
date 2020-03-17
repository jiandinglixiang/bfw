import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import stylesFuture from './index.module.scss'
import def from '../../../assets/default_team_60.png'
import { TameNameLogo } from '../HistoryPvpList/HistoryPvpList'
import styles from '../PvpList/index.module.scss'
import { diffCatch, formatDate2, useDiffCatch } from '../../../../tool/util'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function initList (value, index) {
  const { confrontation } = diffCatch(value)({
    confrontation: {}
  })
  return <li className={styles.bodyItem} key={index}>
    <div>
      <Image src={confrontation.icon || def} alt='' />
      <p>{confrontation.name}</p>
    </div>
    <div className={styles.longRow}>
      <p>{value.match_name}</p>
      <p>{`${value.match_rules || ''} ${formatDate2(value.game_start_time)}`}</p>
    </div>
  </li>
}

function FuturePvpList (props) {
  const propsVE = useDiffCatch(props)({
    teamInfo: {},
    futureSchedule: {
      team1_future_schedule: [],
      team2_future_schedule: [],
    }
  })
  const hostList = propsVE.futureSchedule.team1_future_schedule
  const guestList = propsVE.futureSchedule.team2_future_schedule
  const [more1, showMore1] = useState(false)
  const [host, guest, isHave] = useMemo(function () {
    if (more1) {
      return [hostList, guestList, false]
    }
    if (hostList.length > 5 || guestList.length > 5) {
      return [
        hostList.slice(0, 5),
        guestList.slice(0, 5),
        true
      ]
    } else {
      return [
        hostList,
        guestList,
        false
      ]
    }
  }, [hostList, guestList, more1])

  return <div className={stylesFuture.content}>
    <PvpTitle title='未来赛程' />
    <div className={stylesFuture.container}>
      <div>
        <TameNameLogo name={propsVE.teamInfo.team1.name} logo={propsVE.teamInfo.team1.logo} mode />
        <ul className={styles.publicClass}>
          <li className={styles.contentTitle}>
            <div>对阵</div>
            <div className={styles.longRow}>联赛</div>
          </li>
          {host.map(initList)}
          {!host.length && <li className={stylesFuture.withOut}>暂无数据</li>}
        </ul>
      </div>
      <div>
        <TameNameLogo name={propsVE.teamInfo.team2.name} logo={propsVE.teamInfo.team2.logo} mode />
        <ul className={styles.publicClass}>
          <li className={styles.contentTitle}>
            <div>对阵</div>
            <div className={styles.longRow}>联赛</div>
          </li>
          {guest.map(initList)}
          {!guest.length && <li className={stylesFuture.withOut}>暂无数据</li>}
        </ul>
      </div>
    </div>
    {
      isHave && <div className={stylesFuture.moreList} onClick={() => showMore1(!more1)}>
        {more1 ? '点击收起更多比赛' : '点击展开更多比赛'}
      </div>
    }
  </div>
}

export default FuturePvpList
