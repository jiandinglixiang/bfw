import React, { useState } from 'react'
import styles from './index.module.scss'
import TopNav from '../../components/TopNav'
import FriendlyLink from '../../components/FriendlyLink'
import DownBar from '../../components/DownBar'

function AboutUs () {
  const [height] = useState(function () {
    return document.body.clientHeight - 349
  })
  return (<div className={styles.appContent}>
    <TopNav/>
    <div className={styles.homeBodyAbout} style={{ minHeight: `${height + 40}px` }}>
      <div className={styles.leftContent}>
        <p className={styles.title}>联系方式</p>
        <ul>
          <li className={styles.activeButton}>商务合作</li>
        </ul>
      </div>
      <div className={styles.rightContent}>
        <p className={styles.title}>商务合作</p>
        <ul style={{ minHeight: `${height}px` }}>
          <li>
            <p className={styles.name}>市场、合作邮箱：</p>
            <div className={styles.txt}>
              <p><a href='mailto:linhanying@sihemedia.com'>linhanying@sihemedia.com</a></p>
            </div>
          </li>
          <li>
            <p className={styles.name}>商务合作QQ：</p>
            <div className={styles.txt}>
              <p>1489403166</p>
            </div>
          </li>
          <li>
            <p className={styles.name}>联系电话：</p>
            <div className={styles.txt}>
              <p><a href='tel:15396019375'>15396019375</a> 刘先生</p>
              <p><a href='tel:17706925783'>17706925783</a> 林小姐</p>
            </div>
          </li>
          <li>
            <p className={styles.name}>地址：</p>
            <div className={styles.txt}>
              <p>福建省福州市海峡红坊创意园3#207</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <FriendlyLink/>
    <DownBar/>
  </div>)
}

export default AboutUs
