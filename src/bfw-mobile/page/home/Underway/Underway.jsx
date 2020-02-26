import React, { useMemo } from 'react'
import styles from './index.module.scss'
import strating from '../../../assets/live_30.gif'
import { diffCatch, formatDate, inning, PropTypes, toBigNumber } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import { useHistory } from 'react-router-dom'

export function routerDetails (data, history) {
  history.push(
    `/details/${data.smid}/${data.game_type_name}/${data.game_name}/${data.host_team_name} VS ${data.guest_team_name}/${data.game_type_id}`)
}

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

function UnderwayDota ({ gameData }) {
  const moreAttr1 = gameData.team1_more_attr.other_more_attr
  const moreAttr2 = gameData.team2_more_attr.other_more_attr

  const inningsTime = useMemo(() => {
    const nowInnings = inning(parseInt(gameData.round))
    const timeTxt = gameData.poor_economy.time / 60
    return timeTxt ? `${nowInnings} ${timeTxt}’` : nowInnings
  }, [gameData.round, gameData.poor_economy.time])

  const poorEconomy = useMemo(() => toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1), [gameData.poor_economy.gold])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.dotaMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:{poorEconomy}k</p>
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
        <HeroList arrIcon={gameData.team1_more_attr.players} />
      </div>
      <p className={styles.score}>{gameData.team1_score || '-'}</p>
      <div className={styles.center}>
        <p>{inningsTime}</p>
      </div>
      <p className={styles.score}>{gameData.team2_score || '-'}</p>
      <div className={styles.teamIcon2}>
        <HeroList arrIcon={gameData.team2_more_attr.players} />
      </div>
    </div>
  </div>
}

function UnderwayCsGo ({ gameData }) {
  const moreAttr1 = gameData.team1_more_attr.other_more_attr
  const moreAttr2 = gameData.team2_more_attr.other_more_attr

  const [firstHalf, innings] = useMemo(() => {
    const timeTxt = gameData.poor_economy.time / 60
    const sbc = moreAttr1.current_round > 15 ? '下半场' : '上半场'
    if (timeTxt && moreAttr1.current_round) {
      return [sbc, `第${moreAttr1.current_round}回合 ${timeTxt}’`]
    } else if (moreAttr1.current_round) {
      return [sbc, `第${moreAttr1.current_round}回合`]
    }
    return [sbc]
  }, [moreAttr1.current_round, gameData.poor_economy.time])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.csgoMatchRed} />
      <div className={styles.centerDifference}>
        <p>Map: {moreAttr1.map || '...'}</p>
      </div>
      <div className={styles.csgoMatchBlue} />
    </div>
    <div className={styles.formation}>
      <div className={styles.nameAndKill}>
        <p>{gameData.host_team_name}</p>
        <div>
          <span className={moreAttr1.flag_r16 > 0 ? styles.csgoSixtgun : ''} />
          <span className={moreAttr1.flag_w5 > 0 ? styles.csgo5 : ''} />
          <span className={moreAttr1.flag_r1 > 0 ? styles.csgoFirstgun : ''} />
        </div>
      </div>
      <div className={styles.teamLogo}>
        <img src={gameData.host_team_logo || defImg1} />
      </div>
      <div className={styles.matchScore}>
        <p><span>1</span><span>-</span><span>1</span></p>
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <img src={gameData.guest_team_logo || defImg2} />
      </div>
      <div className={styles.nameAndKill2}>
        <p>{gameData.guest_team_name}</p>
        <div>
          <span className={moreAttr2.flag_r1 > 0 ? styles.csgoFirstgun : ''} />
          <span className={moreAttr2.flag_w5 > 0 ? styles.csgo5 : ''} />
          <span className={moreAttr2.flag_r16 > 0 ? styles.csgoSixtgun : ''} />
        </div>
      </div>
    </div>
    <div className={styles.pvpNowStatus}>
      <div className={styles.csgoScore}>
        <p><span>上半场</span><span>{moreAttr1.first_half_score || 0}-{moreAttr2.first_half_score || 0}</span></p>
      </div>
      <p className={styles.score}>{gameData.team1_score || '-'}</p>
      <div className={styles.center}>
        <p>{firstHalf}</p>
        <p>{innings}</p>
      </div>
      <p className={styles.score}>{gameData.team2_score || '-'}</p>
      <div className={styles.csgoScore}>
        <p><span>下半场</span><span>{moreAttr1.second_half_score || 0}-{moreAttr2.second_half_score || 0}</span></p>
      </div>
    </div>
  </div>
}

function UnderwayLol ({ gameData }) {
  const moreAttr1 = gameData.team1_more_attr.other_more_attr
  const moreAttr2 = gameData.team2_more_attr.other_more_attr

  const inningsTime = useMemo(() => {
    const nowInnings = inning(parseInt(gameData.round))
    const timeTxt = gameData.poor_economy.time / 60
    return timeTxt ? `${nowInnings} ${timeTxt}’` : nowInnings
  }, [gameData.round, gameData.poor_economy.time])

  const poorEconomy = useMemo(() => toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1), [gameData.poor_economy.gold])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.lolMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:{poorEconomy}k</p>
      </div>
      <div className={styles.lolMatchBlue} />
    </div>
    <div className={styles.formation}>
      <div className={styles.nameAndKill}>
        <p>{gameData.host_team_name}</p>
        <div>
          <span className={moreAttr1.first_kills > 0 ? styles.firstBloodIcon : ''} />
          <span className={moreAttr1.five_kills > 0 ? styles.kill5Icon : ''} />
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
          <span className={moreAttr2.five_kills > 0 ? styles.kill5Icon : ''} />
          <span className={moreAttr2.first_kills > 0 ? styles.firstBloodIcon : ''} />
        </div>
      </div>
    </div>
    <div className={styles.pvpNowStatus}>
      <div className={styles.teamIcon1}>
        <HeroList arrIcon={gameData.team1_more_attr.players} />
      </div>
      <p className={styles.score}>{gameData.team1_score || '-'}</p>
      <div className={styles.center}>
        <p>{inningsTime}</p>
      </div>
      <p className={styles.score}>{gameData.team2_score || '-'}</p>
      <div className={styles.teamIcon2}>
        <HeroList arrIcon={gameData.team2_more_attr.players} />
      </div>
    </div>
  </div>
}

function UnderwayKoa ({ gameData }) {
  const poorEconomy = useMemo(() => toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1), [gameData.poor_economy.gold])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.koaMatch} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:{poorEconomy}k</p>
      </div>
      <div className={styles.koaMatch} />
    </div>
    <div className={styles.formation}>
      <p className={styles.teamName1}>{gameData.host_team_name}</p>
      <div className={styles.teamLogo}><img src={gameData.host_team_logo || defImg1} /></div>
      <div className={styles.matchScore}>
        <FullScore scoreList={gameData.score_list} />
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}><img src={gameData.guest_team_logo || defImg1} /></div>
      <p className={styles.teamName2}>{gameData.guest_team_name}</p>
    </div>
  </div>
}

function Underway ({ gameData = {} }) {
  const history = useHistory()
  gameData = diffCatch(gameData)({
    game_type_id: 0,
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

  function f () {
    switch (gameData.game_type_id) {
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

  return <div onClick={() => routerDetails(gameData, history)}>
    {f()}
  </div>
}

UnderwayKoa.propTypes = {
  gameData: PropTypes.object
}
Underway.propTypes = {
  gameData: PropTypes.object
}
UnderwayDota.propTypes = {
  gameData: PropTypes.object
}
UnderwayCsGo.propTypes = {
  gameData: PropTypes.object
}
LeftTime.propTypes = {
  gameData: PropTypes.object
}
FullScore.propTypes = {
  scoreList: PropTypes.array
}
UnderwayLol.propTypes = {
  gameData: PropTypes.object
}
export default Underway
