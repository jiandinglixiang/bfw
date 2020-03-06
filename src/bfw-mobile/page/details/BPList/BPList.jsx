import React from 'react'
import styles from './index.module.scss'
import { diffCatch } from '../../../../tool/util.js'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function BPList (props) {
  const propsVe = diffCatch(props)({
    isBan: false,
    team1: [],
    team2: []
  })
  const noneAny = [
    <span key='1' />,
    <span key='2' />,
    <span key='3' />,
    <span key='4' />,
    <span key='5' />,
    propsVe.isBan && <span key='0' />
  ]
  const key = propsVe.isBan ? 'avatar' : 'hero_logo'
  return <div>
    <div className={styles.BPlist}>
      <div>
        {
          !propsVe.team1.length ? noneAny : propsVe.team1.map(function (value, index) {
            const srcc = value[key] || value.champion_img
            if (srcc) {
              return <Image key={index} src={srcc} />
            }
            return <span key={index} />
          })
        }
      </div>
      {propsVe.isBan ? <p>B</p> : <p className={styles.green}>P</p>}
      <div>
        {
          !propsVe.team2.length ? noneAny : propsVe.team2.map(function (value, index) {
            if (value[key]) {
              return <Image key={index} src={value[key]} />
            }
            return <span key={index} />
          })
        }
      </div>
    </div>
  </div>
}

export default BPList
