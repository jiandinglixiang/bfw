import React from 'react'
import styles from './index.module.scss'
import { diffCatch, PropTypes, toBigNumber } from '../../../../tool/util.js'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import def1 from '../../../assets/default_teamred_40.png'
import def2 from '../../../assets/default_teamblue_40.png'
import { csgoCTinit } from '../CsGoNowStatus/CsGoNowStatus.jsx'

function backColor (num) {
  if (num > 20) {
    return '#2FD082'
  }
  if (num > 1) {
    return '#FF864A'
  }
  return '#4F5975'
}

function fontColor (num) {
  if (num > 0) {
    return { color: '#E12727' }
  }
  if (num < 0) {
    return { color: '#2FD082' }
  }
  return null
}

function hpInit (num) {
  if (num > 0) {
    return num
  }
  return 100
}

function BothTable ({ team2Table, team1Table, teamNameLogo }) {
  return (
    <>
      <div className={styles.scrollXContainer}>
        <div style={{ height: '5px' }} />
        <table className={styles.csgoTableBlue}>
          <thead>
            <tr>
              <th><p><Image src={[teamNameLogo.team1.logo, def1]} /></p></th>
              <th><p>HS%</p></th>
              <th><p>KAST</p></th>
              <th><p>K-D</p></th>
              <th><p>FK diff</p></th>
              <th><p>Rating 2.0</p></th>
              <th><p>K/D/A</p></th>
              <th><p>ADR</p></th>
            </tr>
          </thead>
          <tbody>
            {
              team1Table.map((value, key) => {
                const valueVE = diffCatch(value)({
                  hs: 0,
                  score: 0,
                  deaths: 0,
                  kast: 0
                })
                let hskpi = 0
                const hs = valueVE.hs || 0
                if (hs && valueVE.score) {
                  hskpi = toBigNumber(valueVE.hs / valueVE.score * 100).toFormat(1, 3)
                }
                return (
                  <tr key={key}>
                    <td><p>{valueVE.nick}</p></td>
                    <td><p>{hs}/{hskpi}%</p></td>
                    <td><p className={styles.bigTxt2}>{valueVE.kast}%</p></td>
                    <td><p style={fontColor(valueVE.score - valueVE.deaths)}>{valueVE.score - valueVE.deaths}</p></td>
                    <td><p style={fontColor(valueVE.fk_diff)}>{valueVE.fk_diff}</p></td>
                    <td><p>{valueVE.rating}</p></td>
                    <td>
                      <p>
                        {valueVE.score}/<span style={{ color: '#70F7E3' }}>{valueVE.deaths}</span>/{valueVE.assists}
                      </p>
                    </td>
                    <td><p>{valueVE.damage_pr_round}</p></td>
                  </tr>
                )
              })
            }
            {
              !team1Table.length && [0, 1, 2, 3, 4, 5].map(key => (<tr key={key}>
                <td colSpan={8} />
              </tr>))
            }
          </tbody>
        </table>
        <div style={{ height: '5px' }} />
      </div>
      <div className={styles.scrollXContainer}>
        <table className={styles.csgoTableYellow}>
          <thead>
            <tr>
              <th><p><Image src={[teamNameLogo.team2.logo, def2]} /></p></th>
              <th><p>HS%</p></th>
              <th><p>KAST</p></th>
              <th><p>K-D</p></th>
              <th><p>FK diff</p></th>
              <th><p>Rating 2.0</p></th>
              <th><p>K/D/A</p></th>
              <th><p>ADR</p></th>
            </tr>
          </thead>
          <tbody>
            {
              team2Table.map((value, key) => {
                const valueVE = diffCatch(value)({
                  hs: 0,
                  score: 0,
                  deaths: 0,
                  kast: 0,
                })
                let hskpi = 0
                const hs = valueVE.hs || 0
                if (hs && valueVE.score) {
                  hskpi = toBigNumber(valueVE.hs / valueVE.score * 100).toFormat(1, 3)
                }
                return (
                  <tr key={key}>
                    <td><p>{valueVE.nick}</p></td>
                    <td><p>{hs}/{hskpi}%</p></td>
                    <td><p className={styles.bigTxt2}>{valueVE.kast}%</p></td>
                    <td><p style={fontColor(valueVE.score - valueVE.deaths)}>{valueVE.score - valueVE.deaths}</p></td>
                    <td><p style={fontColor(valueVE.fk_diff)}>{valueVE.fk_diff}</p></td>
                    <td><p>{valueVE.rating}</p></td>
                    <td><p>{valueVE.score}/<span style={{ color: '#70F7E3' }}>{valueVE.deaths}</span>/{valueVE.assists}
                    </p></td>
                    <td><p>{valueVE.damage_pr_round}</p></td>
                  </tr>
                )
              })
            }
            {
              !team2Table.length && [0, 1, 2, 3, 4, 5].map(key => (<tr key={key}>
                <td colSpan={8} />
              </tr>))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

function MatchTable ({ team2Table, team1Table, teamNameLogo }) {
  return (<>
    <table className={styles.csgoTableBlue}>
      <thead>
        <tr>
          <th><p><Image src={[teamNameLogo.team1.logo, def1]} /></p></th>
          <th className={styles.alignItemsLeft}><p>血量</p></th>
          <th><p>K/D/A</p></th>
          <th><p>武器</p></th>
          <th><p>护甲</p></th>
          <th><p>$</p></th>
          <th><p>ADR</p></th>
        </tr>
      </thead>
      <tbody>
        {
          team1Table.map((value, key) => {
            const valueVE = diffCatch(value)({ hp: 0 })
            return (
              <tr key={key} className={valueVE.hp > 0 ? null : styles.gameOver}>
                <td><p>{valueVE.nick}</p></td>
                <td className={styles.alignItemsLeft}>
                  <p className={styles.bigTxt}>{valueVE.hp}</p>
                  <div
                    className={styles.haemalStrandIcon}
                    style={{
                      backgroundColor: backColor(valueVE.hp),
                      width: hpInit(valueVE.hp) + '%'
                    }} />
                </td>
                <td><p>{valueVE.score || 0}/{valueVE.deaths || 0}/{valueVE.assists || 0}</p></td>
                <td><Image src={valueVE.weapon_logo} /></td>
                <td><Image src={valueVE.equipment_logo} /></td>
                <td><p className={styles.bigTxt}>{valueVE.money}</p></td>
                <td><p>{valueVE.damage_pr_round}</p></td>
              </tr>
            )
          })
        }
        {
          !team1Table.length && [0, 1, 2, 3, 4, 5].map(key => (<tr key={key}>
            <td colSpan={7} />
          </tr>))
        }
      </tbody>
    </table>
    <div style={{ height: '5px' }} />
    <table className={styles.csgoTableYellow}>
      <thead>
        <tr>
          <th><p><Image src={[teamNameLogo.team2.logo, def2]} /></p></th>
          <th className={styles.alignItemsLeft}><p>血量</p></th>
          <th><p>K/D/A</p></th>
          <th><p>武器</p></th>
          <th><p>护甲</p></th>
          <th><p>$</p></th>
          <th><p>ADR</p></th>
        </tr>
      </thead>
      <tbody>
        {
          team2Table.map((value, key) => {
            const valueVE = diffCatch(value)({ hp: 0 })
            return (
              <tr key={key} className={valueVE.hp > 0 ? '' : styles.gameOver}>
                <td><p>{valueVE.nick}</p></td>
                <td className={styles.alignItemsLeft}>
                  <p className={styles.bigTxt}>{valueVE.hp}</p>
                  <div
                    className={styles.haemalStrandIcon}
                    style={{
                      backgroundColor: backColor(valueVE.hp),
                      width: hpInit(valueVE.hp) + '%'
                    }} />
                </td>
                <td><p>{valueVE.score || 0}/{valueVE.deaths || 0}/{valueVE.assists || 0}</p></td>
                <td><Image src={valueVE.weapon_logo} /></td>
                <td><Image src={valueVE.equipment_logo} /></td>
                <td><p className={styles.bigTxt}>{valueVE.money}</p></td>
                <td><p>{valueVE.damage_pr_round}</p></td>
              </tr>
            )
          })
        }
        {
          !team2Table.length && [0, 1, 2, 3, 4, 5].map(key => (<tr key={key}>
            <td colSpan={7} />
          </tr>))
        }
      </tbody>
    </table>
  </>)
}

function CsGoMapImg (props) {
  let propsVE = diffCatch(props)({
    isBoth: false
  })
  let overTxt
  let team1Table
  let team2Table
  let first
  let second
  let showBottom
  const teamNameLogo = {
    team1: {
      name: '',
      logo: ''
    },
    team2: {
      name: '',
      logo: ''
    }
  }
  const realHistory = {
    first: {
      start: false,
      team1: {
        role: '',
        logo: '',
        score: '',
        icon: []
      },
      team2: {
        role: '',
        logo: '',
        score: '',
        icon: []
      },
    },
    second: {
      start: false,
      team1: {
        role: '',
        logo: '',
        score: '',
        icon: []
      },
      team2: {
        role: '',
        logo: '',
        score: '',
        icon: []
      },
    }
  }
  if (propsVE.isBoth) {
    propsVE = diffCatch(props)({
      endMatch: {
        team1: {
          players: []
        },
        team2: {
          players: []
        },
        real_history: {
          first: [],
          second: []
        }
      }
    })
    showBottom = true
    team1Table = propsVE.endMatch.team1.players
    team2Table = propsVE.endMatch.team2.players
    first = propsVE.endMatch.real_history.first
    second = propsVE.endMatch.real_history.second
    teamNameLogo.team1.name = propsVE.endMatch.team1.team_name
    teamNameLogo.team2.name = propsVE.endMatch.team2.team_name
    teamNameLogo.team1.logo = propsVE.endMatch.team1.team_logo
    teamNameLogo.team2.logo = propsVE.endMatch.team2.team_logo
    const team1MoreAttr = propsVE.endMatch.team1.other_more_attr
    const team2MoreAttr = propsVE.endMatch.team2.other_more_attr
    realHistory.first.team1.role = team1MoreAttr.first_half_role
    realHistory.first.team2.role = team2MoreAttr.first_half_role
    realHistory.second.team1.role = team1MoreAttr.second_half_role
    realHistory.second.team2.role = team2MoreAttr.second_half_role
    realHistory.first.team1.score = team1MoreAttr.first_half_score
    realHistory.first.team2.score = team2MoreAttr.first_half_score
    realHistory.second.team1.score = team1MoreAttr.second_half_score
    realHistory.second.team2.score = team2MoreAttr.second_half_score
    realHistory.first.team1.logo = propsVE.endMatch.team1.team_logo
    realHistory.first.team2.logo = propsVE.endMatch.team2.team_logo
    realHistory.second.team1.logo = propsVE.endMatch.team1.team_logo
    realHistory.second.team2.logo = propsVE.endMatch.team2.team_logo
  } else {
    propsVE = diffCatch(props)({
      matchList: {
        status: 0,
        team1_more_attr: {
          other_more_attr: {
            current_round: 1,
            is_over_time: 0
          }
        },
        team2_more_attr: {
          other_more_attr: {}
        }
      },
      matchResult: {
        match_list: {
          real_players: [],
          real_history: {
            first: [],
            second: []
          }
        }
      }
    })
    showBottom = propsVE.matchList.status > 0
    team1Table = propsVE.matchResult.match_list.real_players[0] || []
    team2Table = propsVE.matchResult.match_list.real_players[1] || []
    // 成员数据
    first = propsVE.matchResult.match_list.real_history.first
    second = propsVE.matchResult.match_list.real_history.second
    teamNameLogo.team1.name = propsVE.matchList.host_team_name
    teamNameLogo.team2.name = propsVE.matchList.guest_team_name
    teamNameLogo.team1.logo = propsVE.matchList.host_team_logo
    teamNameLogo.team2.logo = propsVE.matchList.guest_team_logo
    const team1MoreAttrs = propsVE.matchList.team1_more_attr.other_more_attr
    const team2MoreAttrs = propsVE.matchList.team2_more_attr.other_more_attr
    realHistory.first.team1.role = team1MoreAttrs.first_half_role
    realHistory.first.team2.role = team2MoreAttrs.first_half_role
    realHistory.second.team1.role = team1MoreAttrs.second_half_role
    realHistory.second.team2.role = team2MoreAttrs.second_half_role
    realHistory.first.team1.score = team1MoreAttrs.first_half_score
    realHistory.first.team2.score = team2MoreAttrs.first_half_score
    realHistory.second.team1.score = team1MoreAttrs.second_half_score
    realHistory.second.team2.score = team2MoreAttrs.second_half_score
    realHistory.first.team1.logo = propsVE.matchList.host_team_logo
    realHistory.first.team2.logo = propsVE.matchList.guest_team_logo
    realHistory.second.team1.logo = propsVE.matchList.host_team_logo
    realHistory.second.team2.logo = propsVE.matchList.guest_team_logo
    realHistory.first.start = team1MoreAttrs.current_round > 0
    realHistory.second.start = team1MoreAttrs.current_round > 15
    if (showBottom) {
      if (team1MoreAttrs.is_over_time > 0) {
        overTxt = `加时赛 RD${team1MoreAttrs.current_round}`
      } else {
        overTxt = `${realHistory.second.start ? '下半场' : '上半场'} RD${team1MoreAttrs.current_round}`
      }
    }
  }
  first.length > 30 && (first = first.slice(0, 30))
  first.forEach(function (val) {
    if (val.team_role === realHistory.first.team1.role) {
      realHistory.first.team1.icon.push(val.logo)
    } else if (val.team_role === realHistory.first.team2.role) {
      realHistory.first.team2.icon.push(val.logo)
    }
  })
  second.length > 30 && (second = second.slice(0, 30))
  second.forEach(function (val) {
    if (val.team_role === realHistory.second.team1.role) {
      realHistory.second.team1.icon.push(val.logo)
    } else if (val.team_role === realHistory.second.team2.role) {
      realHistory.second.team2.icon.push(val.logo)
    }
  })

  const one = diffCatch(team1Table[0])({ map: '' })

  return <div>
    <div style={{ height: '10px' }} />
    {showBottom && <p className={`${styles.mapRight} ${styles['csgoMap-' + one.map]}`}>{one.map}</p>}
    {overTxt && <p className={styles.extraTimeTxt}>{overTxt}</p>}
    {propsVE.isBoth ? (
      <BothTable
        teamNameLogo={teamNameLogo}
        team1Table={team1Table}
        team2Table={team2Table}
      />
    ) : (
      <MatchTable
        teamNameLogo={teamNameLogo}
        team1Table={team1Table}
        team2Table={team2Table}
      />
    )}
    <div style={{ height: '10px' }} />
    {
      showBottom && [
        <div key={0} className={styles.operatingRecord}>
          <div className={styles.topTitle}>
            <Image src={csgoCTinit(true, 0, realHistory.first.team1.role)} />
            <b>{realHistory.first.team1.score}</b>
            <p>上半场</p>
            <b>{realHistory.first.team2.score}</b>
            <Image src={csgoCTinit(false, 0, realHistory.first.team2.role)} />
          </div>
          <div className={styles.teamRed}>
            <Image src={[realHistory.first.team1.logo, def1]} />
            <div>
              {
                realHistory.first.team1.icon.map((val, index) => {
                  return <Image src={val} key={index} />
                })
              }
            </div>
          </div>
          <div className={styles.teamBlue}>
            <Image src={[realHistory.first.team2.logo, def2]} />
            <div>
              {
                realHistory.first.team2.icon.map((val, index) => {
                  if (val) {
                    return <Image src={val} key={index} />
                  }
                  return null
                })
              }
            </div>
          </div>
        </div>,
        <div key={3} style={{ height: '5px' }} />,
        <div key={1} className={styles.operatingRecord}>
          <div className={styles.topTitle}>
            <Image src={csgoCTinit(true, 1, realHistory.second.team1.role)} />
            <b>{realHistory.second.team1.score}</b>
            <p>下半场</p>
            <b>{realHistory.second.team2.score}</b>
            <Image src={csgoCTinit(false, 1, realHistory.second.team2.role)} />
          </div>
          <div className={styles.teamRed}>
            <Image src={[realHistory.second.team1.logo, def1]} />
            <div>
              {
                realHistory.second.team1.icon.map((val, index) => {
                  return <Image src={val} key={index} />
                })
              }
            </div>
          </div>
          <div className={styles.teamBlue}>
            <Image src={[realHistory.second.team2.logo, def2]} />
            <div>
              {
                realHistory.second.team2.icon.map((val, index) => {
                  if (val) {
                    return <Image src={val} key={index} />
                  }
                  return null
                })
              }
            </div>
          </div>
        </div>
      ]
    }
  </div>
}

export default CsGoMapImg

MatchTable.propTypes = {
  team1Table: PropTypes.array,
  team2Table: PropTypes.array,
  teamNameLogo: PropTypes.object
}
BothTable.propTypes = {
  team1Table: PropTypes.array,
  team2Table: PropTypes.array,
  teamNameLogo: PropTypes.object
}
