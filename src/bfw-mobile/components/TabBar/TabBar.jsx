import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

function TabBar () {
  return <div className={styles.content}>
    <div className={styles.body}>
      <NavLink exact to='/' activeClassName={styles.selected}>
        <p>比分</p>
      </NavLink>
      <NavLink
        to='/mine'
        isActive={(match, location) => {
          // only consider an event active if its event id is an odd number
          return ['/mine', '/login'].includes(location.pathname)
        }}
        activeClassName={styles.selected}>
        <p>我的</p>
      </NavLink>
    </div>
  </div>
}

export default TabBar
