import React, { useMemo } from 'react'
import PvpTitle from '../PvpTitle/PvpTitle'
import stylesOutTame from './index.module.scss'
import { TameNameLogo } from '../HistoryPvpList/HistoryPvpList'
import styles from '../PvpList/index.module.scss'
import def from '../../../assets/default_team_60.png'
import { objCatch, PropTypes } from '../../../../tool/util'
import { connect } from 'react-redux'

function initList (value, index) {
  let name = ''
  if (value.name) {
    if (value.name.includes(value.alias)) {
      name = value.name
    } else {
      name = `${value.name} (${value.alias || ''})`
    }
  }
  return <li className={styles.bodyItem} key={index} style={{ height: '45px' }}>
    <div>
      <img src={value.photo || def} alt='' />
    </div>
    <div className={styles.longRow}>
      <p className={styles.leftText}>{name}</p>
      <p className={styles.leftText}>{value.country_name ? value.country_name : name ? '暂无' : ''}</p>
    </div>
  </li>
}

function OutTame ({ hostName, hostLogo, guestName, guestLogo, hostList, guestList }) {
  const [host, guest, withOut] = useMemo(function () {
    // 补齐一样长度
    const diff = hostList.length > guestList.length
    if (!diff && !hostList.length && !guestList.length) return [[], [], true]
    const list1 = [...hostList]
    const list2 = [...guestList]
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        list2.push({})
      }
    } else if (diff < 0) {
      for (let i = 0; i > diff; i--) {
        list1.push({})
      }
    }
    return [list1, list2, false]
  }, [hostList, guestList])
  if (withOut) {
    return <div className={stylesOutTame.content}>
      <PvpTitle title='出场名单' />
      <div className={stylesOutTame.withOut}>暂无数据</div>
    </div>
  }
  return <div className={stylesOutTame.content}>
    <PvpTitle title='出场名单' />
    <div className={stylesOutTame.container}>
      <div>
        <TameNameLogo name={hostName} logo={hostLogo} mode />
        <ul className={styles.publicClass}>
          <li className={styles.contentTitle}>
            <div>头像</div>
            <div className={styles.longRow}>名字/国籍</div>
          </li>
          {host.map(initList)}
        </ul>
      </div>
      <div>
        <TameNameLogo name={guestName} logo={guestLogo} mode />
        <ul className={styles.publicClass}>
          <li className={styles.contentTitle}>
            <div>头像</div>
            <div className={styles.longRow}>名字/国籍</div>
          </li>
          {guest.map(initList)}
        </ul>
      </div>
    </div>
  </div>
}

OutTame.propTypes = {
  hostName: PropTypes.string,
  hostLogo: PropTypes.string,
  guestName: PropTypes.string,
  guestLogo: PropTypes.string,
  hostList: PropTypes.array,
  guestList: PropTypes.array
}
export default connect(function (state) {
  const players = objCatch(state.details)('players')
  const matchList = objCatch(state.details)('matchList')
  return {
    hostName: matchList.host_team_name,
    hostLogo: matchList.host_team_logo,
    guestName: matchList.guest_team_name,
    guestLogo: matchList.guest_team_logo,
    hostList: players.team1_players || [],
    guestList: players.team2_players || []
  }
})(OutTame)
