import React from 'react'
import styles from './index.module.scss'
import { PropTypes } from '../../../../tool/util.js'

function TipTitle (props) {
  const { title = '' } = props
  return <div className={styles.content}>
    <p>{title}</p>
  </div>
}

TipTitle.propTypes = {
  title: PropTypes.string
}
export default TipTitle
