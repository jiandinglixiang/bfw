import React, { useState } from 'react'
import styles from './index.module.scss'
import { dayName, Moment, PropTypes } from '../../../../tool/util'
import MatchItem from '../MatchItem/MatchItem'
import MatchTitle from '../../../components/MatchTitle/MatchTitle'

export function dayCallInit (time, length) {
  return function () {
    const date = Moment(time)
    let str = ''
    if (date.isSame(dayName[0])) {
      // 昨天
      str = '昨天'
    } else if (date.isSame(dayName[1])) {
      // 今天
      str = '今天'
    } else if (date.isSame(dayName[2])) {
      // 明天
      str = '明天'
    }
    return `${date.format('MM月DD日')} ${str}  ${length}场比赛`
  }
}

function InPlay ({ data = [] }) {
  const [moreShow, setMoreShow] = useState(false)
  if (!data.length) return null
  const showMore = !moreShow && data.length > 5
  const matchList = showMore ? data.slice(0, 5) : data
  return <div className={styles.content}>
    <MatchTitle title='正在进行的比赛' />
    <ul>
      {
        matchList.map(function (value, index) {
          return <MatchItem key={index} data={value} mode='1' />
        })
      }
      {showMore
        ? <li
          className={styles.moreList}
          onClick={() => setMoreShow(!moreShow)}>点击展开更多比赛</li>
        : null}
    </ul>
  </div>
}

InPlay.propTypes = {
  data: PropTypes.array
}

export default InPlay
