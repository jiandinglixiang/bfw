import React from 'react'
import styles from './index.module.scss'
import { diffCatch } from '../../../../tool/util.js'
import kill5 from '../../../assets/5turn.png'
import killsix from '../../../assets/sixtgun.png'
import killone from '../../../assets/firstgun.png'
import counter from '../../../assets/counter.png'
import terrorists from '../../../assets/terrorists.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function CsGoNowStatus (props) {
  const propsVE = diffCatch(props)({
    round: 0,
    isBottomBoth: false,
    overtime: false, // 加时赛
    team1: {
      name: '',
      score: [0, 0],
      role: [false, false],
      sente: [],
      sum: 0
    },
    team2: {
      name: '',
      score: [],
      role: [false, false],
      sente: [],
      sum: 0
    }
  })
  return <div
    className={styles.container}
    style={{
      minHeight: propsVE.isBottomBoth ? '100px' : '90px'
    }}
  >
    <div className={styles.flanks1}>
      {!propsVE.isBottomBoth && [
        <div className={styles.senteIcon} key='0'>
          {propsVE.team1.sente[0] ? <Image src={killsix} /> : <span />}
          {propsVE.team1.sente[1] ? <Image src={kill5} /> : <span />}
          {propsVE.team1.sente[2] ? <Image src={killone} /> : <span />}
        </div>,
        <div className={styles.nowScore} key='1'>{propsVE.team1.sum}</div>
      ]}
      {
        propsVE.isBottomBoth && [
          <div className={styles.teamName} key='0'>
            <p>{propsVE.team1.name}</p>
          </div>,
          <div className={styles.nowScore2} key='1'>
            <p className={
              propsVE.team1.sum > propsVE.team2.sum ? styles.colorYellow : styles.colorGray
            }>{propsVE.team1.sum}</p>
          </div>
        ]
      }
      <div className={styles.factionIcon}>
        {
          propsVE.team1.role.map((value, index) => {
            return <div key={index}>
              <Image src={value ? terrorists : counter} />
            </div>
          })
        }
      </div>
      <div className={styles.overScore}>
        <p>{propsVE.team1.score[0]}</p>
        <p>{propsVE.round > 15 ? propsVE.team1.score[1] : propsVE.team1.score[1] || '-'}</p>
        {propsVE.overtime && <p>{propsVE.team1.score[2]}</p>}
      </div>
    </div>
    <div className={styles.center}>
      <p>上半场</p>
      <p>下半场</p>
      {
        propsVE.overtime && <p>加时赛</p>
      }
    </div>
    <div className={styles.flanks2}>
      <div className={styles.overScore}>
        <p>{propsVE.team2.score[0]}</p>
        <p>{propsVE.round > 15 ? propsVE.team2.score[1] : propsVE.team2.score[1] || '-'}</p>
        {propsVE.overtime && <p>{propsVE.team2.score[2]}</p>}
      </div>
      <div className={styles.factionIcon}>
        {
          propsVE.team2.role.map((value, index) => {
            return <div key={index}>
              <Image src={value ? counter : terrorists} />
            </div>
          })
        }
      </div>
      {!propsVE.isBottomBoth && [
        <div className={styles.nowScore} key='1'>{propsVE.team2.sum}</div>,
        <div className={styles.senteIcon} key='0'>
          {propsVE.team2.sente[0] ? <Image src={killone} /> : <span />}
          {propsVE.team2.sente[1] ? <Image src={kill5} /> : <span />}
          {propsVE.team2.sente[2] ? <Image src={killsix} /> : <span />}
        </div>
      ]}
      {
        propsVE.isBottomBoth && [
          <div className={styles.nowScore2} key='1'>
            <p className={
              propsVE.team2.sum > propsVE.team1.sum ? styles.colorYellow : styles.colorGray
            }>{propsVE.team2.sum}</p>
          </div>,
          <div className={styles.teamName} key='0'>
            <p>{propsVE.team2.name}</p>
          </div>
        ]
      }
    </div>
  </div>
}

export default CsGoNowStatus
