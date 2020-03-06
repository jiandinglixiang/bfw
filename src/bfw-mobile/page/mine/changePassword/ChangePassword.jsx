import React from 'react'
import styles from './index.module.scss'
import nevBar from '../../../assets/nav_back.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function ChangePassword () {
  return <div>
    <div className={styles.heardNav}>
      <Image src={nevBar} />
      <div>修改密码</div>
      <div>保存</div>
    </div>
    <div className={styles.topPhone}>
      <label>手机号</label>
      <input type='tel' disabled value='188504982634' />
    </div>
    <div className={styles.password}>
      <label>新登录密码</label>
      <input type='tel' value='188504982634' />
    </div>
    <div className={styles.borderBottom1} />
    <div className={styles.password}>
      <label>确认新密码</label>
      <input type='password' />
    </div>
    <p className={styles.warningTxt}>*密码输入不一致</p>
  </div>
}

export default ChangePassword
