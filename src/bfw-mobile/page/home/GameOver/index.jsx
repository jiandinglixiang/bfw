import React, { useState } from 'react'
import styles from './index.module.scss'
import { PropTypes } from '../../../../tool/util'
import MatchItem from '../MatchItem/MatchItem'
import MatchTitle from '../../../components/MatchTitle/MatchTitle'

function GameOver ({ data = [] }) {
  const [moreShow, setMoreShow] = useState(false)
  if (!data.length) return null
  const showMore = !moreShow && data.length > 5
  const matchList = showMore ? data.slice(0, 5) : data
  return <div className={styles.appContent}>
    <MatchTitle title='已结束的比赛' />
    <ul>
      {

        matchList.map(function (value, index) {
          return <MatchItem key={index} data={value} mode='2' />
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

GameOver.propTypes = {
  data: PropTypes.array,
}

export default GameOver
