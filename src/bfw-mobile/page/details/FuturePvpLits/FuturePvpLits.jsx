import React, { useMemo, useState } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import stylesFuture from './index.module.scss'
import def from '../../../assets/default_team_60.png'
import { TameNameLogo } from '../HistoryPvpList/HistoryPvpList'
import styles from '../PvpList/index.module.scss'
import { connect } from 'react-redux'
import { formatDate2, objCatch, PropTypes } from '../../../../tool/util'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function initList (value, index) {
  const confrontation = objCatch(value)('confrontation')

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

function FuturePvpList ({ hostName, hostLogo, guestName, guestLogo, hostList, guestList }) {
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
  if (!hostList.length && !guestList.length) {
    return <div className={stylesFuture.content}>
      <PvpTitle title='未来赛程' />
      <div className={stylesFuture.withOut}>暂无数据</div>
    </div>
  }
  return <div className={stylesFuture.content}>
    <PvpTitle title='未来赛程' />
    <div className={stylesFuture.container}>
      <div>
        <TameNameLogo name={hostName} logo={hostLogo} mode />
        <ul className={styles.publicClass}>
          <li className={styles.contentTitle}>
            <div>对阵</div>
            <div className={styles.longRow}>联赛</div>
          </li>
          {host.map(initList)}
        </ul>
      </div>
      <div>
        <TameNameLogo name={guestName} logo={guestLogo} mode />
        <ul className={styles.publicClass}>
          <li className={styles.contentTitle}>
            <div>对阵</div>
            <div className={styles.longRow}>联赛</div>
          </li>
          {guest.map(initList)}
        </ul>
      </div>
    </div>
    {
      !more1 && isHave ? <div className={stylesFuture.moreList} onClick={() => showMore1(!more1)}>
        点击展开更多比赛
      </div> : null
    }
  </div>
}

FuturePvpList.propTypes = {
  hostName: PropTypes.string,
  hostLogo: PropTypes.string,
  guestName: PropTypes.string,
  guestLogo: PropTypes.string,
  hostList: PropTypes.array,
  guestList: PropTypes.array
}
export default connect(function (state) {
  return {
    hostName: state.details.matchList.host_team_name,
    hostLogo: state.details.matchList.host_team_logo,
    guestName: state.details.matchList.guest_team_name,
    guestLogo: state.details.matchList.guest_team_logo,
    hostList: state.details.future_schedule.team1_future_schedule || [],
    guestList: state.details.future_schedule.team2_future_schedule || []
  }
})(FuturePvpList)
