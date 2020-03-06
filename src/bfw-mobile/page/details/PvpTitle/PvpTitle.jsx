import React from 'react'
import { PropTypes } from '../../../../tool/util'
import titleImg from '../../../assets/title_data.png'
import styles from './index.module.scss'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function PvpTitle ({ title }) {
  return <div className={styles.content}>
    <p>{title}</p>
    <Image src={titleImg} alt='' />
  </div>
}

PvpTitle.propTypes = {
  title: PropTypes.string,
}
export default PvpTitle
