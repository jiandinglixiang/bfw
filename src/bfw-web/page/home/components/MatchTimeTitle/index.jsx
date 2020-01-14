import React from 'react'
import styles from './index.module.scss'

function MatchTimeTitle (props) {
  return <div className={`${styles.appContent} ${props.showYellow ? styles.typeShow1 : ''}`}>{props.children}</div>
}

export default MatchTimeTitle
