import React from 'react'
import styles from './index.module.scss'

function BoutTitleBar () {
  return <div className={styles.boutTitle}>
    <p className={styles.first}>
      <span>第一局</span>
      <span>Isurus胜</span>
    </p>
    <div className={styles.last}>
      <span>查看详情</span>
    </div>
  </div>
}

export default BoutTitleBar
