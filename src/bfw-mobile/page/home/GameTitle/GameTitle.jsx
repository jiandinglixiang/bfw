import React from 'react'
import { PropTypes } from '../../../../tool/util.js'
import styles from './index.module.scss'

function GameTitle (props) {
  const {
    typeId = '0',
    matchName = '加载中...'
  } = props
  return <li className={`${styles.content} ${styles['background-' + typeId]}`}>{matchName}</li>
}

GameTitle.propTypes = {
  typeId: PropTypes.string,
  matchName: PropTypes.string
}

export default GameTitle
