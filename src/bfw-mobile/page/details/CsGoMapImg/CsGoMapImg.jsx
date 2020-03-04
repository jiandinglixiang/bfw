import React from 'react'
import styles from './index.module.scss'
import tttt from '../../../assets/terrorists.png'
import ctct from '../../../assets/counter.png'
import { diffCatch, PropTypes, toBigNumber } from '../../../../tool/util.js'

function backColor (num) {
  if (num > 20) {
    return '#2FD082'
  }
  if (num > 1) {
    return '#FF864A'
  }
  return '#4F5975'
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
      <table className={styles.csgoTableBlue}>
        <thead>
          <tr>
            <th><p>UOL</p></th>
            <th><p>HS%</p></th>
            <th><p>KAST</p></th>
            <th><p>K-D</p></th>
            <th><p>FK driff</p></th>
            <th><p>Rating<br /> 2.0</p></th>
            <th><p>K/D/A</p></th>
            <th><p>ADR</p></th>
          </tr>
        </thead>
        <tbody>
          {
            team1Table.map((value, key) => {
              const valueVE = diffCatch(value)({
                hs: 0,
                kills: 0,
                deaths: 0,
              })
              const hskpi = toBigNumber(valueVE.hs / valueVE.kills * 100).toFormat(1)
              return (
                <tr key={key}>
                  <td><p>{valueVE.name}</p></td>
                  <td><p>{valueVE.hs}/{hskpi}</p></td>
                  <td><p>-</p></td>
                  <td><p>{valueVE.kills - valueVE.deaths}</p></td>
                  <td>{valueVE.fk_diff}</td>
                  <td><p>{valueVE.rating}</p></td>
                  <td><p>{valueVE.kills}/{valueVE.deaths}/{valueVE.assists}</p></td>
                  <td><p>{valueVE.damage_pr_round}</p></td>
                </tr>
              )
            })
          }
          {
            !team1Table.length && [<tr key={0} />, <tr key={1} />, <tr key={2} />, < tr key={3} />, <tr key={4} />]
          }
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div />
            </td>
          </tr>
        </tfoot>
      </table>
      <table className={styles.csgoTableYellow}>
        <thead>
          <tr>
            <th><p>UOL</p></th>
            <th><p>HS%</p></th>
            <th><p>KAST</p></th>
            <th><p>K-D</p></th>
            <th><p>FK driff</p></th>
            <th><p>Rating<br /> 2.0</p></th>
            <th><p>K/D/A</p></th>
            <th><p>ADR</p></th>
          </tr>
        </thead>
        <tbody>
          {
            team2Table.map((value, key) => {
              const valueVE = diffCatch(value)({
                hs: 0,
                kills: 0,
                deaths: 0,
              })
              const hskpi = toBigNumber(valueVE.hs / valueVE.kills * 100).toFormat(1)
              return (
                <tr key={key}>
                  <td><p>{valueVE.name}</p></td>
                  <td><p>{valueVE.hs}/{hskpi}</p></td>
                  <td><p>-</p></td>
                  <td><p>{valueVE.kills - valueVE.deaths}</p></td>
                  <td>{valueVE.fk_diff}</td>
                  <td><p>{valueVE.rating}</p></td>
                  <td><p>{valueVE.kills}/{valueVE.deaths}/{valueVE.assists}</p></td>
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
              <tr key={key} className={valueVE.hp > 0 ? styles.gameOver : ''}>
                <td><p>{valueVE.name}</p></td>
                <td className={styles.alignItemsLeft}>
                  <p className={styles.bigTxt}>{valueVE.hp}</p>
                  <div
                    className={styles.haemalStrandIcon}
                    style={{
                      backgroundColor: backColor(valueVE.hp),
                      width: hpInit(valueVE.hp)
                    }} />
                </td>
                <td><p>{valueVE.kills}/{valueVE.deaths}/{valueVE.assists}</p></td>
                <td><img src={valueVE.weapon_logo} /></td>
                <td><img src={valueVE.equipment_logo} /></td>
                <td><p className={styles.bigTxt}>{valueVE.money}</p></td>
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
              <tr key={key} className={valueVE.hp > 0 ? styles.gameOver : ''}>
                <td><p>{valueVE.name}</p></td>
                <td className={styles.alignItemsLeft}>
                  <p className={styles.bigTxt}>{valueVE.hp}</p>
                  <div
                    className={styles.haemalStrandIcon}
                    style={{
                      backgroundColor: backColor(valueVE.hp),
                      width: hpInit(valueVE.hp)
                    }} />
                </td>
                <td><p>{valueVE.kills}/{valueVE.deaths}/{valueVE.assists}</p></td>
                <td><img src={valueVE.weapon_logo} /></td>
                <td><img src={valueVE.equipment_logo} /></td>
                <td><p className={styles.bigTxt}>{valueVE.money}</p></td>
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

  const realHistory = {
    first: {
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
    team1Table = propsVE.endMatch.team1.players
    team2Table = propsVE.endMatch.team2.players
    first = propsVE.endMatch.real_history.first
    second = propsVE.endMatch.real_history.second
    const team1MoreAttr1 = propsVE.endMatch.team1.other_more_attr
    const team2MoreAttr1 = propsVE.endMatch.team2.other_more_attr
    realHistory.first.team1.role = team1MoreAttr1.first_half_role
    realHistory.first.team2.role = team2MoreAttr1.first_half_role
    realHistory.second.team1.role = team1MoreAttr1.first_half_role
    realHistory.second.team2.role = team2MoreAttr1.first_half_role
    realHistory.first.team1.score = team1MoreAttr1.first_half_score
    realHistory.first.team2.score = team2MoreAttr1.first_half_score
    realHistory.second.team1.score = team1MoreAttr1.second_half_score
    realHistory.second.team2.score = team2MoreAttr1.second_half_score
    realHistory.first.team1.logo = propsVE.endMatch.team1.team_logo
    realHistory.first.team2.logo = propsVE.endMatch.team2.team_logo
    realHistory.second.team1.logo = propsVE.endMatch.team1.team_logo
    realHistory.second.team2.logo = propsVE.endMatch.team2.team_logo
  } else {
    propsVE = diffCatch(props)({
      matchList: {
        team1_more_attr: {
          other_more_attr: {
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
    team1Table = propsVE.matchResult.match_list.real_players[0] || []
    team2Table = propsVE.matchResult.match_list.real_players[1] || []
    // 成员数据
    first = propsVE.matchResult.match_list.real_history.first
    second = propsVE.matchResult.match_list.real_history.second
    const team1MoreAttr = propsVE.matchList.team1_more_attr.other_more_attr
    const team2MoreAttr = propsVE.matchList.team2_more_attr.other_more_attr
    overtime = team1MoreAttr.is_over_time > 1
    realHistory.first.team1.role = team1MoreAttr.first_half_role
    realHistory.first.team2.role = team2MoreAttr.first_half_role
    realHistory.second.team1.role = team1MoreAttr.first_half_role
    realHistory.second.team2.role = team2MoreAttr.first_half_role
    realHistory.first.team1.score = team1MoreAttr.first_half_score
    realHistory.first.team2.score = team2MoreAttr.first_half_score
    realHistory.second.team1.score = team1MoreAttr.second_half_score
    realHistory.second.team2.score = team2MoreAttr.second_half_score
    realHistory.first.team1.logo = propsVE.matchList.host_team_logo
    realHistory.first.team2.logo = propsVE.matchList.guest_team_logo
    realHistory.second.team1.logo = propsVE.matchList.host_team_logo
    realHistory.second.team2.logo = propsVE.matchList.guest_team_logo
  }
  first.map(function (val) {
    if (val.team_role === realHistory.first.team1.role) {
      realHistory.first.team1.icon.push(val.logo)
    } else {
      realHistory.first.team2.icon.push(val.logo)
    }
  })
  second.map(function (val) {
    if (val.team_role === realHistory.second.team2.role) {
      realHistory.second.team2.icon.push(val.logo)
    } else {
      realHistory.second.team1.icon.push(val.logo)
    }
  })

  const one = diffCatch(team1Table[0])({ map: '' })

  return <div>
    <div style={{ height: '10px' }} />
    <p className={`${styles.mapRight} ${styles['csgoMap-' + one.map]}`}>{one.map}</p>
    {overtime && <p className={styles.extraTimeTxt}>加时赛</p>}
    {propsVE.isBoth ? <BothTable team1Table={team1Table} team2Table={team2Table} /> : <MatchTable
      team1Table={team1Table} team2Table={team2Table} />}
    <div style={{ height: '10px' }} />
    <div className={styles.operatingRecord}>
      <div className={styles.topTitle}>
        <img src={realHistory.first.team1.role === 'CT' ? ctct : tttt} />
        <b>{realHistory.first.team1.score}</b>
        <p>上半场</p>
        <b>{realHistory.first.team2.score}</b>
        <img src={realHistory.first.team2.role === 'T' ? tttt : ctct} />
      </div>
      <div className={styles.teamRed}>
        <img src={realHistory.first.team1.logo} />
        <div className={styles.hodlRight}>
          {
            realHistory.first.team1.icon.map((val, index) => {
              if (val) {
                return <img src={val} key={index} />
              }
            })
          }
        </div>
      </div>
      <div className={styles.teamBlue}>
        <img src={realHistory.first.team2.logo} />
        <div>
          {
            realHistory.first.team2.icon.map((val, index) => {
              if (val) {
                return <img src={val} key={index} />
              }
            })
          }
        </div>
      </div>
    </div>
    <div className={styles.operatingRecord}>
      <div className={styles.topTitle}>
        <img src={realHistory.second.team1.role === 'T' ? tttt : ctct} />
        <b>{realHistory.second.team1.score}</b>
        <p>下半场</p>
        <b>{realHistory.second.team2.score}</b>
        <img src={realHistory.second.team2.role === 'CT' ? ctct : tttt} />
      </div>
      <div className={styles.teamRed}>
        <img src={realHistory.second.team1.logo} />
        <div className={styles.hodlRight}>
          {
            realHistory.second.team1.icon.map((val, index) => {
              if (val) {
                return <img src={val} key={index} />
              }
            })
          }
        </div>
      </div>
      <div className={styles.teamBlue}>
        <img src={realHistory.second.team2.logo} />
        <div>
          {
            realHistory.second.team2.icon.map((val, index) => {
              if (val) {
                return <img src={val} key={index} />
              }
            })
          }
        </div>
      </div>
    </div>
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
