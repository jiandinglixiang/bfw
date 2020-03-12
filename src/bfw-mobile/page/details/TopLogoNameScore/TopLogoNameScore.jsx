import React from 'react'
import styles from './index.module.scss'
import tianhui from '../../../assets/tianhui_type2.png'
import yemo from '../../../assets/nightdemon_type2.png'
import { diffCatch, formatDate, inning, PropTypes, toBigNumber } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import redImg from '../../../assets/redteam_type2.png'
import blueImg from '../../../assets/blueteam_type2(1).png'
import firstBlood from '../../../assets/firstblood.png'
import deckills from '../../../assets/deckills.png'
import fiveKills from '../../../assets/pentakills.png'
import CsGoNowStatus from '../CsGoNowStatus/CsGoNowStatus.jsx'
import BPList from '../BPList/BPList.jsx'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

export function GameOverOrNotStarted (props) {
  const propsVE = diffCatch(props)({
    gameId: 0,
    status: 0,
    matchRules: '',
    time: [],
    team1: {
      logo: '',
      name: '...',
      score: 0
    },
    team2: {
      logo: '',
      name: '...',
      score: 0,
    }
  })
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div className={styles.logo}><Image src={[propsVE.team1.logo, defImg1]} /></div>
      </div>
      <div className={styles.teamName}>
        <p>{propsVE.team1.name}</p>
      </div>
    </div>
    {
      propsVE.status === 0 ? (
        <div className={styles.center}>
          <div className={styles.middle}>
            <p className={styles.notStarted}><span>未开始</span> {propsVE.time[1] && <span>{propsVE.time[1]}</span>}</p>
          </div>
          <div className={styles.low}>
            <p className={styles.notStarted}><span>{propsVE.time[0]}</span> <span>{propsVE.matchRules}</span></p>
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
        <div className={styles.logo}><Image src={[propsVE.team2.logo, defImg2]} /></div>
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
    {sente1[0] ? <Image src={firstBlood} /> : <span />}
    {sente1[1] ? <Image src={gameId === 5 ? deckills : fiveKills} /> : <span />}
  </div>
  iconList.team2 = <div className={styles.aBloodIcon}>
    {sente2[0] ? <Image src={firstBlood} /> : <span />}
    {sente2[1] ? <Image src={gameId === 5 ? deckills : fiveKills} /> : <span />}
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
      logo: '',
      name: '...',
      score: 0,
      sente: [],
      isWin: false
    },
    team2: {
      camp: 0,
      logo: '',
      name: '...',
      score: 0,
      sente: [],
      isWin: false
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
    teamFaction.team1 = propsVE.team1.camp && (propsVE.team1.camp === 1 ? yemo : propsVE.team1.camp === 2 ? tianhui : null)
    teamFaction.team2 = propsVE.team2.camp && (propsVE.team2.camp === 1 ? yemo : propsVE.team2.camp === 2 ? tianhui : null)
  } else if (propsVE.gameId === 1) {
    teamFaction.team1 = propsVE.team1.camp && (propsVE.team1.camp === 1 ? blueImg : propsVE.team1.camp === 2 ? redImg : null)
    teamFaction.team2 = propsVE.team2.camp && (propsVE.team2.camp === 1 ? blueImg : propsVE.team2.camp === 2 ? redImg : null)
  }
  if (isBoth) {
    tameScoreColor.team1 = { color: propsVE.team1.isWin ? '#F9DF70' : '#85838F' }
    tameScoreColor.team2 = { color: propsVE.team2.isWin ? '#F9DF70' : '#85838F' }
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
  return (
    <div className={styles.content}>
      <div className={styles.first}>
        <div className={styles.topLogoIcon1}>
          {
            teamFaction.team1 && <div className={styles.teamIcon}><Image src={teamFaction.team1} /></div>
          }
          <div className={styles.logo}>
            <Image src={[propsVE.team1.logo, defImg1]} />
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
            {propsVE.gameId !== 3 && propsVE.round} {propsVE.time[0]}
          </p>
        </div>
        {
          propsVE.underwayBP && propsVE.gameId !== 3 && <div className={styles.low} />
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
            <Image src={[propsVE.team2.logo, defImg2]} />
          </div>
          {
            teamFaction.team2 && <div className={styles.teamIcon}><Image src={teamFaction.team2} /></div>
          }
        </div>
        <div className={styles.teamName}>
          <p style={{ padding: teamFaction.team2 ? '0 10px' : '0 0 0 32px' }}>{propsVE.team2.name}</p>
        </div>
        {teamSenteIcon.team2}
      </div>
    </div>
  )
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

function csgoInit (team1, team2) {
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
  data.overtime = team1.is_over_time > 0 || team2.is_over_time > 0
  // data.team1.name = team1.team_name
  // data.team2.name = team2.team_name
  data.team1.score = [team1.first_half_score, team1.second_half_score]
  data.team2.score = [team2.first_half_score, team2.second_half_score]
  data.team1.role = [team1.first_half_role, team1.second_half_role]
  data.team2.role = [team2.first_half_role, team2.second_half_role]
  if (data.overtime) {
    data.team1.score.push(team1.over_time_score)
    data.team2.score.push(team2.over_time_score)
    data.team1.role.push(team1.second_half_role)
    data.team2.role.push(team2.second_half_role)
  }
  data.team1.sente = [team1.flag_r1 > 0, team1.flag_w5 > 0, team1.flag_r16 > 0]
  data.team2.sente = [team2.flag_r1 > 0, team2.flag_w5 > 0, team2.flag_r16 > 0]
  // data.team1.sum = data.team1.score.reduce((a, b) => a + b, 0)
  // data.team2.sum = data.team2.score.reduce((a, b) => a + b, 0)
  return data
}

function csgoDataInit (matchList) {
  // csgo 进行中赛况对阵详情数据初始化
  const matchListVE = diffCatch(matchList)({
    current_round: 0,
    team1_score: 0,
    team2_score: 0,
    team1_more_attr: {
      other_more_attr: {
        first_half_score: 0,
        second_half_score: 0,
        over_time_score: 0,
        flag_r1: 0,
        flag_r16: 0,
        flag_w5: 0
      },
      score: 0
    },
    team2_more_attr: {
      other_more_attr: {
        first_half_score: 0,
        second_half_score: 0,
        over_time_score: 0,
        flag_r1: 0,
        flag_r16: 0,
        flag_w5: 0
      },
      score: 0
    }
  })
  const team1 = matchListVE.team1_more_attr.other_more_attr
  const team2 = matchListVE.team2_more_attr.other_more_attr
  const data = csgoInit(team1, team2)
  data.round = team1.current_round || team2.current_round // csgo不转换文字
  data.team1.sum = matchListVE.team1_score
  data.team2.sum = matchListVE.team2_score
  return data
}

export function csgoBothInit (endMatch) {
  // csgo 小局，赛果对阵详情数据初始化
  const endMatchVE = diffCatch(endMatch)({
    team1: {
      round: 0,
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
  const team1 = endMatchVE.team1
  const team2 = endMatchVE.team2
  const data = csgoInit(team1.other_more_attr, team2.other_more_attr)
  data.round = team1.round || team2.round // csgo不转换文字
  data.team1.name = team1.team_name
  data.team2.name = team2.team_name
  data.team1.sum = team1.score
  data.team2.sum = team2.score
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
      other_more_attr: {},
      players: [],
      ban: [],
      is_win: 0
    },
    team2: {
      other_more_attr: {},
      players: [],
      ban: [],
      is_win: 0
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
  data.team1.isWin = endMatchVE.team1.is_win > 0
  data.team2.isWin = endMatchVE.team2.is_win > 0
  data.round = !data.isBottomBoth && endMatchVE.team1.round && inning(endMatchVE.team1.round)
  data.time = timeToTxt(endMatchVE.poor_economy.time, data.status)
  data.gold = toBigNumber(endMatchVE.poor_economy.gold / 1000).toFormat(1)
  if (data.gameId === 5) {
    // dota阵营
    data.team1.camp = endMatchVE.team1.other_more_attr.camp === 'dire' ? 1 : 2
    data.team2.camp = endMatchVE.team2.other_more_attr.camp === 'dire' ? 1 : 2
    // 先手icon bool 数组
    data.team1.sente = [
      endMatchVE.team1.other_more_attr.is_first_blood > 0,
      endMatchVE.team1.other_more_attr.is_ten_kills > 0,
    ]
    data.team2.sente = [
      endMatchVE.team2.other_more_attr.is_first_blood > 0,
      endMatchVE.team2.other_more_attr.is_ten_kills > 0,
    ]
  }
  if (data.gameId === 1) {
    // lol阵营
    data.team1.camp = endMatchVE.team1.other_more_attr.camp === 'blue' ? 1 : 2
    data.team2.camp = endMatchVE.team2.other_more_attr.camp === 'blue' ? 1 : 2
    data.team1.sente = [
      endMatchVE.team1.other_more_attr.first_kills > 0,
      endMatchVE.team1.other_more_attr.five_kills > 0,
    ]
    data.team2.sente = [
      endMatchVE.team2.other_more_attr.first_kills > 0,
      endMatchVE.team2.other_more_attr.five_kills > 0,
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
  if (!data.isBottomBoth && [1, 5].includes(data.gameId)) {
    return (
      <div>
        <GameUnderway {...data} />
        <div style={{ padding: '0 2%' }}>
          {data.gameId === 5 && (
            <BPList isBan team1={endMatchVE.team1.ban} team2={endMatchVE.team2.ban} />)}
          <BPList gameId={data.gameId} team1={endMatchVE.team1.players} team2={endMatchVE.team2.players} />
        </div>
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
    game_start_time: '',
    team1_more_attr: {
      other_more_attr: {},
      players: [],
      ban: []
    },
    team2_more_attr: {
      other_more_attr: {},
      players: [],
      ban: []
    },
    current_round: 0,
    team1_score: 0,
    team2_score: 0
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
    data.team1.score = matchList.team1_score
    data.team2.score = matchList.team2_score
    data.round = inning(matchList.current_round)
    data.time = timeToTxt(matchList.poor_economy.time, data.status)
    data.gold = toBigNumber(matchList.poor_economy.gold / 1000).toFormat(1)
    data.underwayBP = !!(matchList.team1_more_attr.players.length ||
      matchList.team1_more_attr.ban.length ||
      matchList.team2_more_attr.players.length ||
      matchList.team2_more_attr.ban.length)
    // 进行中 但没有选角色，没有ban
    if (data.gameId === 5) {
      // 非小局 进行中 游戏dota
      // 阵营dire=天辉
      data.team1.camp = matchList.team1_more_attr.other_more_attr.camp === 'dire' ? 1 : 2
      data.team2.camp = matchList.team2_more_attr.other_more_attr.camp === 'dire' ? 1 : 2
      // 先手icon bool 数组
      data.team1.sente = [
        matchList.team1_more_attr.other_more_attr.is_first_blood > 0,
        matchList.team1_more_attr.other_more_attr.is_ten_kills > 0,
      ]
      data.team2.sente = [
        matchList.team2_more_attr.other_more_attr.is_first_blood > 0,
        matchList.team2_more_attr.other_more_attr.is_ten_kills > 0,
      ]
      return (
        <div>
          <GameUnderway {...data} />
          <div style={{ padding: '0 2%' }}>
            <BPList isBan team1={matchList.team1_more_attr.ban} team2={matchList.team2_more_attr.ban} />
            <BPList gameId={5} team1={matchList.team1_more_attr.players} team2={matchList.team2_more_attr.players} />
          </div>
        </div>)
    }
    if (data.gameId === 1) {
      // 非小局 进行中 游戏lol
      // 阵营blue=蓝方
      data.team1.camp = matchList.team1_more_attr.other_more_attr.camp === 'blue' ? 1 : 2
      data.team2.camp = matchList.team2_more_attr.other_more_attr.camp === 'blue' ? 1 : 2
      data.team1.sente = [
        matchList.team1_more_attr.other_more_attr.first_kills > 0,
        matchList.team1_more_attr.other_more_attr.five_kills > 0,
      ]
      data.team2.sente = [
        matchList.team2_more_attr.other_more_attr.first_kills > 0,
        matchList.team2_more_attr.other_more_attr.five_kills > 0,
      ]
      return (
        <div>
          <GameUnderway {...data} />
          <div style={{ padding: '0 2%' }}>
            <BPList gameId={1} team1={matchList.team1_more_attr.players} team2={matchList.team2_more_attr.players} />
          </div>
        </div>)
    }
    if (data.gameId === 3) {
      // csgo 显示
      const csgoScore = matchList.score.split(/,|:/)
      data.team1.score = csgoScore[0]
      data.team2.score = csgoScore[1]
      data.csgoMap = matchList.team1_more_attr.other_more_attr.map || matchList.team2_more_attr.other_more_attr.map
      const scgoData = csgoDataInit(matchList)
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
