import React from 'react'
import styles from './index.module.scss'
import dota from '../../../assets/ic_dota2.png'

function CsGoNowStatus () {
  return <div className={styles.container}>
    <div className={styles.flanks1}>
      {/*      <div className={styles.senteIcon}>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
      <div className={styles.nowScore}>9</div> */}
      <div className={styles.teamName}>
        <p>Isuru </p>
      </div>
      <div className={styles.nowScore2}>
        <p className={styles.colorYellow}>99</p>
      </div>
      <div className={styles.factionIcon}>
        <div><img src={dota} /></div>
        <div><img src={dota} /></div>
      </div>
      <div className={styles.overScore}>
        <p>19</p>
        <p>1</p>
        <p>1-</p>
      </div>
    </div>
    <div className={styles.center}>
      <p>上半场</p>
      <p>下半场</p>
      <p>下半场</p>
    </div>
    <div className={styles.flanks2}>
      <div className={styles.overScore}>
        <p>19</p>
        <p>19</p>
        <p>1-</p>
      </div>
      <div className={styles.factionIcon}>
        <div><img src={dota} /></div>
        <div><img src={dota} /></div>
      </div>
      {/*      <div className={styles.nowScore}>99</div>
      <div className={styles.senteIcon}>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div> */}
      <div className={styles.nowScore2}>
        <p>99</p>
      </div>
      <div className={styles.teamName}>
        <p>IsurusIsurusIsurusIsurusIsurusIsurusIsurusIsurusIsurusIsurus</p>
      </div>
    </div>
  </div>
}

export default CsGoNowStatus
