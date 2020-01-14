import React from 'react'
import styles from './index.module.scss'

function TableTitle (props) {
  return <div className={styles.appContent}>
    {(props.title || []).map((val, key) => {
      return <p key={key}>{val}</p>
    })}
  </div>
}

export default TableTitle
