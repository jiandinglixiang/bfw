import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { toFixed } from '../../../../../tool/util'

function formatOdd (odds) {
  let value1 = null
  let value2 = null
  if (Array.isArray(odds) && odds.length) {
    if (odds[0] && odds[0].value) {
      value1 = <span>{odds[0].name.includes(odds[0].value) ? odds[0].name : odds[0].value}</span>
    }
    if (odds[1] && odds[1].value) {
      value2 = <span>{odds[1].name.includes(odds[1].value) ? odds[1].name : odds[1].value}</span>
    }
    return <p>
      {value1} {odds[0] ? `${toFixed(odds[0].odds)}` : ''}
      <span> - </span>
      {value2} {odds[1] ? toFixed(odds[1].odds) : '-'}
    </p>
  }
  return <p>-</p>
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
          <p>{topObj.play_name[0] ? topObj.play_name[0] : '-'}</p>
          <p>{topObj.play_name[1] ? topObj.play_name[1] : '-'}</p>
          <p>{topObj.play_name[2] ? topObj.play_name[2] : '-'}</p>
        </div>
        <div>
          {formatOdd(topObj.odds[0])}
          {formatOdd(topObj.odds[1])}
          {formatOdd(topObj.odds[2])}
        </div>
      </div>
    </div>
  } catch (e) {
    return <div>-</div>
  }
}

export default PvpAnalysis
