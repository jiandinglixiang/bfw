import React from 'react'
import propTypes from 'prop-types'
import styles from './index.module.scss'
import notice from '../../assets/notice.png'

function NoticeBar ({ txt }) {
  return <div className={styles.component}>
    <img src={notice} alt='' />
    <div>
      <p>{txt}</p>
      <p>{txt}</p>
    </div>
  </div>
}

NoticeBar.propTypes = {
  txt: propTypes.oneOfType([
    propTypes.string,
    propTypes.element,
  ]),
}
export default NoticeBar
