import React from 'react'
import styles from './index.module.scss'
import { diffCatch, PropTypes } from '../../../../tool/util.js'

function rowItem (data) {
  data = diffCatch(data)({
    odds: [],
    play_name: []
  })
  return [0, 1, 2].map((index) => {
    const leftOdds = (data.odds[index] && data.odds[index][0]) || {}
    const rightOdds = (data.odds[index] && data.odds[index][1]) || {}
    const names = data.play_name[index] + leftOdds.name + rightOdds.name
    if (names.includes('单双')) {
      return [
        '单双',
        `(${leftOdds.name[0]})${leftOdds.odds} - (${rightOdds.name[0]})${rightOdds.odds}`
      ]
    } else if (names.includes('大小')) {
      return [
        '总比分大小',
        `(${leftOdds.name[0]})${leftOdds.odds} - (${rightOdds.name[0]})${rightOdds.odds}`
      ]
    } else if (names.includes('让分')) {
      return [
        `让分${leftOdds.name}${leftOdds.value}`,
        `${leftOdds.odds} - ${rightOdds.odds}`
      ]
    }
    return [
      data.play_name[index] || '-',
      `${leftOdds.odds || ''} - ${rightOdds.odds || ''}`
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
