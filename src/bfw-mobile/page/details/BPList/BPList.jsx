import React from 'react'
import styles from './index.module.scss'
import dota from '../../../assets/ic_dota2.png'

function BPList (props) {
  return <div>
    <div className={styles.BPlist}>
      <div>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
      <p>P</p>
      <div>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
    <div className={styles.BPlist}>
      <div>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
      <p className={styles.green}>P</p>
      <div>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
  </div>
}

export default BPList
