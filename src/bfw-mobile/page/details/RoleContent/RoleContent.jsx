import React, { useState } from 'react'
import style from './index.module.scss'
import tianhui from '../../../assets/tianhui.png'
import yemo from '../../../assets/yemo.png'
import logo from '../../../assets/ic_dota2.png'
import logo2 from '../../../assets/ic_csgo.png'
import exch from '../../../assets/exch_left.png'
import { PropTypes } from '../../../../tool/util.js'

function TeamSing (props) {
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

function OneMember () {
  const [big, setBig] = useState(style.twoBig)
  return <div className={style.oneMember}>
    <div>
      <div className={big}>
        <img src={logo} />
        <img src={logo2} />
        <img src={exch} onClick={() => setBig(big ? '' : style.twoBig)} />
      </div>
      <p>墨色直营</p>
    </div>
    <div>
      <div>
        <p>K/D/A</p>
        <p>K/D/A</p>
        <p>K/D/A</p>
        <p>K/D/A</p>
        <p>K/D/A</p>
      </div>
      <div>
        <p>0/7/4</p>
        <p>0/7/4</p>
        <p>0/7/4</p>
        <p className={style.cyan}>0/7/4</p>
        <p className={style.yellow}>0/7/4</p>
      </div>
      <div>
        <p>10级</p>
        <div>
          <img src={logo2} />
          <img src={logo2} />
          <img src={logo2} />
          <img src={logo2} />
          <img src={logo2} /> <img src={logo2} />
          <img src={logo2} />
          <img src={logo2} />
          <img src={logo2} />
        </div>
      </div>
    </div>
  </div>
}

function RoleContent (props) {
  return <div className={style.content}>
    <TeamSing sing={tianhui} logo={logo} name='UOL' />
    <OneMember />
    <OneMember />
    <TeamSing sing={yemo} logo={logo} name='UOL' />
    <OneMember />
    <OneMember />
  </div>
}

export default RoleContent
