import React, { useState } from 'react'
import styles from './index.module.scss'

function PaginationCustom (props) {
  const [top, setTop] = useState(0)
  const limit = props.limit || 10
  const length = Array.isArray(props.listItem) && props.listItem.length
  if (!length) {
    return <div className={styles.noList} style={{ minHeight: `${limit * 61}px` }} />
  }
  return (<div className={styles.appContent}>
    <div style={{ minHeight: `${limit * 61}px` }}>
      {props.listItem.slice(top * limit, top * limit + limit)}
    </div>
    <div className={styles.signLink}>
      {top > 0 ? <p onClick={() => setTop(top - 1)}>{'<< '}上一页</p> : <p />}
      <p>第{top + 1}页</p>
      {length - (top * limit + limit) > 0 ? <p onClick={() => setTop(top + 1)}>下一页 >></p> : <p />}
    </div>
  </div>)
}

export default PaginationCustom
