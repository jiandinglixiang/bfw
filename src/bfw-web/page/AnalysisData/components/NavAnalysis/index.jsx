import React from 'react'
import styles from './index.module.scss'

function scrollToAnchor (anchorName) {
  if (anchorName) {
    // 找到锚点
    const anchorElement = document.getElementById(anchorName)
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
}

function NavAnalysis () {
  return <ul className={styles.appContent}>
    <li onClick={() => scrollToAnchor('nav-anchor-0')}>指数分析</li>
    <li onClick={() => scrollToAnchor('nav-anchor-1')}>对战交锋数据</li>
    <li onClick={() => scrollToAnchor('nav-anchor-1')}>历史对战数据统计</li>
    <li onClick={() => scrollToAnchor('nav-anchor-2')}>双方对阵列表</li>
    <li onClick={() => scrollToAnchor('nav-anchor-3')}>历史比赛列表</li>
    <li onClick={() => scrollToAnchor('nav-anchor-4')}>未来赛程</li>
    <li onClick={() => scrollToAnchor('nav-anchor-5')}>出场名单</li>
  </ul>
}

export default NavAnalysis
