import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import { PropTypes, toFixed } from '../../../../tool/util'

function PvpAnalyze ({ oddList = [] }) {
  const [active, setActive] = useState(0)
  const { titleArr, oddsArr } = useMemo(function () {
    const titleArr = []
    const oddsArr = oddList.map(function (value, index) {
      titleArr.push({
        round: value.round,
        index
      })
      return [0, 1, 2].map(function (value2, index2) {
        const one = value.odds[index2] || [{}, {}]
        // let left = ''
        let leftOdds = ''
        // let right = ''
        let rightOdds = ''
        if (one[0] && one[0].odds) {
          // left = (one[0].name || '').includes(one[0].value) ? one[0].name : one[0].value || ''
          leftOdds = toFixed(one[0].odds)
        }
        if (one[1] && one[1].odds) {
          // right = (one[1].name || '').includes(one[1].value) ? one[1].name : one[1].value || ''
          rightOdds = toFixed(one[1].odds)
        }
        return [
          value.play_name[index2] || ' - ',
          `${leftOdds} - ${rightOdds}`,
        ]
      })
    })
    return {
      titleArr,
      oddsArr
    }
  }, [oddList])
  // console.log(titleArr, oddsArr)
  try {
    return <ul>
      <li className={styles.content}>
        <p className={styles.title}>全局</p>
        <div className={styles.oddsTop}>
          {
            oddsArr[active].map(function (value, index) {
              return <p key={index}>{value[0]}</p>
            })
          }
        </div>
        <div className={styles.oddsBottom}>
          {
            oddsArr[active].map(function (value, index) {
              return <p key={index}>{value[1]}</p>
            })
          }
        </div>
      </li>
      <li className={styles.content}>
        <p className={styles.title}>全局</p>
        <div className={styles.oddsTop}>
          {
            oddsArr[active].map(function (value, index) {
              return <p key={index}>{value[0]}</p>
            })
          }
        </div>
        <div className={styles.oddsBottom}>
          {
            oddsArr[active].map(function (value, index) {
              return <p key={index}>{value[1]}</p>
            })
          }
        </div>
      </li>
      <li className={styles.content}>
        <p className={styles.title}>全局</p>
        <div className={styles.oddsTop}>
          {
            oddsArr[active].map(function (value, index) {
              return <p key={index}>{value[0]}</p>
            })
          }
        </div>
        <div className={styles.oddsBottom}>
          {
            oddsArr[active].map(function (value, index) {
              return <p key={index}>{value[1]}</p>
            })
          }
        </div>
      </li>
    </ul>
  } catch (e) {
    return <div className={styles.content} />
  }
}

PvpAnalyze.propTypes = {
  oddList: PropTypes.array
}
export default connect(function (state) {
  return {
    oddList: state.details.matchList.odds_list
  }
})(PvpAnalyze)
