import React from 'react'
import styles from './index.module.scss'
import logo from '../../../assets/ic_dota2.png'
import strating from '../../../assets/live_30.gif'
import { defCatch, formatDate, inning, PropTypes, toBigNumber } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'

function scoreListReduce (scoreList = []) {
  return scoreList.reduce(function (sum, top = {}) {
    // 计算进行中总比分  使首页比分取值同步
    sum[0] = (top.team1 || 0) + sum[0]
    sum[1] = (top.team2 || 0) + sum[1]
    return sum
  }, [0, 0])
}

function LeftTime ({ gameData = {} }) {
  const timeTxt = formatDate(gameData.game_start_time, 'HH:mm')
  return <p className={styles.leftTime}>
    <img src={strating} />
    <span>{gameData.match_rules}</span>
    <span>{timeTxt}</span>
  </p>
}

function FullScore ({ scoreList = [] }) {
  const score = scoreListReduce(scoreList)
  return <p><span>{score[0]}</span><span>-</span><span>{score[1]}</span></p>
}

function HeroList ({ arrIcon = [] }) {
  return [0, 1, 2, 3, 4].map(index => {
    if (arrIcon[index] && arrIcon[index].hero_logo) {
      return <img key={index} src={arrIcon[index].hero_logo} />
    }
    return <span key={index} />
  })
}

function UnderwayDota ({ gameData = {} }) {
  gameData = defCatch(gameData)({
    team1_more_attr: {
      other_more_attr: {},
      players: []
    },
    team2_more_attr: {
      other_more_attr: {},
      players: []
    },
    poor_economy: {
      gold: 0,
      time: 0
    },
    round: 0
  })
  const moreAttr1 = gameData.team1_more_attr.other_more_attr
  const moreAttr2 = gameData.team2_more_attr.other_more_attr
  const poorEconomy = toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1)
  const nowInnings = inning(parseInt(gameData.round))
  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.dotaMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:{poorEconomy}</p>
      </div>
      <div className={styles.dotaMatchBlue} />
    </div>
    <div className={styles.formation}>
      <div className={styles.nameAndKill}>
        <p>{gameData.host_team_name}</p>
        <div>
          <span className={moreAttr1.is_first_blood > 0 ? styles.firstBloodIcon : ''} />
          <span className={moreAttr1.is_ten_kills > 0 ? styles.kill10Icon : ''} />
        </div>
      </div>
      <div className={styles.teamLogo}>
        <img src={gameData.host_team_logo || defImg1} />
      </div>
      <div className={styles.matchScore}>
        <FullScore scoreList={gameData.score_list} />
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <img src={gameData.guest_team_logo || defImg2} />
      </div>
      <div className={styles.nameAndKill2}>
        <p>{gameData.guest_team_name}</p>
        <div>
          <span className={moreAttr2.is_ten_kills > 0 ? styles.kill10Icon : ''} />
          <span className={moreAttr2.is_first_blood > 0 ? styles.firstBloodIcon : ''} />
        </div>
      </div>
    </div>
    <div className={styles.pvpNowStatus}>
      <div className={styles.teamIcon1}>
        <HeroList arrIcon={gameData.team1_more_attr.players} />1111
      </div>
      <p className={styles.score}>{gameData.team1_score}</p>
      <div className={styles.center}>
        <p>{nowInnings} 15’</p>
      </div>
      <p className={styles.score}>{gameData.team2_score}</p>
      <div className={styles.teamIcon2}>
        <HeroList arrIcon={gameData.team2_more_attr.players} />123
      </div>
    </div>
  </div>
}

function UnderwayCsGo () {
  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <p className={styles.leftTime}>
        <img src={strating} />
        <span>BO5</span>
        <span>12:00</span>
      </p>
      <div className={styles.dotaMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:+15.0</p>
      </div>
      <div className={styles.lolMatchBlue} />
    </div>
    <div className={styles.formation}>
      {<p className={styles.teamName1}>
        1Winning GamiWinning GamiWinning GamiWinning Gami
      </p> || <div className={styles.nameAndKill}>
        <p>Winning GamiWinning Gami</p>
        <div>
          <img src={logo} />
          <img src={logo} />
        </div>
      </div>}
      <div className={styles.teamLogo}>
        <img src={logo} />
      </div>
      <div className={styles.matchScore}>
        <p><span>1</span><span>-</span><span>1</span></p>
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <img src={logo} />
      </div>
      {<p className={styles.teamName2}>
        Winning GamiWinning GamiWinning GamiWinning Gami
      </p> || <div className={styles.nameAndKill2}>
        <p>Winning GamiWinning Gami</p>
        <div>
          <img src={logo} />
          <img src={logo} />
        </div>
      </div>}
    </div>
    <div className={styles.pvpNowStatus}>
      {<div className={styles.csgoScore}>
        <p><span>上半场</span><span>11-4</span></p>
      </div> || <div className={styles.teamIcon1}>
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
      </div>}
      <p className={styles.score}>18</p>
      <div className={styles.center}>
        <p>第一局 01‘</p>
        <p>第一局 01‘</p>
      </div>
      <p className={styles.score}>16</p>
      {<div className={styles.csgoScore}>
        <p><span>上半场</span><span>11-4</span></p>
      </div> || <div className={styles.teamIcon2}>
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
      </div>}
    </div>
  </div>
}

function UnderwayLol () {
  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <p className={styles.leftTime}>
        <img src={strating} />
        <span>BO5</span>
        <span>12:00</span>
      </p>
      <div className={styles.dotaMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:+15.0</p>
      </div>
      <div className={styles.lolMatchBlue} />
    </div>
    <div className={styles.formation}>
      {<p className={styles.teamName1}>
        1Winning GamiWinning GamiWinning GamiWinning Gami
      </p> || <div className={styles.nameAndKill}>
        <p>Winning GamiWinning Gami</p>
        <div>
          <img src={logo} />
          <img src={logo} />
        </div>
      </div>}
      <div className={styles.teamLogo}>
        <img src={logo} />
      </div>
      <div className={styles.matchScore}>
        <p><span>1</span><span>-</span><span>1</span></p>
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <img src={logo} />
      </div>
      {<p className={styles.teamName2}>
        Winning GamiWinning GamiWinning GamiWinning Gami
      </p> || <div className={styles.nameAndKill2}>
        <p>Winning GamiWinning Gami</p>
        <div>
          <img src={logo} />
          <img src={logo} />
        </div>
      </div>}
    </div>
    <div className={styles.pvpNowStatus}>
      {<div className={styles.csgoScore}>
        <p><span>上半场</span><span>11-4</span></p>
      </div> || <div className={styles.teamIcon1}>
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
      </div>}
      <p className={styles.score}>18</p>
      <div className={styles.center}>
        <p>第一局 01‘</p>
        <p>第一局 01‘</p>
      </div>
      <p className={styles.score}>16</p>
      {<div className={styles.csgoScore}>
        <p><span>上半场</span><span>11-4</span></p>
      </div> || <div className={styles.teamIcon2}>
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
      </div>}
    </div>
  </div>
}

function UnderwayKoa () {
  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <p className={styles.leftTime}>
        <img src={strating} />
        <span>BO5</span>
        <span>12:00</span>
      </p>
      <div className={styles.dotaMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:+15.0</p>
      </div>
      <div className={styles.lolMatchBlue} />
    </div>
    <div className={styles.formation}>
      {<p className={styles.teamName1}>
        1Winning GamiWinning GamiWinning GamiWinning Gami
      </p> || <div className={styles.nameAndKill}>
        <p>Winning GamiWinning Gami</p>
        <div>
          <img src={logo} />
          <img src={logo} />
        </div>
      </div>}
      <div className={styles.teamLogo}>
        <img src={logo} />
      </div>
      <div className={styles.matchScore}>
        <p><span>1</span><span>-</span><span>1</span></p>
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <img src={logo} />
      </div>
      {<p className={styles.teamName2}>
        Winning GamiWinning GamiWinning GamiWinning Gami
      </p> || <div className={styles.nameAndKill2}>
        <p>Winning GamiWinning Gami</p>
        <div>
          <img src={logo} />
          <img src={logo} />
        </div>
      </div>}
    </div>
    <div className={styles.pvpNowStatus}>
      {<div className={styles.csgoScore}>
        <p><span>上半场</span><span>11-4</span></p>
      </div> || <div className={styles.teamIcon1}>
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
      </div>}
      <p className={styles.score}>18</p>
      <div className={styles.center}>
        <p>第一局 01‘</p>
        <p>第一局 01‘</p>
      </div>
      <p className={styles.score}>16</p>
      {<div className={styles.csgoScore}>
        <p><span>上半场</span><span>11-4</span></p>
      </div> || <div className={styles.teamIcon2}>
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
        <img src={logo} />
      </div>}
    </div>
  </div>
}

function Underway ({ gameData = {} }) {
  const Id = parseInt(gameData.game_type_id)
  switch (Id) {
    case 5:
      return <UnderwayDota gameData={gameData} />
    case 3:
      return <UnderwayCsGo gameData={gameData} />
    case 1:
      return <UnderwayLol gameData={gameData} />
    default:
      return <UnderwayKoa gameData={gameData} />
  }
}

Underway.propTypes = {
  gameData: PropTypes.object
}
UnderwayDota.propTypes = {
  gameData: PropTypes.object
}
LeftTime.propTypes = {
  gameData: PropTypes.object
}
FullScore.propTypes = {
  scoreList: PropTypes.array
}
export default Underway
