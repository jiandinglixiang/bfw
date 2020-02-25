import styles from './index.module.scss'
import React from 'react'
import { PropTypes } from '../../../tool/util'

export const fixedTopClass = styles.content

function MatchTitle ({ title }) {
  try {
    return <div className={styles.content}>
      <div className={styles.fixedTop}>
        <p>{title}</p>
      </div>
    </div>
  } catch (e) {
    return <div className={styles.content} />
  }
}

MatchTitle.propTypes = {
  title: PropTypes.string,
}
export default MatchTitle
