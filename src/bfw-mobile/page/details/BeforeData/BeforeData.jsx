import React from 'react'
import PvpTitle from '../PvpTitle/PvpTitle.jsx'
import styles from './index.module.scss'
import logo from '../../../assets/ic_dota2.png'

function BeforeData () {
  return <div>
    <PvpTitle title='赛前分析' />
    <div className={styles.content}>
      <div className={styles.title}>
        <p>战队</p>
        <p>天敌(胜率)</p>
        <p>克制胜率</p>
        <p>连胜</p>
      </div>
      <div className={styles.rowList}>
        <div><img src={logo} /><p>UOL</p></div>
        <div><img src={logo} /><p className={styles.gray}>---%</p><p>UOL</p></div>
        <div><img src={logo} /><p className={styles.green}>25%</p><p>UOL</p></div>
        <div><p className={styles.blue}>UOL</p></div>
      </div>
      <div className={styles.rowList}>
        <div><img src={logo} /><p>UOL</p></div>
        <div><img src={logo} /><p className={styles.yellow}>---%</p><p>UOL</p></div>
        <div><img src={logo} /><p className={styles.green}>25%</p><p>UOL</p></div>
        <div><p className={styles.blue}>UOL</p></div>
      </div>
    </div>
  </div>
}

export default BeforeData
