import React from 'react'
import styles from './index.module.scss'
import tttt from '../../../assets/terrorists.png'
import ctct from '../../../assets/counter.png'
import { diffCatch, PropTypes, toBigNumber } from '../../../../tool/util.js'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import def1 from '../../../assets/default_teamred_40.png'
import def2 from '../../../assets/default_teamblue_40.png'

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

function BothTable ({ team2Table, team1Table }) {
  return (
    <>
      <div className={styles.scrollXContainer}>
        <div style={{ height: '5px' }} />
        <table className={styles.csgoTableBlue} >
          <thead>
            <tr>
              <th><p>UOL</p></th>
              <th><p>HS%</p></th>
              <th><p>KAST</p></th>
              <th><p>K-D</p></th>
              <th><p>FK driff</p></th>
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
                    <td><p>-</p></td>
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
              !team1Table.length && [<tr key={0} />, <tr key={1} />, <tr key={2} />, < tr key={3} />, <tr key={4} />]
            }
          </tbody>
        </table>
        <div style={{ height: '5px' }} />
      </div>
      <div className={styles.scrollXContainer}>
        <table className={styles.csgoTableYellow}>
          <thead>
            <tr>
              <th><p>UOL</p></th>
              <th><p>HS%</p></th>
              <th><p>KAST</p></th>
              <th><p>K-D</p></th>
              <th><p>FK driff</p></th>
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
                    <td><p>-</p></td>
                    <td><p style={fontColor(valueVE.score - valueVE.deaths)}>{valueVE.score - valueVE.deaths}</p></td>
                    <td><p style={fontColor(valueVE.fk_diff)}>{valueVE.fk_diff}</p></td>
                    <td><p>{valueVE.rating}</p></td>
                    <td><p>{valueVE.score}/<span style={{ color: '#70F7E3' }}>{valueVE.deaths}</span>/{valueVE.assists}</p></td>
                    <td><p>{valueVE.damage_pr_round}</p></td>
                  </tr>
                )
              })
            }
            {
              !team2Table.length && [<tr key={0} />, <tr key={1} />, <tr key={2} />, < tr key={3} />, <tr key={4} />]
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

function MatchTable ({ team2Table, team1Table }) {
  return (<>
    <table className={styles.csgoTableBlue}>
      <thead>
        <tr>
          <th><p>UOL</p></th>
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
          <th><p>UOL</p></th>
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
  let overtime = false
  let team1Table
  let team2Table
  let first
  let second
  let showBottom = false
  const realHistory = {
    first: {
      start: false,
      team1: {
        role: true,
        logo: '',
        score: '',
        icon: []
      },
      team2: {
        role: true,
        logo: '',
        score: '',
        icon: []
      },
    },
    second: {
      start: false,
      team1: {
        role: true,
        logo: '',
        score: '',
        icon: []
      },
      team2: {
        role: true,
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
    const team1MoreAttrs = propsVE.matchList.team1_more_attr.other_more_attr
    const team2MoreAttrs = propsVE.matchList.team2_more_attr.other_more_attr
    overtime = team1MoreAttrs.is_over_time > 1
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
  }
  first.forEach(function (val) {
    if (val.team_role === realHistory.first.team1.role) {
      realHistory.first.team1.icon.push(val.logo)
    } else {
      realHistory.first.team2.icon.push(val.logo)
    }
  })
  second.forEach(function (val) {
    if (val.team_role === realHistory.second.team2.role) {
      realHistory.second.team2.icon.push(val.logo)
    } else {
      realHistory.second.team1.icon.push(val.logo)
    }
  })

  const one = diffCatch(team1Table[0])({ map: '' })

  return <div>
    <div style={{ height: '10px' }} />
    {showBottom && <p className={`${styles.mapRight} ${styles['csgoMap-' + one.map]}`}>{one.map}</p>}
    {overtime && <p className={styles.extraTimeTxt}>加时赛</p>}
    {propsVE.isBoth ? <BothTable team1Table={team1Table} team2Table={team2Table} /> : <MatchTable
      team1Table={team1Table} team2Table={team2Table} />}
    <div style={{ height: '10px' }} />
    {
      showBottom && [
        <div key={0} className={styles.operatingRecord}>
          <div className={styles.topTitle}>
            <Image src={realHistory.first.team1.role === 'CT' ? ctct : tttt} />
            <b>{realHistory.first.team1.score}</b>
            <p>上半场</p>
            <b>{realHistory.first.team2.score}</b>
            <Image src={realHistory.first.team2.role === 'T' ? tttt : ctct} />
          </div>
          <div className={styles.teamRed}>
            <Image src={[realHistory.first.team1.logo, def1]} />
            <div className={styles.hodlRight}>
              {
                realHistory.first.team1.icon.map((val, index) => {
                  if (val) {
                    return <Image src={val} key={index} />
                  }
                  return null
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
            <Image src={realHistory.second.team1.role === 'T' ? tttt : ctct} />
            <b>{realHistory.second.team1.score}</b>
            <p>下半场</p>
            <b>{realHistory.second.team2.score}</b>
            <Image src={realHistory.second.team2.role === 'CT' ? ctct : tttt} />
          </div>
          <div className={styles.teamRed}>
            <Image src={[realHistory.second.team1.logo, def1]} />
            <div className={styles.hodlRight}>
              {
                realHistory.second.team1.icon.map((val, index) => {
                  if (val) {
                    return <Image src={val} key={index} />
                  }
                  return null
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
  team2Table: PropTypes.array,
  team1Table: PropTypes.array
}
BothTable.propTypes = {
  team2Table: PropTypes.array,
  team1Table: PropTypes.array
}
