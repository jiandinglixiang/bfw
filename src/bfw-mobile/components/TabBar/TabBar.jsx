import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

function TabBar () {
  return <div className={styles.content}>
    <div className={styles.body}>
      <NavLink exact to='/' activeClassName={styles.selected}>
        <p>比分</p>
      </NavLink>
      <NavLink to='/mine' activeClassName={styles.selected}>
        <p>我的</p>
      </NavLink>
    </div>
  </div>
}

export default TabBar
