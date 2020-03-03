import React from 'react'
import styles from './index.module.scss'
import { diffCatch, PropTypes } from '../../../../tool/util.js'

function rowItem (data) {
  data = diffCatch(data)({
    odds: [],
    play_name: []
  })
  return [0, 1, 2].map((value) => {
    const leftOdds = data.odds[value] && data.odds[value][0] && data.odds[value][0].odds
    const rightOdds = data.odds[value] && data.odds[value][1] && data.odds[value][1].odds
    return [
      data.play_name[value] || '-',
      `${leftOdds || ''} - ${rightOdds || ''}`
    ]
  })
}

function Page0 ({ oddList = [] }) {
  return <ul>
    {
      oddList.map((value, index) => {
        const list = rowItem(value)
        return <li className={styles.content} key={index}>
          <p className={styles.title}>{value.round}</p>
          <div className={styles.oddsTop}>
            <p>{list[0][0]}</p>
            <p>{list[1][0]}</p>
            <p>{list[2][0]}</p>
          </div>
          <div className={styles.oddsBottom}>
            <p>{list[0][1]}</p>
            <p>{list[1][1]}</p>
            <p>{list[2][1]}</p>
          </div>
        </li>
      })
    }
  </ul>
}

Page0.propTypes = {
  oddList: PropTypes.array
}
export default Page0
