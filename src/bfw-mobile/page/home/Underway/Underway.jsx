import React, { useMemo } from 'react'
import styles from './index.module.scss'
import strating from '../../../assets/live_30.gif'
import { inning, PropTypes, toBigNumber, useDiffCatch } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import { useHistory } from 'react-router-dom'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import lolBlue from '../../../assets/blueteam.png'
import lolRed from '../../../assets/reateam.png'
import yemo from '../../../assets/yemo.png'
import tianhui from '../../../assets/tianhui.png'
import tttt from '../../../assets/terrorists.png'
import ctct from '../../../assets/counter.png'

export function csgoRole (role) {
  if (role === 'CT') {
    return <Image src={ctct} style={{ maxWidth: '15px' }} />
  } else if (role === 'T') {
    return <Image src={tttt} style={{ maxWidth: '15px' }} />
  }
  return <span style={{ maxWidth: '15px' }} />
}

export function lolRole (role, red, blue) {
  if (role === 'blue') {
    return <Image src={blue || lolBlue} />
  } else if (role === 'red') {
    return <Image src={red || lolRed} />
  }
  return <span />
}

export function dotaRole (role, red, blue) {
  if (role === 'dire') {
    return <Image src={blue || yemo} />
  } else if (role === 'radiant') {
    return <Image src={red || tianhui} />
  }
  return <span />
}

export function routerDetails (data, history) {
  const query = {
    matchName: data.game_name,
    gameId: data.game_type_id,
    smid: data.smid
  }
  const arr = Object.entries(query).map(value => `${value[0]}=${value[1]}`)
  history.push('/details?' + arr.join('&'))
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

function HeroList ({ arrIcon = [], iconKey = '' }) {
  return [0, 1, 2, 3, 4].map(index => {
    return <div key={index} style={{ backgroundImage: `url(${arrIcon[index] && arrIcon[index][iconKey]})` }} />
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

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.centerCamp}>
        {dotaRole(moreAttr1.camp)}
        <div className={styles.centerDifference}>
          <p className={styles.money}>差:{poorEconomy}k</p>
        </div>
        {dotaRole(moreAttr2.camp)}
      </div>
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
          <span className={moreAttr2.is_first_blood > 0 ? styles.firstBloodIcon : ''} />
          <span className={moreAttr2.is_ten_kills > 0 ? styles.kill10Icon : ''} />
        </div>
      </div>
    </div>
    <div className={styles.pvpNowStatus}>
      <div className={styles.teamIcon1}>
        <HeroList arrIcon={gameData.team1_more_attr.players} iconKey='hero_logo' />
      </div>
      <p className={styles.score}>{gameData.team1_score || '-'}</p>
      <div className={styles.center}>
        <p>{inningsTime}</p>
      </div>
      <p className={styles.score}>{gameData.team2_score || '-'}</p>
      <div className={styles.teamIcon2}>
        <HeroList arrIcon={gameData.team2_more_attr.players} iconKey='hero_logo' />
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

  const team1Camp = moreAttr1.second_half_role || moreAttr1.first_half_role
  const team2Camp = moreAttr2.second_half_role || moreAttr2.first_half_role
  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.centerCamp}>
        {csgoRole(team1Camp)}
        <div className={styles.centerDifference}>
          <p>Map: {moreAttr1.map || '...'}</p>
        </div>
        {csgoRole(team2Camp)}
      </div>
    </div>
    <div className={styles.formation}>
      <div className={styles.nameAndKill}>
        <p>{gameData.host_team_name}</p>
        <div>
          <span className={moreAttr1.flag_r1 > 0 ? styles.csgoFirstgun : ''} />
          <span className={moreAttr1.flag_w5 > 0 ? styles.csgo5 : ''} />
          <span className={moreAttr1.flag_r16 > 0 ? styles.csgoSixtgun : ''} />
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
  }, [gameData.poor_economy.time, gameData.current_round])

  const poorEconomy = useMemo(() => toBigNumber(gameData.poor_economy.gold / 1000).toFormat(1), [gameData.poor_economy.gold])

  return <div className={styles.content}>
    <div className={styles.pvpTitle}>
      <LeftTime gameData={gameData} />
      <div className={styles.centerCamp}>
        {lolRole(moreAttr1.camp)}
        <div className={styles.centerDifference}>
          <p className={styles.money}>差:{poorEconomy}k</p>
        </div>
        {lolRole(moreAttr2.camp)}
      </div>
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
          <span className={moreAttr2.first_kills > 0 ? styles.firstBloodIcon : ''} />
          <span className={moreAttr2.five_kills > 0 ? styles.kill5Icon : ''} />
        </div>
      </div>
    </div>
    <div className={styles.pvpNowStatus}>
      <div className={styles.teamIcon1}>
        <HeroList arrIcon={gameData.team1_more_attr.players} iconKey='champion_img' />
      </div>
      <p className={styles.score}>{gameData.team1_score || '-'}</p>
      <div className={styles.center}>
        <p>{inningsTime}</p>
      </div>
      <p className={styles.score}>{gameData.team2_score || '-'}</p>
      <div className={styles.teamIcon2}>
        <HeroList arrIcon={gameData.team2_more_attr.players} iconKey='champion_img' />
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
      <div className={styles.centerCamp}>
        <div className={styles.centerDifference}>
          <p className={styles.money}>差:{poorEconomy}k</p>
        </div>
      </div>
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
  // console.log('变化')
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
