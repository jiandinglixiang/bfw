import React from 'react'
import styles from './index.module.scss'
import PaginationCustom from '../PaginationCustom'
import MatchTimeTitle from '../../../home/components/MatchTimeTitle'
import TableTitle from '../TableTitle'
import { formatDate } from '../../../../../tool/util'
import defaultImg from '../../../../assets/default_team_40.png'

function FuturePvpList (props) {
  const { futurePvp, tameName } = props
  const listItem = futurePvp.map((value, index) => {
    const confrontation = value.confrontation || {}

    return <div className={styles.appContent} key={index}>
      <div className={styles.gameNameAndTime}>
        <p>
          <span>{value.match_name}</span>
          <span>{value.match_rules}</span>
        </p>
        <p>{formatDate(value.game_start_time)}</p>
      </div>
      <div className={styles.tamePvpName}>
        <img src={confrontation.icon || defaultImg} alt=''/>
        <p>{confrontation.name}</p>
      </div>
    </div>
  })
  return <div>
    <MatchTimeTitle showYellow>{tameName}</MatchTimeTitle>
    <TableTitle title={['联赛', '对阵']}/>
    <PaginationCustom listItem={listItem} limit={5}/>
  </div>
}

export default FuturePvpList
