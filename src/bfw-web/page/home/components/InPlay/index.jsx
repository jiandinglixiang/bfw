import React from 'react'
import styles from './index.module.scss'
import defaultImg from '../../../../assets/default_team_40.png'
import { initOddAndLogo, inning, searchFormat, toFixed } from '../../../../../tool/util'
import { connect } from 'react-redux'

function InPlay (props) {
  const { startMatchList } = props
  const scoreList = startMatchList.score_list || []
  let gameRound = 1
  if (scoreList[scoreList.length - 1]) {
    gameRound = scoreList[scoreList.length - 1].game_no * 1 + 1 > startMatchList.round_total ? scoreList[scoreList.length - 1].game_no : scoreList[scoreList.length - 1].game_no * 1 + 1
  }
  const [score1, score2] = [[], []]
  if (startMatchList.round_total) {
    (function () {
      const scoreList = startMatchList.score_list
      for (let i = 0; i < startMatchList.round_total; i++) {
        if (scoreList[i]) {
          const win = i === scoreList.length - 1 ? false : !!scoreList[i].win
          score1.push({ team: scoreList[i].team1, win })
          score2.push({ team: scoreList[i].team2, win })
        } else {
          score1.push({ team: i ? '-' : '0', win: false })
          score2.push({ team: i ? '-' : '0', win: false })
        }
      }
    })()
  }
  const tameData = initOddAndLogo(startMatchList, { score1, score2 })

  return (<div className={styles.appContent}>
    <div className={styles.matchTitle}>
      <img src={startMatchList.icon || defaultImg} alt='' />
      <p>{startMatchList.game_name}</p>
      <p>{startMatchList.match_rules} / {inning(gameRound)}</p>
      {/* <p> */}
      {/*    {distanceNow(startMatchList.game_start_time)}’ */}
      {/* </p> */}
    </div>
    <div
      className={styles.tameDetails}
      onClick={() => {
        window.open(`/#/analysisData${searchFormat({
          smid: startMatchList.smid,
          gameName: startMatchList.game_type_name,
          matchName: startMatchList.game_name,
          tamePvp: `${startMatchList.host_team_name} VS ${startMatchList.guest_team_name}`,
          gameId: startMatchList.game_type_id
        })}`, '_blank')
      }}
    >
      {
        tameData.map((value, index) => {
          return <div className={styles.tameMatchOdd} key={index}>
            <img src={value.logo || defaultImg} alt='' />
            <div className={styles.tameName}>
              <p>{value.name}</p>
              <p>指数:{toFixed(value.odds)}</p>
            </div>
            <div className={styles.oddArray}>
              {value.score && value.score.map((value1, index1) => {
                return <div
                  key={index1}
                  className={value1.win ? styles.GameOver : ''}>{value1.team}</div>
              })}
            </div>
          </div>
        })
      }
    </div>
  </div>)
}

export default connect(null, null)(InPlay)
