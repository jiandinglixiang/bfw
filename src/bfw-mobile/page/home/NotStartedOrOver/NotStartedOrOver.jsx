import React from 'react'
import styles from './index.module.scss'
import { formatDate, PropTypes } from '../../../../tool/util'
import GameTitle from '../GameTitle/GameTitle.jsx'
import MatchTitle from '../../../components/MatchTitle/MatchTitle.jsx'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import TryCatch from '../../../components/TryCatch/TryCatch.jsx'
import { routerDetails } from '../Underway/Underway.jsx'
import { useHistory } from 'react-router-dom'

function ScheduleBody (props) {
  const { gameData = {}, isOver = false } = props
  const history = useHistory()
  const timeTxt = formatDate(gameData.game_start_time, 'HH:mm')
  let timeStatus
  let pvpStatus
  if (isOver) {
    const score = gameData.score.split(/:|,/).map(value => parseInt(value))
    pvpStatus = <p>
      <span className={score[0] > score[1] ? styles.maximum : ''}>{score[0] || 0}</span>
      <span>-</span>
      <span className={score[1] > score[0] ? styles.maximum : ''}>{score[1] || 0}</span>
    </p>
    timeStatus = <p className={styles.over}>
      <span>{gameData.match_rules}</span><span>{timeTxt}</span><span>已结束</span>
    </p>
  } else {
    timeStatus = <p className={styles.notStart}>
      <span>{gameData.match_rules}</span><span>{timeTxt}</span><span>未开始</span>
    </p>
    pvpStatus = <span>VS</span>
  }
  return <li
    className={styles.notStartedAndOverContent}
    onClick={() => routerDetails(gameData, history)}
  >
    {timeStatus}
    <div className={styles.teamPvp}>
      <div className={styles.leftName}>
        <p>{gameData.host_team_name}</p>
        <img src={gameData.host_team_logo || defImg1} />
      </div>
      <div className={styles.center}>
        {pvpStatus}
      </div>
      <div className={styles.rightName}>
        <img src={gameData.guest_team_logo || defImg2} />
        <p>{gameData.guest_team_name}</p>
      </div>
    </div>
  </li>
}

function ScheduleList (props) {
  const { value = [], isOver = false } = props
  return value.map((value, index) => {
    return <ul key={index}>
      <TryCatch>
        <GameTitle typeId={value.game_type_id} matchName={value.game_name} />
        <ScheduleBody gameData={value} isOver={isOver} />
      </TryCatch>
    </ul>
  })
}

function NotStartedOrOver ({ data = [], isOver = false }) {
  return <div>
    {
      data.map((value, index) => {
        return <div key={index}>
          <MatchTitle gameName={value.day} />
          <ScheduleList value={value.schedule_list} isOver={isOver} />
        </div>
      })
    }
  </div>
}

NotStartedOrOver.propTypes = {
  data: PropTypes.array,
  isOver: PropTypes.bool,
}
ScheduleBody.propTypes = {
  gameData: PropTypes.object,
  isOver: PropTypes.bool,
}
export default NotStartedOrOver
