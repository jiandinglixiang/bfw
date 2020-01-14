import React from 'react'
import MatchTimeTitle from '../../../home/components/MatchTimeTitle'
import styles from './index.module.scss'
import defaultImg from '../../../../assets/default_team_40.png'

function OutMemberList (props) {
  const { players, tameName } = props
  return <div>
    <MatchTimeTitle>{tameName}</MatchTimeTitle>
    <div className={`${styles.appContent} ${players.length ? '' : styles.noAnyOne}`}>
      {
        players.map((value, index) => {
          return <div key={index}>
            <img src={value.photo || defaultImg} alt=''/>
            <p>{value.name || value.alias || ''}</p>
            <p>{value.country_name || '未知'}</p>
          </div>
        })
      }
    </div>
  </div>
}

export default OutMemberList
