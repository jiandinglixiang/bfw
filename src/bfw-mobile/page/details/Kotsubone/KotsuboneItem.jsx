import React from 'react'
import styles from './index.module.scss'
import tianhui from '../../../assets/tianhui_type2.png'
import yemo from '../../../assets/nightdemon_type2.png'
import { diffCatch, toBigNumber } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import firstBlood from '../../../assets/firstblood.png'
import deckills from '../../../assets/deckills.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function KotsuboneItem (props) {
  const { endMatchVe } = diffCatch(props)({
    endMatchVe: {
      poor_economy: {
        time: 0,
        gold: 0
      },
      team1: {
        team_logo: '',
        other_more_attr: {},
        team_name: '',
        round: 1,
        is_win: 1,
        players: [],
        ban: []
      },
      team2: {
        team_logo: '',
        other_more_attr: {},
        team_name: '',
        round: 1,
        is_win: 1,
        players: [],
        ban: []
      },
      battle_data: {}
    }
  })
  const time = parseInt(endMatchVe.poor_economy.time / 60)
  const gold = toBigNumber(endMatchVe.poor_economy.gold / 1000).toFormat(1)
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div className={styles.teamIcon}><Image src={yemo} /></div>
        <div className={styles.logo}><Image src={endMatchVe.team1.team_logo || defImg1} /></div>
        <b>{endMatchVe.team1.score}</b>
      </div>
      <div className={styles.teamName}>
        <p>{endMatchVe.team1.team_name}</p>
      </div>
      <div className={styles.aBloodIcon}>
        {endMatchVe.team1.other_more_attr.s_first_blood > 0 ? <Image src={firstBlood} /> : <span />}
        {endMatchVe.team1.other_more_attr.is_ten_kills > 0 ? <Image src={deckills} /> : <span />}
      </div>
    </div>
    <div className={styles.center}>
      <div className={styles.high}>
        <p className={styles.boutOver} style={{ alignSelf: 'flex-end' }}>
          {time}'{endMatchVe.poor_economy.time - time * 60}
        </p>
      </div>
      <div className={styles.high}>
        <p className={styles.difference}><span>差{gold}k</span></p>
      </div>
    </div>
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <b className={styles.colorYellow}>{endMatchVe.team2.score}</b>
        <div className={styles.logo}><Image src={endMatchVe.team2.team_logo || defImg2} /></div>
        <div className={styles.teamIcon}><Image src={tianhui} /></div>
      </div>
      <div className={styles.teamName}>
        <p>{endMatchVe.team2.team_name}</p>
      </div>
      <div className={styles.aBloodIcon}>
        {endMatchVe.team2.other_more_attr.is_ten_kills > 0 ? <Image src={deckills} /> : <span />}
        {endMatchVe.team2.other_more_attr.is_first_blood > 0 ? <Image src={firstBlood} /> : <span />}
      </div>
    </div>
  </div>
}

KotsuboneItem.propTypes = {}
export default KotsuboneItem
