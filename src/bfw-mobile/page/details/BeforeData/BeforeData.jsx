import React from 'react'
import PvpTitle from '../PvpTitle/PvpTitle.jsx'
import styles from './index.module.scss'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import { diffCatch } from '../../../../tool/util.js'

function BeforeData (props) {
  const propsVe = diffCatch(props)({
    matchAnalysis: [],
    matchList: {}
  })
  const info1Ve = diffCatch(propsVe.matchAnalysis[0])({
    win_info: {},
    team_natural_info: {},
    team_restrain_info: {}
  })
  const info2Ve = diffCatch(propsVe.matchAnalysis[1])({
    win_info: {},
    team_natural_info: {},
    team_restrain_info: {}
  })
  return <div>
    <PvpTitle title='赛前分析' />
    <div className={styles.content}>
      <div className={styles.title}>
        <p>战队</p>
        <p>天敌(胜率)</p>
        <p>克制胜率</p>
        <p>连胜</p>
      </div>
      <div className={styles.rowList}>
        <div>
          <img src={propsVe.matchList.host_team_logo || defImg1} />
          <p>{propsVe.matchList.host_team_name}</p>
        </div>
        <div>
          <img src={info1Ve.team_natural_info.icon || defImg1} />
          <p className={styles.gray}>---%</p>
          <p>{info1Ve.team_natural_info.full_name || '--'}</p>
        </div>
        <div>
          <img src={info1Ve.team_restrain_info.icon || defImg1} />
          <p className={styles.green}>---%</p>
          <p>{info1Ve.team_restrain_info.name || '--'}</p>
        </div>
        <div>
          <p className={styles.blue}>
            {info1Ve.win_info.winning_streak > 0 ? 'x' + info1Ve.win_info.num : null}
          </p>
        </div>
      </div>
      <div className={styles.rowList}>
        <div>
          <img src={propsVe.matchList.guest_team_logo || defImg2} />
          <p>{propsVe.matchList.guest_team_name}</p>
        </div>
        <div>
          <img src={info2Ve.team_natural_info.icon || defImg1} />
          <p className={styles.yellow}>---%</p>
          <p>{info2Ve.team_natural_info.full_name || '--'}</p>
        </div>
        <div>
          <img src={info2Ve.team_restrain_info.icon || defImg1} />
          <p className={styles.green}>---%</p>
          <p>{info2Ve.team_restrain_info.name || '--'}</p>
        </div>
        <div>
          <p className={styles.blue}>
            {info2Ve.win_info.winning_streak > 0 ? 'x' + info2Ve.win_info.num : null}
          </p>
        </div>
      </div>
    </div>
  </div>
}

export default BeforeData
