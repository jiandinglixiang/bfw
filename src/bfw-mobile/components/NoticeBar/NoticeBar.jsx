import React from 'react'
import styles from './index.module.scss'
import notice from '../../assets/notice.png'
import { Image } from '../BasicsHtml/BasicsHtml.jsx'
import { useStoreMenu } from '../../page/home/UseStore.js'

function NoticeBar () {
  const [state] = useStoreMenu()
  return <div>
    <div className={styles.component}>
      <Image src={notice} />
      <div>
        <p>{state.radio}</p>
        <p>{state.radio}</p>
      </div>
    </div>
  </div>
}

export default NoticeBar
