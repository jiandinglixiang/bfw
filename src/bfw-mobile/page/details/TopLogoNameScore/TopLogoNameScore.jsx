import React from 'react'
import styles from './index.module.scss'
import tianhui from '../../../assets/tianhui_type2.png'
import yemo from '../../../assets/nightdemon_type2.png'
import redImg from '../../../assets/redteam_type2.png'
import blueImg from '../../../assets/blueteam_type2(1).png'
import { diffCatch, formatDate, inning, PropTypes, toBigNumber } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import firstBlood from '../../../assets/firstblood.png'
import deckills from '../../../assets/deckills.png'
import fiveKills from '../../../assets/pentakills.png'
import { scoreListReduce } from '../../../../bfw-web/page/AnalysisData/components/TameNowStatus'
import { gameRound } from '../../home/MatchItem/MatchItem.jsx'
import CsGoNowStatus from '../CsGoNowStatus/CsGoNowStatus.jsx'
import BPList from '../BPList/BPList.jsx'

export function GameOverOrNotStarted (props) {
  const propsVE = diffCatch(props)({
    gameId: 0,
    status: 0,
    matchRules: '',
    time: [],
    team1: {
      logo: defImg1,
      name: '...',
      score: 0
    },
    team2: {
      logo: defImg2,
      name: '...',
      score: 0,
    }
  })
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div className={styles.logo}><img src={propsVE.team1.logo} /></div>
      </div>
      <div className={styles.teamName}>
        <p>{propsVE.team1.name}</p>
      </div>
    </div>
    {
      propsVE.status === 0 ? (
        <div className={styles.center}>
          <div className={styles.middle}>
            <p className={styles.notStarted}><span>未开始</span><span>{propsVE.time[1]}</span></p>
          </div>
          <div className={styles.low}>
            <p className={styles.notStarted}><span>{propsVE.time[0]}</span><span>{propsVE.matchRules}</span></p>
          </div>
        </div>
      ) : (
        <div className={styles.center}>
          <div className={styles.overScore}>
            <p>{propsVE.team1.score}</p>
            <b>-</b>
            <p>{propsVE.team2.score}</p>
          </div>
          <div className={styles.overTxt}><p>已结束</p></div>
        </div>
      )
    }
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <div className={styles.logo}><img src={propsVE.team2.logo} /></div>
      </div>
      <div className={styles.teamName}>
        <p>{propsVE.team2.name}</p>
      </div>
    </div>
  </div>
}

function iconList ({ gameId, sente1, sente2 }) {
  const iconList = {}
  iconList.team1 = <div className={styles.aBloodIcon}>
    {sente1[0] ? <img src={firstBlood} /> : <span />}
    {sente1[1] ? <img src={gameId === 5 ? deckills : fiveKills} /> : <span />}
  </div>
  iconList.team2 = <div className={styles.aBloodIcon}>
    {sente2[0] ? <img src={gameId === 5 ? deckills : fiveKills} /> : <span />}
    {sente2[1] ? <img src={firstBlood} /> : <span />}
  </div>
  return iconList
}

function GameUnderway (props) {
  const propsVE = diffCatch(props)({
    isBoth: false,
    isBottomBoth: false,
    gameId: 0,
    status: 0,
    underwayBP: false, // false === 进行中 但没有选角色，没有ban
    matchRules: '',
    time: [],
    round: '',
    gold: '0.0',
    csgoMap: '...',
    team1: {
      camp: 0,
      logo: defImg1,
      name: '...',
      score: 0,
      sente: [],
    },
    team2: {
      camp: 0,
      logo: defImg2,
      name: '...',
      score: 0,
      sente: [],
    }
  })
  const isBoth = propsVE.isBoth || propsVE.isBottomBoth
  const teamFaction = {
    team1: null,
    team2: null,
  }
  const tameScoreColor = {}
  let teamSenteIcon = {}
  // 阵营识别 红方蓝方
  if (propsVE.gameId === 5) {
    teamFaction.team1 = propsVE.team1.camp === 'dire' ? yemo : tianhui
    teamFaction.team2 = propsVE.team1.camp === 'dire' ? tianhui : yemo
  } else if (propsVE.gameId === 1) {
    teamFaction.team1 = propsVE.team1.camp === 'blue' ? blueImg : redImg
    teamFaction.team2 = propsVE.team1.camp === 'blue' ? redImg : blueImg
  }

  if (isBoth) {
    tameScoreColor.team1 = { color: propsVE.team1.score > propsVE.team2.score ? '#F9DF70' : '#85838F' }
    tameScoreColor.team2 = { color: propsVE.team2.score > propsVE.team1.score ? '#F9DF70' : '#85838F' }
  }
  if ((isBoth || propsVE.underwayBP) && [1, 5].includes(propsVE.gameId)) {
    // lol dota
    // 进行中 但没有选角色，没有ban
    teamSenteIcon = iconList({
      gameId: propsVE.gameId,
      sente1: propsVE.team1.sente,
      sente2: propsVE.team2.sente
    })
  }
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        {
          teamFaction.team1 && <div className={styles.teamIcon}><img src={teamFaction.team1} /></div>
        }
        <div className={styles.logo}>
          <img src={propsVE.team1.logo} />
        </div>
        <b style={tameScoreColor.team1}>{propsVE.team1.score}</b>
      </div>
      <div className={styles.teamName}>
        <p style={{ padding: teamFaction.team1 ? '0 10px' : '0 32px 0 0' }}>{propsVE.team1.name}</p>
      </div>
      {teamSenteIcon.team1}
    </div>
    <div className={styles.center}>
      <div className={styles.high}>
        <p className={isBoth ? styles.boutOver : styles.boutUnderway}>
          {propsVE.round} {propsVE.time[0]}
        </p>
      </div>
      {
        propsVE.underwayBP && <div className={styles.low} />
      }
      <div className={styles.low}>
        {
          propsVE.gameId === 3 ? (<p>Map: {propsVE.csgoMap}</p>) : (
            <p className={styles.difference}>
              <span>差:{propsVE.gold}k</span>
            </p>)
        }
      </div>
    </div>
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <b style={tameScoreColor.team2}>{propsVE.team2.score}</b>
        <div className={styles.logo}>
          <img src={propsVE.team2.logo} />
        </div>
        {
          teamFaction.team2 && <div className={styles.teamIcon}><img src={teamFaction.team2} /></div>
        }
      </div>
      <div className={styles.teamName}>
        <p style={{ padding: teamFaction.team2 ? '0 10px' : '0 0 0 32px' }}>{propsVE.team2.name}</p>
      </div>
      {teamSenteIcon.team2}
    </div>
  </div>
}

function statusToTxt (s) {
  if (s === 1) {
    return '进行中'
  } else if (s === 2) {
    return '已结束'
  }
  return '未开始'
}

function timeToTxt (time, status) {
  if (!time) {
    return [statusToTxt(status)]
  }
  const time2 = parseInt(time / 60)
  return [`${time2}:${time - time2 * 60}`]
}

function csgoInit (team1, team2, round) {
  const data = {
    round: 0,
    overtime: false, // 加时赛
    team1: {
      name: '',
      score: [],
      role: [],
      sente: [],
      sum: 0
    },
    team2: {
      name: '',
      score: [],
      role: [],
      sente: [],
      sum: 0
    }
  }
  data.round = round || 0
  data.overtime = team1.is_over_time > 1 || team2.is_over_time > 1
  // data.team1.name = team1.team_name
  // data.team2.name = team2.team_name
  data.team1.score = [team1.first_half_score, team1.second_half_score]
  data.team2.score = [team2.first_half_score, team2.second_half_score]
  data.team1.role = [team1.first_half_role === 'CT', team1.second_half_role === 'CT']
  data.team2.role = [team2.first_half_role === 'T', team2.second_half_role === 'T']
  if (data.overtime) {
    data.team1.score.push(team1.over_time_score)
    data.team2.score.push(team2.over_time_score)
    data.team1.role.push(team1.second_half_role === 'CT')
    data.team2.role.push(team2.second_half_role === 'T')
  }
  data.team1.sente = [team1.flag_r1 > 0, team1.flag_w5 > 0, team1.flag_r16 > 0]
  data.team2.sente = [team2.flag_r1 > 0, team2.flag_w5 > 0, team2.flag_r16 > 0]
  data.team1.sum = data.team1.score.reduce((a, b) => a + b, 0)
  data.team2.sum = data.team2.score.reduce((a, b) => a + b, 0)
  return data
}

function csgoDataInit (matchList, round) {
  // csgo 进行中赛况对阵详情数据初始化
  const matchListVE = diffCatch(matchList)({
    team1_more_attr: {
      first_half_score: 0,
      second_half_score: 0,
      over_time_score: 0,
      flag_r1: 0,
      flag_r16: 0,
      flag_w5: 0
    },
    team2_more_attr: {
      first_half_score: 0,
      second_half_score: 0,
      over_time_score: 0,
      flag_r1: 0,
      flag_r16: 0,
      flag_w5: 0
    }
  })
  const team1 = matchListVE.team1_more_attr
  const team2 = matchListVE.team2_more_attr
  return csgoInit(team1, team2, round)
}

export function csgoBothInit (endMatch) {
  // csgo 进行中小局，赛果对阵详情数据初始化
  const endMatchVE = diffCatch(endMatch)({
    team1: {
      other_more_attr: {
        first_half_score: 0,
        second_half_score: 0,
        over_time_score: 0,
        flag_r1: 0,
        flag_r16: 0,
        flag_w5: 0
      }
    },
    team2: {
      other_more_attr: {
        first_half_score: 0,
        second_half_score: 0,
        over_time_score: 0,
        flag_r1: 0,
        flag_r16: 0,
        flag_w5: 0
      }
    },
  })
  const team1 = endMatchVE.team1.other_more_attr
  const team2 = endMatchVE.team2.other_more_attr
  const data = csgoInit(team1, team2, team1.round)
  data.team1.name = endMatchVE.team1.team_name
  data.team2.name = endMatchVE.team2.team_name
  return data
}

function Both ({ data = {}, endMatch }) {
  // let endMatchVE
  // 小局
  const endMatchVE = diffCatch(endMatch)({
    poor_economy: {
      gold: 0
    },
    team1: {
      players: [],
      ban: []
    },
    team2: {
      players: [],
      ban: []
    },
  })
  // 小局页
  data.status = endMatchVE.team1.status
  data.gameId = endMatchVE.team1.game_type_id
  data.underwayBP = true //  但没有选角色，没有ban
  data.team1.logo = endMatchVE.team1.team_logo
  data.team2.logo = endMatchVE.team2.team_logo
  data.team1.name = endMatchVE.team1.team_name
  data.team2.name = endMatchVE.team2.team_name
  data.team1.score = endMatchVE.team1.score
  data.team2.score = endMatchVE.team2.score
  data.round = !data.isBottomBoth && endMatchVE.team1.round && inning(endMatchVE.team1.round)
  data.time = timeToTxt(endMatchVE.poor_economy.time, data.status)
  data.gold = toBigNumber(endMatchVE.poor_economy.gold / 1000).toFormat(1)
  if (data.gameId === 5) {
    // dota阵营
    data.team1.camp = endMatchVE.team1.camp && (endMatchVE.team1.camp === 'dire' ? 1 : 2)
    data.team2.camp = endMatchVE.team2.camp && (endMatchVE.team2.camp === 'dire' ? 1 : 2)
    // 先手icon bool 数组
    data.team1.sente = [
      endMatchVE.team1.other_more_attr.is_first_blood > 0,
      endMatchVE.team1.other_more_attr.is_ten_kills > 0,
    ]
    data.team2.sente = [
      endMatchVE.team2.other_more_attr.is_ten_kills > 0,
      endMatchVE.team2.other_more_attr.is_first_blood > 0,
    ]
  }
  if (data.gameId === 1) {
    data.team1.camp = endMatchVE.team1.camp && (endMatchVE.team1.camp === 'blue' ? 1 : 2)
    // lol阵营
    data.team2.camp = endMatchVE.team2.camp && (endMatchVE.team2.camp === 'blue' ? 1 : 2)
    data.team1.sente = [
      endMatchVE.team1.other_more_attr.first_kills > 0,
      endMatchVE.team1.other_more_attr.five_kills > 0,
    ]
    data.team2.sente = [
      endMatchVE.team2.other_more_attr.five_kills > 0,
      endMatchVE.team2.other_more_attr.first_kills > 0,
    ]
  }
  if (data.gameId === 3) {
    // csgo
    data.csgoMap = endMatchVE.team1.other_more_attr.map || endMatchVE.team2.other_more_attr.map
    // 小局数据
    const scgoData = csgoBothInit(endMatchVE)
    return <div>
      <GameUnderway {...data} />
      <CsGoNowStatus {...scgoData} />
    </div>
  }
  if (!data.isBottomBoth && data.gameId === 5) {
    return (
      <div>
        <GameUnderway {...data} />
        <BPList isBan team1={endMatchVE.team1.ban} team2={endMatchVE.team2.ban} />
        <BPList team1={endMatchVE.team1.players} team2={endMatchVE.team2.players} />
      </div>
    )
  }
  return <GameUnderway {...data} />
}

function Match ({ data = {}, matchList }) {
  matchList = diffCatch(matchList)({
    status: 0,
    poor_economy: { gold: 0 },
    score_list: [],
    score: '',
    game_type_id: 0,
    game_start_time: 0,
    team1_more_attr: {
      other_more_attr: {},
      players: [],
      ban: []
    },
    team2_more_attr: {
      other_more_attr: {},
      players: [],
      ban: []
    }
  })
  // 非小局 详情页
  data.status = matchList.status
  data.gameId = matchList.game_type_id
  data.team1.logo = matchList.host_team_logo
  data.team1.name = matchList.host_team_name
  data.team2.logo = matchList.guest_team_logo
  data.team2.name = matchList.guest_team_name
  if (data.status === 1) {
    // 非小局 进行中
    const score = scoreListReduce(matchList.score_list)
    data.team1.score = score[0]
    data.team2.score = score[1]
    data.round = gameRound(matchList.score_list, matchList.round_total)
    data.time = timeToTxt(matchList.poor_economy.time, data.status)
    data.gold = toBigNumber(matchList.poor_economy.gold / 1000).toFormat(1)
    data.underwayBP = !!(matchList.team1_more_attr.players.length ||
      matchList.team1_more_attr.ban.length ||
      matchList.team2_more_attr.players.length ||
      matchList.team2_more_attr.ban.length)
    // 进行中 但没有选角色，没有ban
    if (data.gameId === 5) {
      // 非小局 进行中 游戏dota
      data.team1.camp = matchList.team1_more_attr.other_more_attr.camp && (matchList.team1_more_attr.other_more_attr.camp === 'dire' ? 1 : 2)
      // 阵营dire=天辉
      data.team2.camp = matchList.team2_more_attr.other_more_attr.camp && (matchList.team2_more_attr.other_more_attr.camp === 'dire' ? 1 : 2)
      // 先手icon bool 数组
      data.team1.sente = [
        matchList.team1_more_attr.other_more_attr.is_first_blood > 0,
        matchList.team1_more_attr.other_more_attr.is_ten_kills > 0,
      ]
      data.team2.sente = [
        matchList.team2_more_attr.other_more_attr.is_ten_kills > 0,
        matchList.team2_more_attr.other_more_attr.is_first_blood > 0,
      ]
      return (
        <div>
          <GameUnderway {...data} />
          <BPList isBan team1={matchList.team1_more_attr.ban} team2={matchList.team2_more_attr.ban} />
          <BPList team1={matchList.team1_more_attr.players} team2={matchList.team2_more_attr.players} />
        </div>)
    }
    if (data.gameId === 1) {
      // 非小局 进行中 游戏lol
      data.team1.camp = matchList.team1_more_attr.other_more_attr.camp && (matchList.team1_more_attr.other_more_attr.camp === 'blue' ? 1 : 2)
      // 阵营blue=蓝方
      data.team2.camp = matchList.team2_more_attr.other_more_attr.camp && (matchList.team2_more_attr.other_more_attr.camp === 'blue' ? 1 : 2)
      data.team1.sente = [
        matchList.team1_more_attr.other_more_attr.first_kills > 0,
        matchList.team1_more_attr.other_more_attr.five_kills > 0,
      ]
      data.team2.sente = [
        matchList.team2_more_attr.other_more_attr.five_kills > 0,
        matchList.team2_more_attr.other_more_attr.first_kills > 0,
      ]
      return (
        <div>
          <GameUnderway {...data} />
          <BPList team1={matchList.team1_more_attr.players} team2={matchList.team2_more_attr.players} />
        </div>)
    }
    if (data.gameId === 3) {
      // csgo 显示
      data.csgoMap = matchList.team1_more_attr.other_more_attr.map || matchList.team2_more_attr.other_more_attr.map
      const scgoData = csgoDataInit(matchList, matchList.score_list)
      return <div>
        <GameUnderway {...data} />
        <CsGoNowStatus {...scgoData} />
      </div>
    }
    return <GameUnderway {...data} />
  }
  if (data.status === 0) {
    // 未开始
    if (matchList.game_start_time) {
      const notStarTime = formatDate(matchList.game_start_time, 'YYYY-MM-DD+HH:mm')
      data.time = notStarTime.split('+')
    }
    data.matchRules = matchList.match_rules
    return <GameOverOrNotStarted {...data} />
  }
  // data.status === 2已结束其他
  const OverScoreArr = matchList.score.split(/:|,/)
  data.team1.score = OverScoreArr[0]
  data.team2.score = OverScoreArr[1]
  return <GameOverOrNotStarted {...data} />
}

function TopLogoNameScore (props) {
  const data = {
    isBoth: props.isBoth,
    isBottomBoth: props.isBottomBoth,
    gameId: 0,
    status: 0,
    matchRules: '',
    time: [],
    round: '',
    gold: 0,
    csgoMap: '...',
    underwayBP: false, // 进行中 但没有选角色，没有ban
    team1: {
      camp: 0,
      sente: [],
      name: '',
      logo: '',
      score: 0,
    },
    team2: {
      camp: 0,
      sente: [],
      name: '',
      logo: '',
      score: 0,
    }
  }
  const propsVE = diffCatch(props)({
    matchList: {},
    endMatch: {}
  })
  if (data.isBoth || data.isBottomBoth) {
    // 小局顶部/小局单场
    return <Both data={data} endMatch={propsVE.endMatch} />
  }
  return <Match data={data} matchList={propsVE.matchList} />
}

export default TopLogoNameScore

TopLogoNameScore.propTypes = {
  isBoth: PropTypes.bool,
  isBottomBoth: PropTypes.bool
}
Match.propTypes = {
  data: PropTypes.object,
  matchList: PropTypes.object
}
Both.propTypes = {
  data: PropTypes.object,
  endMatch: PropTypes.object
}