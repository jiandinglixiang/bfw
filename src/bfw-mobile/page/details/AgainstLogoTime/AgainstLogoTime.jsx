import React from 'react'
import styles from './index.module.scss'
import dota from '../../../assets/ic_dota2.png'
import tianhui from '../../../assets/tianhui_type2.png'
import yemo from '../../../assets/nightdemon_type2.png'

function AgainstLogoTime (props) {
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div><img src={yemo} /></div>
        <div className={styles.logo}><img src={dota} /></div>
        <b>6</b>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
    <div className={styles.center}>
      {/*    <div className={styles.boutTime}>
        <p>
          第二局56:19
        </p>
      </div>
      */}
      {/*      <div className={styles.overScore}>
        <p>88</p>
        <b>-</b>
        <p>88</p>
      </div>
      <div className={styles.overTxt}><p>已结束</p></div>
      */}
      {/*      <div className={styles.middle}>
        <p className={styles.notStarted}><span>未开始</span><span>08:00</span></p>
      </div> */}
      <div className={styles.middle}>
        <p className={styles.boutTime}>
          第二局56:19
        </p>
      </div>
      <div className={styles.low}>
        <p className={styles.notStarted}><span>2019-12-13</span><span>BO5</span></p>
      </div>
      <div className={`${styles.high} ${styles.middle} ${styles.low}`}>
        <p className={styles.difference}><span>差-11.3</span></p>
      </div>
    </div>
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <b className={styles.colorYellow}>6</b>
        <div className={styles.logo}><img src={dota} /></div>
        <div className={styles.icon2}><img src={tianhui} /></div>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
  </div>
}

export default AgainstLogoTime
