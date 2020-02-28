import React from 'react'
import styles from './index.module.scss'
import tianhui from '../../../assets/tianhui_type2.png'
import yemo from '../../../assets/nightdemon_type2.png'
import { diffCatch, formatDate, inning, toBigNumber } from '../../../../tool/util.js'
import defImg1 from '../../../assets/default_teamred_40.png'
import defImg2 from '../../../assets/default_teamblue_40.png'
import dota from '../../../assets/default_teamblue_40.png'
import firstBlood from '../../../assets/firstblood.png'
import deckills from '../../../assets/deckills.png'
import { scoreListReduce } from '../../../../bfw-web/page/AnalysisData/components/TameNowStatus'
import { gameRound } from '../../home/MatchItem/MatchItem.jsx'
import { comparisonUtil } from '../details.jsx'

/*
function Underway () {
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div><img src={yemo} /></div>
        <div className={styles.logo}><img src={dota} /></div>
        <b>6</b>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
    <div className={styles.center}>
      {/!*    <div className={styles.boutTime}>
        <p>
          第二局56:19
        </p>
      </div>
      *!/}
      {/!*      <div className={styles.overScore}>
        <p>88</p>
        <b>-</b>
        <p>88</p>
      </div>
      <div className={styles.overTxt}><p>已结束</p></div>
      *!/}
      {/!*      <div className={styles.middle}>
        <p className={styles.notStarted}><span>未开始</span><span>08:00</span></p>
      </div> *!/}
      <div className={styles.middle}>
        <p className={styles.boutTime}>
          第二局56:19
        </p>
      </div>
      <div className={styles.low}>
        <p className={styles.notStarted}><span>2019-12-13</span><span>BO5</span></p>
      </div>
      <div className={`${styles.high} ${styles.middle} ${styles.low}`}>
        <p className={styles.difference}><span>差-11.3</span></p>
      </div>
    </div>
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <b className={styles.colorYellow}>6</b>
        <div className={styles.logo}><img src={dota} /></div>
        <div className={styles.icon2}><img src={tianhui} /></div>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
  </div>
}

function GameOver () {
  return <div className={styles.content}>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div><img src={yemo} /></div>
        <div className={styles.logo}><img src={dota} /></div>
        <b>6</b>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
    <div className={styles.center}>
      {/!*    <div className={styles.boutTime}>
        <p>
          第二局56:19
        </p>
      </div>
      *!/}
      {/!*      <div className={styles.overScore}>
        <p>88</p>
        <b>-</b>
        <p>88</p>
      </div>
      <div className={styles.overTxt}><p>已结束</p></div>
      *!/}
      {/!*      <div className={styles.middle}>
        <p className={styles.notStarted}><span>未开始</span><span>08:00</span></p>
      </div> *!/}
      <div className={styles.middle}>
        <p className={styles.boutTime}>
          第二局56:19
        </p>
      </div>
      <div className={styles.low}>
        <p className={styles.notStarted}><span>2019-12-13</span><span>BO5</span></p>
      </div>
      <div className={`${styles.high} ${styles.middle} ${styles.low}`}>
        <p className={styles.difference}><span>差-11.3</span></p>
      </div>
    </div>
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <b className={styles.colorYellow}>6</b>
        <div className={styles.logo}><img src={dota} /></div>
        <div className={styles.icon2}><img src={tianhui} /></div>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
  </div>
}
*/

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

function LogoName ({ matchList, page, right }) {
  // dota
  let icon = null
  let score = null
  let iconList = null
  const underway = matchList.status === 1
  if (underway && [2, 5].includes(page)) {
    // 显示icon
    icon = <div className={styles.teamIcon}><img src={right ? yemo : tianhui} /></div>
  }
  if (page === 5) {
    // 进行中或小局页面
    score = <b>{(matchList.score.split(/:|,/)[right ? 1 : 0]) || 0}</b>
  } else if (underway) {
    // 进行中或小局页面
    score = <b>{(matchList.score.split(/:|,/)[right ? 1 : 0]) || 0}</b>
  }
  if ([2, 4].includes(page)) {
    iconList = <div className={styles.aBloodIcon}>
      {matchList.is_first_blood > 0 ? <img src={firstBlood} /> : <span />}
      {matchList.is_ten_kills > 0 ? <img src={deckills} /> : <span />}
    </div>
  }
  if (right) {
    return <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        {score}
        <div className={styles.logo}>
          <img src={matchList.guest_team_logo || defImg2} />
        </div>
        {icon}
      </div>
      <div className={styles.teamName}>
        <p style={{
          paddingLeft: score ? '32px' : '5px',
          paddingRight: icon ? '32px' : '5px'
        }}>
          {matchList.guest_team_name}
        </p>
      </div>
      {iconList}
    </div>
  }
  return <div className={styles.first}>
    <div className={styles.topLogoIcon1}>
      {icon}
      <div className={styles.logo}>
        <img src={matchList.host_team_logo || defImg1} />
      </div>
      {score}
    </div>
    <div className={styles.teamName}>
      <p style={{
        paddingLeft: icon ? '32px' : 0,
        paddingRight: score ? '32px' : 0
      }}>{matchList.host_team_name}
      </p>
    </div>
    {iconList}
  </div>
}

function notStarted (gameId, matchList) {
  let time = formatDate(matchList.game_start_time, 'YYYY-MM-DD+HH:mm')
  time = time.split('+')
  return <div>
    <div className={styles.first}>
      <div className={styles.topLogoIcon1}>
        <div className={styles.logo}>
          <img src={dota} />
        </div>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
    <div className={styles.center}>
      <div className={styles.middle}>
        <p className={styles.notStarted}><span>未开始</span><span>{time[1]}</span></p>
      </div>
      <div className={styles.low}>
        <p className={styles.notStarted}><span>{time[0]}</span><span>{matchList.match_rules}</span></p>
      </div>
    </div>
    <div className={styles.last}>
      <div className={styles.topLogoIcon2}>
        <b className={styles.colorYellow}>6</b>
        <div className={styles.logo}><img src={dota} /></div>
        <div className={styles.icon2}><img src={tianhui} /></div>
      </div>
      <div className={styles.teamName}>
        <p>Name</p>
      </div>
      <div className={styles.aBloodIcon}>
        <img src={dota} />
        <img src={dota} />
      </div>
    </div>
  </div>
}

function underway (gameId, matchList, page) {
  // let nowRound = matchList.odds_list[matchList.odds_list, length - 1]
  // nowRound = diffCatch(nowRound)({
  //   odds: [],
  //   play_name: [],
  //   round: ''
  // })
  const poorEconomy = toBigNumber(matchList.poor_economy.gold / 1000).toFormat(1)
  return <div className={styles.center}>
    <div className={styles.middle}>
      <p className={page === 4 ? styles.boutOver : styles.boutUnderway}>
        第一局 56:19
      </p>
    </div>
    {!([0, 1].includes(page)) && <div className={styles.low} />}
    <div className={styles.low}>
      <p className={styles.difference}><span>差{poorEconomy}k</span></p>
    </div>
  </div>
}

function gameOver (matchList, page) {
  const score = matchList.score.split(/:|,/)
  return <div className={styles.center}>
    <div className={styles.overScore}>
      <p>{score[0]}</p>
      <b>-</b>
      <p>{score[1]}</p>
    </div>
    <div className={styles.overTxt}><p>已结束</p></div>
  </div>
}

function CenterStatus ({ gameId, matchList, page }) {
  if (gameId === 5) {
    if (matchList.status === 1) {
      return underway(gameId, matchList, page)
    } else if (matchList.status === 2) {
      return gameOver(matchList, page)
    } else {
      return notStarted(gameId, matchList, page)
    }
  }
  return null
}

function teamIcon ({ gameId, page }) {
  // 赛况显示
  if ([2, 4].includes(page) && gameId === 5) {
    return {
      right: <div className={styles.teamIcon}><img src={tianhui} /></div>,
      left: <div className={styles.teamIcon}><img src={yemo} /></div>
    }
  }
  return {}
}

function teamScore ({ gameId, page, matchList }) {
  // 赛况显示
  if (gameId === 5 && matchList.status === 1) {
    const score = matchList.score.split(/:|,/).map(v => parseInt(v))
    return {
      right: <b style={{ color: page === 4 && score[1] > score[0] ? styles.colorYellow : styles.colorGray }}>
        {score[1]}</b>,
      left: <b style={{ color: page === 4 && score[0] > score[1] ? styles.colorYellow : styles.colorGray }}>
        {score[0]}</b>,
    }
  }
  return {}
}

function iconList ({ gameId, page, matchList }) {
  if (gameId === 5 && [2, 4].includes(page)) {
    return {
      left: <div className={styles.aBloodIcon}>
        {matchList.is_first_blood > 0 ? <img src={firstBlood} /> : <span />}
        {matchList.is_ten_kills > 0 ? <img src={deckills} /> : <span />}
      </div>,
      right: <div className={styles.aBloodIcon}>
        {matchList.is_ten_kills > 0 ? <img src={deckills} /> : <span />}
        {matchList.is_first_blood > 0 ? <img src={firstBlood} /> : <span />}
      </div>,
    }
  }
  return {}
}

function GameUnderway (props) {
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
  return <div />
  /*  const equalStatus = comparisonUtil(propsVE.gameId, propsVE.status)
    const teamFaction = teamIcon({
      gameId,
      page
    })
    const score = teamScore({
      gameId,
      page,
      matchList
    })
    const iconLists = iconList({
      gameId,
      page,
      matchList
    })
    return <div className={styles.content}>
      <div className={styles.first}>
        <div className={styles.topLogoIcon1}>
          {teamFaction.left}
          <div className={styles.logo}>
            <img src={matchList.host_team_logo || defImg1} />
          </div>
          {score.left}
        </div>
        <div className={styles.teamName}>
          <p style={{
            paddingLeft: teamFaction.left ? '32px' : '5px',
            paddingRight: score.left ? '32px' : '5px'
          }}>{matchList.host_team_name}</p>
        </div>
        {iconLists.left}
      </div>
      <CenterStatus gameId={gameId} matchList={matchList} page={page} />
      <div className={styles.last}>
        <div className={styles.topLogoIcon2}>
          {score.right}
          <div className={styles.logo}>
            <img src={matchList.guest_team_logo || defImg2} />
          </div>
          {teamFaction.right}
        </div>
        <div className={styles.teamName}>
          <p style={{
            paddingLeft: score.right ? '32px' : '5px',
            paddingRight: teamFaction.right ? '32px' : '5px'
          }}>{matchList.guest_team_name}</p>
        </div>
        {iconLists.right}
      </div>
    </div> */
}

export function statusToTxt (s) {
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

function TopLogoNameScore (props) {
  const propsVE = diffCatch(props)({
    isBoth: false,
    endMatch: {
      poor_economy: {
        gold: 0
      },
      team1: {},
      team2: {},
    },
    matchList: {
      poor_economy: { gold: 0 },
      score_list: [],
      score: '',
      game_start_time: '',
      team1_more_attr: {
        other_more_attr: {}
      },
      team2_more_attr: {
        other_more_attr: {}
      }
    }
  })
  const data = {
    gameId: 0,
    status: 0,
    matchRules: '',
    time: [],
    round: '',
    gold: 0,
    team1: {},
    team2: {}
  }
  const equalStatus = comparisonUtil(data.gameId, data.status)

  if (propsVE.isBoth) {
    // 小局页
    data.status = propsVE.endMatch.team1.status
    data.gameId = propsVE.endMatch.team1.game_type_id
    data.team1.logo = propsVE.endMatch.team1.team_logo
    data.team2.logo = propsVE.endMatch.team2.team_logo
    data.team1.name = propsVE.endMatch.team1.team_name
    data.team2.name = propsVE.endMatch.team2.team_name
    data.team1.score = propsVE.endMatch.team1.score
    data.team2.score = propsVE.endMatch.team2.score
    if (data.gameId === 5) {
      data.team1.camp = propsVE.endMatch.team1.camp === 'dire'
      // 阵营
      data.team2.camp = propsVE.endMatch.team2.camp === 'dire'
    } else if (data.gameId === 1) {
      data.team1.camp = propsVE.endMatch.team1.camp === 'blue'
      // 阵营
      data.team2.camp = propsVE.endMatch.team2.camp === 'blue'
    }

    data.round = propsVE.endMatch.team1.round && inning(propsVE.endMatch.team1.round)
    data.time = timeToTxt(propsVE.endMatch.poor_economy.time, data.status)
    data.gold = toBigNumber(propsVE.endMatch.poor_economy.gold / 1000).toFormat(1)
  } else {
    // 详情页
    data.status = propsVE.matchList.status
    data.gameId = propsVE.matchList.game_type_id
    data.team1.logo = propsVE.matchList.host_team_logo
    data.team1.name = propsVE.matchList.host_team_name
    data.team2.logo = propsVE.matchList.guest_team_logo
    data.team2.name = propsVE.matchList.guest_team_name
    if (data.status === 1) {
      // 进行中
      const score = scoreListReduce(propsVE.matchList.score_list)
      data.team1.score = score[0]
      data.team2.score = score[1]
      if (data.gameId === 5) {
        data.team1.camp = propsVE.matchList.team1_more_attr.other_more_attr.camp === 'dire'
        // 阵营dire天辉
        data.team2.camp = propsVE.matchList.team2_more_attr.other_more_attr.camp === 'dire'
      } else if (data.gameId === 1) {
        data.team1.camp = propsVE.matchList.team1_more_attr.other_more_attr.camp === 'blue'
        // 阵营蓝方
        data.team2.camp = propsVE.matchList.team2_more_attr.other_more_attr.camp === 'blue'
      }
      data.round = gameRound(propsVE.matchList.score_list, propsVE.matchList.round_total)
      data.time = timeToTxt(propsVE.matchList.poor_economy.time, data.status)
      data.gold = toBigNumber(propsVE.matchList.poor_economy.gold / 1000).toFormat(1)
    }
  }

  if (data.status === 1 || propsVE.isBoth) {
    return <GameUnderway {...data} />
  }
  if (data.status === 0) {
    // 未开始
    (() => {
      let time = formatDate(propsVE.matchList.game_start_time, 'YYYY-MM-DD+HH:mm')
      time = time.split('+')
      data.time = time
    })()
    data.matchRules = propsVE.matchList.match_rules
  } else {
    // 已结束其他
    (() => {
      const scoreArr = propsVE.matchList.score.split(/:|,/)
      data.team1.score = scoreArr[0]
      data.team2.score = scoreArr[1]
    })()
  }
  return <GameOverOrNotStarted {...data} />
}

export default TopLogoNameScore

TopLogoNameScore.propTypes = {}
