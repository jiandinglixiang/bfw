import React, { useMemo } from 'react'
import styles from './index.module.scss'
import strating from '../../../assets/live_30.gif'
import { inning, PropTypes, toBigNumber, useDiffCatch } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import { useHistory } from 'react-router-dom'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

export function routerDetails (data, history) {
  const query = {
    matchName: data.game_name,
    gameId: data.game_type_id,
    smid: data.smid
  }
  const arr = Object.entries(query).map(value => `${value[0]}=${value[1]}`)
  history.push('/details?' + arr.join('&'))
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
  return <p className={styles.leftTime}>
    <Image src={strating} />
    <span>{gameData.match_rules}</span>
  </p>
}

function FullScore ({ scoreList }) {
  let arr = [0, 0]
  if (typeof scoreList === 'string') {
    arr = scoreList.split(',')
  }
  return <p><span>{arr[0]}</span><span>-</span><span>{arr[1]}</span></p>
}

function HeroList ({ arrIcon = [] }) {
  return [0, 1, 2, 3, 4].map(index => {
    if (arrIcon[index] && arrIcon[index].hero_logo) {
      return <Image key={index} src={arrIcon[index].hero_logo} />
    }
    return <span key={index} />
  })
}

function UnderwayDota (props) {
  const { gameData } = useDiffCatch(props)({
    gameData: {
      score_list: [],
      poor_economy: {
        gold: 0,
        time: 0
      },
      round_total: 0,
      score: '',
      team1_more_attr: {
        other_more_attr: {},
        players: []
      },
      team2_more_attr: {
        other_more_attr: {},
        players: []
      },
      current_round: 1
    }
  })
  const moreAttr1 = gameData.team1_more_attr.other_more_attr
  const moreAttr2 = gameData.team2_more_attr.other_more_attr

  const inningsTime = useMemo(() => {
    const nowInnings = inning(gameData.current_round)
    const timeTxt = parseInt(gameData.poor_economy.time / 60)
    return timeTxt ? `${nowInnings} ${timeTxt}’` : nowInnings
  }, [gameData])

  const poorEconomy = useMemo(() => toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1), [gameData.poor_economy.gold])
  const isDire = useMemo(() => {
    return moreAttr1.camp === 'dire' || moreAttr2.camp === 'radiant'
  }, [moreAttr1.camp, moreAttr2.camp])
  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={isDire ? styles.dotaMatchBlue : styles.dotaMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:{poorEconomy}k</p>
      </div>
      <div className={isDire ? styles.dotaMatchRed : styles.dotaMatchBlue} />
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
        <Image src={[gameData.host_team_logo, defImg1]} />
      </div>
      <div className={styles.matchScore}>
        <FullScore scoreList={gameData.score} />
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <Image src={[gameData.guest_team_logo, defImg2]} />
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

function UnderwayCsGo (props) {
  const { gameData } = useDiffCatch(props)({
    gameData: {
      score_list: [],
      poor_economy: {
        gold: 0,
        time: 0
      },
      round_total: 0,
      score: '',
      team1_more_attr: {
        other_more_attr: {},
        players: []
      },
      team2_more_attr: {
        other_more_attr: {},
        players: []
      },
      current_round: 0
    }
  })
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
  const isCT = useMemo(() => {
    return moreAttr1.camp === 'CT' || moreAttr2.camp === 'C'
  }, [moreAttr1.camp, moreAttr2.camp])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={isCT ? styles.csgoMatchBlue : styles.csgoMatchRed} />
      <div className={styles.centerDifference}>
        <p>Map: {moreAttr1.map || '...'}</p>
      </div>
      <div className={isCT ? styles.csgoMatchRed : styles.csgoMatchBlue} />
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
        <Image src={gameData.host_team_logo || defImg1} />
      </div>
      <div className={styles.matchScore}>
        <FullScore scoreList={gameData.score} />
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <Image src={gameData.guest_team_logo || defImg2} />
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
      <p className={styles.score}>{gameData.team1_score}</p>
      <div className={styles.center}>
        <p>{firstHalf}</p>
        <p>{innings}</p>
      </div>
      <p className={styles.score}>{gameData.team2_score}</p>
      <div className={styles.csgoScore}>
        <p><span>下半场</span><span>{moreAttr1.second_half_score || 0}-{moreAttr2.second_half_score || 0}</span></p>
      </div>
    </div>
  </div>
}

function UnderwayLol (props) {
  const { gameData } = useDiffCatch(props)({
    gameData: {
      score_list: [],
      poor_economy: {
        gold: 0,
        time: 0
      },
      round_total: 0,
      score: '',
      team1_more_attr: {
        other_more_attr: {},
        players: []
      },
      team2_more_attr: {
        other_more_attr: {},
        players: []
      },
      round: 0
    }
  })
  const moreAttr1 = gameData.team1_more_attr.other_more_attr
  const moreAttr2 = gameData.team2_more_attr.other_more_attr

  const inningsTime = useMemo(() => {
    const nowInnings = inning(gameData.current_round || 1)
    const timeTxt = parseInt(gameData.poor_economy.time / 60)
    return timeTxt ? `${nowInnings} ${timeTxt}’` : nowInnings
  }, [gameData.round, gameData.poor_economy.time])

  const poorEconomy = useMemo(() => toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1), [gameData.poor_economy.gold])
  const isBlue = useMemo(() => {
    return moreAttr1.camp === 'blue' || moreAttr2.camp === 'red'
  }, [moreAttr1.camp, moreAttr2.camp])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={isBlue ? styles.lolMatchBlue : styles.lolMatchRed} />
      <div className={styles.centerDifference}>
        <p className={styles.money}>差:{poorEconomy}k</p>
      </div>
      <div className={isBlue ? styles.lolMatchRed : styles.lolMatchBlue} />
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
        <Image src={gameData.host_team_logo || defImg1} />
      </div>
      <div className={styles.matchScore}>
        <FullScore scoreList={gameData.score} />
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}>
        <Image src={gameData.guest_team_logo || defImg2} />
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

function UnderwayKoa (props) {
  const { gameData } = useDiffCatch(props)({
    gameData: {
      score_list: [],
      poor_economy: {
        gold: 0,
        time: 0
      },
      round_total: 0,
      score: '',
      team1_more_attr: {
        other_more_attr: {},
        players: []
      },
      team2_more_attr: {
        other_more_attr: {},
        players: []
      },
      round: 0
    }
  })
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
      <div className={styles.teamLogo}><Image src={gameData.host_team_logo || defImg1} /></div>
      <div className={styles.matchScore}>
        <FullScore scoreList={gameData.score} />
        <p>全局比分</p>
      </div>
      <div className={styles.teamLogo}><Image src={gameData.guest_team_logo || defImg2} /></div>
      <p className={styles.teamName2}>{gameData.guest_team_name}</p>
    </div>
  </div>
}

function Underway (props) {
  const history = useHistory()
  const propsVE = useDiffCatch(props)({ gameData: { game_type_id: 0 } })

  function f () {
    switch (propsVE.gameData.game_type_id) {
      case 5:
        return <UnderwayDota gameData={propsVE.gameData} />
      case 3:
        return <UnderwayCsGo gameData={propsVE.gameData} />
      case 1:
        return <UnderwayLol gameData={propsVE.gameData} />
      default:
        return <UnderwayKoa gameData={propsVE.gameData} />
    }
  }

  return <div onClick={() => routerDetails(propsVE.gameData, history)}>
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
  scoreList: PropTypes.any
}
UnderwayLol.propTypes = {
  gameData: PropTypes.object
}
export default Underway
