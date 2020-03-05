import styles from './index.module.scss'
import React from 'react'
import { PropTypes } from '../../../tool/util'

export const fixedTopContentClass = styles.content

function MatchTitle ({ gameName = '' }) {
  try {
    return <div className={styles.content}>
      <div className={styles.fixedTop}>
        <p>{gameName}</p>
      </div>
    </div>
  } catch (e) {
    return <div className={styles.content} />
  }
}

MatchTitle.propTypes = {
  gameName: PropTypes.string
}
export default MatchTitle
