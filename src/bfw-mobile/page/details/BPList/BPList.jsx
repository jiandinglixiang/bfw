import React from 'react'
import styles from './index.module.scss'
import { diffCatch } from '../../../../tool/util.js'
import { Divs } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function BPList (props) {
  const propsVe = diffCatch(props)({
    gameId: 0,
    isBan: false,
    team1: [],
    team2: []
  })
  const noneAny = [0, 1, 2, 3, 4]
  let srcKey = ''
  if (propsVe.isBan) {
    noneAny.push(5)
    srcKey = 'avatar'
  } else {
    if (propsVe.gameId === 5) {
      srcKey = 'hero_logo'
    } else if (propsVe.gameId === 1) {
      srcKey = 'champion_img'
    }
  }
  return <div>
    <Divs className={[styles.BPlist, propsVe.isBan && styles.filterGray]}>
      <div>
        {
          noneAny.map(function (index) {
            const srcc = propsVe.team1[index] && propsVe.team1[index][srcKey]
            if (srcc) {
              return <div key={index} style={{ backgroundImage: `url(${srcc})` }} />
            }
            return <div key={index} />
          })
        }
      </div>
      {propsVe.isBan ? <p>B</p> : <p className={styles.green}>P</p>}
      <div>
        {
          noneAny.map(function (index) {
            const srcc = propsVe.team2[index] && propsVe.team2[index][srcKey]
            if (srcc) {
              return <div key={index} style={{ backgroundImage: `url(${srcc})` }} />
            }
            return <div key={index} />
          })
        }
      </div>
    </Divs>
  </div>
}

export default BPList
