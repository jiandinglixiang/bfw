import React, { useState } from 'react'
import style from './index.module.scss'
import def2 from '../../../assets/default_teamblue_40.png'
import def1 from '../../../assets/default_teamred_40.png'
import exch from '../../../assets/exch_left.png'
import { diffCatch, PropTypes } from '../../../../tool/util.js'

export function TeamSing (props) {
  // 标题
  const { sing, logo, name } = props
  return <div className={style.teamSing}>
    <div>
      <img src={sing} />
    </div>
    <div>
      <img src={logo} />
      <p>{name}</p>
    </div>
  </div>
}

TeamSing.propTypes = {
  sing: PropTypes.string,
  logo: PropTypes.string,
  name: PropTypes.string
}

export function MemberList (props) {
  const { value, blueTeam } = diffCatch(props)({
    blueTeam: false,
    value: {
      name: '--',
      hero_logo: '',
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
  return <div className={style.oneMember}>
    <div>
      <div className={big}>
        {value.logo ? <img src={value.logo} /> : <span />}
        <img src={value.hero_logo || (blueTeam ? def2 : def1)} />
        <img src={exch} onClick={() => setBig(big ? '' : style.twoBig)} />
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
          {value.kills}/
          <span style={{ color: '#70F7E3' }}>{value.deaths}</span>
          /{value.assists}
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
                return <img key={index} src={val.img} />
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
  const { data, blueTeam } = diffCatch(props)({
    data: [],
    blueTeam: false
  })
  return <div>
    {
      [0, 1, 2, 3, 4, 5].map(function (val) {
        return <MemberList key={val} value={data[0]} blueTeam={blueTeam} />
      })
    }
  </div>
}

export default OneMember
