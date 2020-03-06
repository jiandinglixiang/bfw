import React from 'react'
import { useDiffCatch } from '../../../../tool/util.js'
import styles from './index.module.scss'
import normal from '../../../assets/score_ongoing_normal.png'
import { Image, Pars, Text } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function GameTitle (props) {
  const propsVE = useDiffCatch(props)({
    time: '00:00',
    gameName: '加载中...',
    icon: ''
  })
  return (
    <li className={styles.content}>
      <Image src={[propsVE.icon, normal]} />
      <Pars>{propsVE.gameName}</Pars>
      <Text>{propsVE.time}</Text>
    </li>
  )
}

export default GameTitle
