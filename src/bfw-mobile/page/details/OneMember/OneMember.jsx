import React, { useState } from 'react'
import style from './index.module.scss'
import def2 from '../../../assets/default_teamblue_40.png'
import def1 from '../../../assets/default_teamred_40.png'
import exch from '../../../assets/exch_left.png'
import { diffCatch, PropTypes, toBigNumber } from '../../../../tool/util.js'
import tianhui from '../../../assets/tianhui.png'
import yemo from '../../../assets/yemo.png'
import reateam from '../../../assets/reateam.png'
import blueteam from '../../../assets/blueteam.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

export function TeamSing (props) {
  // 标题
  const { sing, logo, name } = props
  return <div className={style.teamSing}>
    <div>
      <Image src={sing} />
    </div>
    <div>
      <Image src={logo} />
      <p>{name}</p>
    </div>
  </div>
}

TeamSing.propTypes = {
  sing: PropTypes.string,
  logo: PropTypes.string,
  name: PropTypes.string
}

function MemberList (props) {
  const { value, blueTeam, isBoth } = diffCatch(props)({
    blueTeam: false,
    value: {
      name: '--',
      hero_logo: '',
      champion_img: '',
      logo: '',
      kills: 0,
      deaths: 0,
      assists: 0,
      last_hits: 0,
      denies: 0,
      gold_per_min: 0,
      xp_per_min: 0,
      gold: 0,
      item: [],
      game_no: 0
    }
  })
  const [big, setBig] = useState(style.twoBig)
  const item = value.item.length ? value.item : [{ img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }]
  const kda = isBoth && toBigNumber((value.kills + value.assists) / value.deaths * 3).toFormat(1)

  return <div className={style.oneMember}>
    <div>
      <div className={big}>
        {value.logo ? <Image src={value.logo} /> : <span />}
        <Image src={[value.hero_logo, blueTeam ? def2 : def1]} />
        <Image src={exch} onClick={() => setBig(big ? '' : style.twoBig)} />
      </div>
      <p>{value.name}</p>
    </div>
    <div>
      <div>
        <p>K/D/A</p>
        <p>正补/反补</p>
        <p>GPM</p>
        <p>XPM</p>
        <p>经济</p>
      </div>
      <div>
        <p>
          {isBoth && [<span key={0} style={{ color: '#70F7E3' }}>{kda}</span>, <br key={1} />]}
          <span>
            {value.kills}/
            <span style={isBoth ? { color: '#70F7E3' } : null}>{value.deaths}</span>
            /{value.assists}
          </span>
        </p>
        <p>{value.last_hits}/{value.denies}</p>
        <p>{value.gold_per_min}</p>
        <p className={style.cyan}>
          {
            value.xp_per_min
          }
        </p>
        <p className={style.yellow}>
          {
            value.gold
          }
        </p>
      </div>
      <div>
        <p>{value.game_no ? value.game_no + '级' : '-'}</p>
        <div>
          {
            item.map((val, index) => {
              if (val.img) {
                return <Image key={index} src={val.img} />
              }
              return <span key={index} />
            })
          }
        </div>
      </div>
    </div>
  </div>
}

function MemberListLol (props) {
  const propsVE = diffCatch(props)({
    blueTeam: false,
    value: {
      name: '-',
      champion_img: '',
      logo: '',
      kills: 0,
      deaths: 0,
      assists: 0,
      last_hits: 0,
      denies: 0,
      gold_per_min: 0,
      xp_per_min: 0,
      gold: 0,
      item: [],
      game_no: 0
    }
  })
  const [big, setBig] = useState(style.twoBig)
  const item = propsVE.value.item.length ? propsVE.value.item : [{ img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }, { img: false }]
  const kda = propsVE.isBoth && toBigNumber((propsVE.value.kills + propsVE.value.assists) / propsVE.value.deaths * 3).toFormat(1)
  return <div className={style.oneMember}>
    <div>
      <div className={big}>
        {propsVE.value.logo ? <Image src={propsVE.value.logo} /> : <span />}
        <Image src={[propsVE.value.champion_img, propsVE.blueTeam ? def2 : def1]} />
        <Image src={exch} onClick={() => setBig(big ? '' : style.twoBig)} />
      </div>
      <p>{propsVE.value.name}</p>
    </div>
    <div>
      <div>
        {propsVE.isBoth && <p>K/D/A</p>}
        <p>K</p>
        <p>D</p>
        <p>A</p>
        <p>经济</p>
      </div>
      <div>
        {propsVE.isBoth && <p>{kda}</p>}
        <p>{propsVE.value.kills}</p>
        <p>{propsVE.value.deaths}</p>
        <p>{propsVE.value.assists}</p>
        <p className={style.yellow}>{propsVE.value.gold}</p>
      </div>
      <div>
        <p>{propsVE.value.game_no ? propsVE.value.game_no + '级' : '-'}</p>
        <div>
          {
            item.map((val, index) => {
              if (val.img) {
                return <Image key={index} src={val.img} />
              }
              return <span key={index} />
            })
          }
        </div>
      </div>
    </div>
  </div>
}

export function OneMember (props) {
  let propsVE = diffCatch(props)({
    isBoth: false
  })
  const team1 = {
    logo: '',
    name: '',
    list: []
  }
  const team2 = {
    logo: '',
    name: '',
    list: []
  }
  let gameId = 0
  let camp // true=team是夜魔/蓝方
  if (propsVE.isBoth) {
    propsVE = diffCatch(propsVE)({
      endMatch: {
        team1: {
          game_type_id: 0,
          players: [],
          team_logo: def1,
        },
        team2: {
          players: [],
          team_logo: def2,
        }
      }
    })
    gameId = propsVE.endMatch.team1.game_type_id
    if (gameId === 5) {
      camp = propsVE.endMatch.team1.camp === 'dire'
    }
    if (gameId === 1) {
      camp = propsVE.endMatch.team1.camp === 'blue'
    }
    if (camp) {
      team2.logo = propsVE.endMatch.team1.team_logo
      team2.name = propsVE.endMatch.team1.team_name
      team2.list = propsVE.endMatch.team1.players
      team1.logo = propsVE.endMatch.team2.team_logo
      team1.name = propsVE.endMatch.team2.team_name
      team1.list = propsVE.endMatch.team2.players
    } else {
      team1.logo = propsVE.endMatch.team1.team_logo
      team1.name = propsVE.endMatch.team1.team_name
      team1.list = propsVE.endMatch.team1.players
      team2.logo = propsVE.endMatch.team2.team_logo
      team2.name = propsVE.endMatch.team2.team_name
      team2.list = propsVE.endMatch.team2.players
    }
  } else {
    propsVE = diffCatch(propsVE)({
      matchList: {
        host_team_logo: def1,
        guest_team_logo: def2,
        team1_more_attr: {
          other_more_attr: {},
          players: []
        },
        team2_more_attr: {
          other_more_attr: {},
          players: []
        }
      },
      matchResult: {
        match_list: {
          real_players: []
        }
      }
    })
    gameId = propsVE.matchList.game_type_id

    if (gameId === 5) {
      camp = propsVE.matchList.team1_more_attr.other_more_attr.camp === 'dire'
    }
    if (gameId === 1) {
      camp = propsVE.matchList.team1_more_attr.other_more_attr.camp === 'blue'
    }
    if (camp) {
      // 队伍1是夜魔客队
      team2.logo = propsVE.matchList.host_team_logo
      team2.name = propsVE.matchList.host_team_name
      team2.list = propsVE.matchList.team1_more_attr.players

      team1.logo = propsVE.matchList.guest_team_logo
      team1.name = propsVE.matchList.guest_team_name
      team1.list = propsVE.matchList.team2_more_attr.players
    } else {
      team1.logo = propsVE.matchList.host_team_logo
      team1.name = propsVE.matchList.host_team_name
      team1.list = propsVE.matchList.team1_more_attr.players

      team2.logo = propsVE.matchList.guest_team_logo
      team2.name = propsVE.matchList.guest_team_name
      team2.list = propsVE.matchList.team2_more_attr.players
    }
  }
  return <div>
    <TeamSing
      sing={gameId === 5 ? tianhui : reateam}
      logo={team1.logo}
      name={team1.name}
    />
    {
      [0, 1, 2, 3, 4].map(function (val) {
        if (gameId === 5) {
          return <MemberList key={val} value={team1.list[val]} isBoth={propsVE.isBoth} />
        }
        return <MemberListLol key={val} value={team1.list[val]} isBoth={propsVE.isBoth} />
      })
    }
    <TeamSing
      sing={gameId === 5 ? yemo : blueteam}
      logo={team2.logo}
      name={team2.name}
    />
    {
      [0, 1, 2, 3, 4].map(function (val) {
        if (gameId === 5) {
          return <MemberList key={val} value={team2.list[val]} blueTeam isBoth={propsVE.isBoth} />
        }
        return <MemberListLol key={val} value={team2.list[val]} blueTeam isBoth={propsVE.isBoth} />
      })
    }
  </div>
}

export default OneMember
