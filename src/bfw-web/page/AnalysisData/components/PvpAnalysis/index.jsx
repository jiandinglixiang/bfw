import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

function formatOdd (odds, names) {
  if (Array.isArray(odds) && odds.length && names) {
    if (names.includes('单双')) {
      return [
        '单双',
        `(${odds[0].name})${odds[0].odds} - (${odds[1].name})${odds[1].odds}`
      ]
    } else if (names.includes('大小')) {
      return [
        '总比分大小',
        `(${odds[0].name})${odds[0].odds} - (${odds[1].name})${odds[1].odds}`
      ]
    } else if (names.includes('让分')) {
      return [
        `让分${odds[0].name}${odds[0].value}`,
        `${odds[0].odds} - ${odds[0].odds}`
      ]
    } else {
      return [names, `${odds[0].odds} - ${odds[1].odds}`]
    }
  }

  return [names, '-']
}

// eslint-disable-next-line react/no-multi-comp
function PvpAnalysis (props) {
  const oddsList = props.oddsList ? props.oddsList : []
  const [active, setActive] = useState(0)
  useEffect(function () {
    setActive(0)
  }, [oddsList])
  try {
    const topObj = oddsList[active] || {}
    if (!Array.isArray(topObj.odds)) {
      topObj.odds = []
    }
    if (!Array.isArray(topObj.play_name)) {
      topObj.play_name = []
    }
    const odd1 = formatOdd(topObj.odds[0], topObj.play_name[0])
    const odd2 = formatOdd(topObj.odds[1], topObj.play_name[1])
    const odd3 = formatOdd(topObj.odds[2], topObj.play_name[2])
    return <div className={styles.appContent}>
      <ul className={styles.roundButton}>
        {oddsList.map((value, index) => {
          return <li
            onClick={() => setActive(index)}
            key={index}
            className={active === index ? styles.active : ''}>
            {value.round}
          </li>
        })}
      </ul>
      <div className={styles.roundScore}>
        <div>
          <p>{odd1[0]}</p>
          <p>{odd2[0]}</p>
          <p>{odd3[0]}</p>
        </div>
        <div>
          <p>{odd1[1]}</p>
          <p>{odd2[1]}</p>
          <p>{odd3[1]}</p>
        </div>
      </div>
    </div>
  } catch (e) {
    return <div>-</div>
  }
}

export default PvpAnalysis
