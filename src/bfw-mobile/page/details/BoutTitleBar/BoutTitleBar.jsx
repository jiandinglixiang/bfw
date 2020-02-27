import React from 'react'
import styles from './index.module.scss'
import { diffCatch } from '../../../../tool/util.js'

function BoutTitleBar (props) {
  const { nowTxt, winName } = diffCatch(props)({
    winName: '--',
    nowTxt: '小局'
  })
  return <div className={styles.boutTitle}>
    <p className={styles.first}>
      <span>{nowTxt}</span>
      <span>{winName}胜</span>
    </p>
    <div className={styles.last}>
      <span>查看详情</span>
    </div>
  </div>
}

export default BoutTitleBar
