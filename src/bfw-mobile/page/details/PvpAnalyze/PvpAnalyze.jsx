import React from 'react'
import styles from './index.module.scss'
import { diffCatch, PropTypes, toFixed } from '../../../../tool/util'

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

function PvpAnalyze ({ oddList = [] }) {
  // oddList.map((value, index) => {
  //   return [0, 1, 2].map(function (value2, index2) {
  //     const one = value.odds[index2] || [{}, {}]
  //     // let left = ''
  //     let leftOdds = ''
  //     // let right = ''
  //     let rightOdds = ''
  //     if (one[0] && one[0].odds) {
  //       // left = (one[0].name || '').includes(one[0].value) ? one[0].name : one[0].value || ''
  //       leftOdds = toFixed(one[0].odds)
  //     }
  //     if (one[1] && one[1].odds) {
  //       // right = (one[1].name || '').includes(one[1].value) ? one[1].name : one[1].value || ''
  //       rightOdds = toFixed(one[1].odds)
  //     }
  //     return [
  //       value.play_name[index2] || ' - ',
  //       `${leftOdds} - ${rightOdds}`,
  //     ]
  //   })
  // })
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
    {/*    <li className={styles.content}>
      <p className={styles.title}>全局</p>
      <div className={styles.oddsTop}>
        {
          oddsArr && oddsArr[active].map(function (value, index) {
            return <p key={index}>{value[0]}</p>
          })
        }
      </div>
      <div className={styles.oddsBottom}>
        {
          oddsArr && oddsArr[active].map(function (value, index) {
            return <p key={index}>{value[1]}</p>
          })
        }
      </div>
    </li>
    <li className={styles.content}>
      <p className={styles.title}>全局</p>
      <div className={styles.oddsTop}>
        {
          oddsArr && oddsArr[active].map(function (value, index) {
            return <p key={index}>{value[0]}</p>
          })
        }
      </div>
      <div className={styles.oddsBottom}>
        {
          oddsArr && oddsArr[active].map(function (value, index) {
            return <p key={index}>{value[1]}</p>
          })
        }
      </div>
    </li>
    <li className={styles.content}>
      <p className={styles.title}>全局</p>
      <div className={styles.oddsTop}>
        {
          oddsArr && oddsArr[active].map(function (value, index) {
            return <p key={index}>{value[0]}</p>
          })
        }
      </div>
      <div className={styles.oddsBottom}>
        {
          oddsArr && oddsArr[active].map(function (value, index) {
            return <p key={index}>{value[1]}</p>
          })
        }
      </div>
    </li>
    */}
  </ul>
}

PvpAnalyze.propTypes = {
  oddList: PropTypes.array
}
export default PvpAnalyze
