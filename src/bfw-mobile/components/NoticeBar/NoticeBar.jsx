import React from 'react'
import propTypes from 'prop-types'
import styles from './index.module.scss'
import notice from '../../assets/notice.png'
import { Image } from '../BasicsHtml/BasicsHtml.jsx'

function NoticeBar ({ txt }) {
  return <div className={styles.component}>
    <Image src={notice} />
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
