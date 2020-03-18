import React from 'react'
import styles from './index.module.scss'
import { diffCatch, formatDate3, PropTypes, useDiffCatch } from '../../../../tool/util'
import GameTitle from '../GameTitle/GameTitle.jsx'
import MatchTitle from '../../../components/MatchTitle/MatchTitle.jsx'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import { routerDetails } from '../Underway/Underway.jsx'
import { useHistory } from 'react-router-dom'
import { Divs, Image, Text } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function ScheduleBody (props) {
  const { gameData, isOver } = diffCatch(props)({
    gameData: {
      score: ''
    },
    isOver: false
  })
  const history = useHistory()
  let pvpStatus
  if (isOver) {
    const score = gameData.score.split(/:|,/).map(v => (v && parseInt(v)) || 0)
    pvpStatus = (
      <div className={styles.center}>
        <p className={styles.gameOverTxt}>已结束</p>
        <p className={styles.gameOver}>
          <Text className={score[0] > score[1] && styles.maximum}>{score[0]}</Text>
          <span>-</span>
          <Text className={score[1] > score[0] && styles.maximum}>{score[1]}</Text>
        </p>
      </div>)
  } else {
    pvpStatus = <Divs className={[styles.center, styles.notStarted]}>
      <p>未开始</p>
      <p>VS</p>
    </Divs>
  }
  return (
    <li className={styles.notStartedAndOverContent} onClick={() => routerDetails(gameData, history)}>
      <div className={styles.teamPvp}>
        <div className={styles.leftName}>
          <p>{gameData.host_team_name}</p>
          <Image src={[gameData.host_team_logo, defImg1]} />
        </div>
        {pvpStatus}
        <div className={styles.rightName}>
          <Image src={[gameData.guest_team_logo, defImg2]} />
          <p>{gameData.guest_team_name}</p>
        </div>
      </div>
    </li>)
}

function ScheduleList (props) {
  const propsVE = useDiffCatch(props)({
    value: [],
    isOver: false
  })
  return propsVE.value.map((value, index) => {
    const time = formatDate3(value.game_start_time)
    return <ul key={index}>
      <GameTitle
        gameId={value.game_type_id}
        gameName={value.game_name}
        icon={value.icon}
        time={`${value.match_rules} ${time}`}
      />
      <ScheduleBody gameData={value} isOver={propsVE.isOver} />
    </ul>
  })
}

function NotStartedOrOver (props) {
  const propsVE = useDiffCatch(props)({
    data: [],
    isOver: false
  })
  return <div>
    {
      propsVE.data.map((value, index) => {
        const valueVE = diffCatch(value)({ schedule_list: [] })
        return <div key={index}>
          <MatchTitle gameName={valueVE.day} />
          <ScheduleList value={valueVE.schedule_list} isOver={propsVE.isOver} />
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
