import styles from '../TabsContainer/index.module.scss'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function CountDown ({ cbk }) {
  const [ss, setSS] = useState(10)
  useEffect(function () {
    let t = null

    function updateTime () {
      clearTimeout(t)
      setSS(ti => {
        if (!ti) {
          cbk()
          return 10
        }
        return ti - 1
      })
      t = setTimeout(updateTime, 1000)
    }

    t = setTimeout(updateTime, 1000)
    return function () {
      clearTimeout(t)
    }
  }, [cbk])
  return <p className={styles.timeUpdate}>刷新倒计时<span>{ss}</span>S</p>
}

CountDown.propTypes = {
  cbk: PropTypes.func,
}
export default CountDown
