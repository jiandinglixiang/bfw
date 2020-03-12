import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import nevBar from '../../../assets/nav_back.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import { useHistory } from 'react-router-dom'
import { useUserInfo } from '../UseStore.js'
import { Toast } from 'antd-mobile'
import http from '../../../../tool/http.js'
import { userState } from '../../../../tool/userToken.js'

function ChangePassword () {
  const random = Math.random()
  const history = useHistory()
  const [userInfo] = useUserInfo.useStore()

  const [from, setFrom] = useState({
    password: '',
    password2: ''
  })
  const showTip = useMemo(function () {
    if (from.password2 && from.password !== from.password2) {
      return true
    }
    return false
  }, [from])
  const changeFrom = (event, key) => {
    const target = event.currentTarget
    const name = target.name
    const value = target.value
    setFrom({
      ...from,
      [name]: value
    })
    // if (name === 'mobile') {
    //   value && value.length === 11 && changeFromTip(false, name)
    // } else if (name === 'password') {
    //   value && value.length >= 6 && changeFromTip(false, name)
    // } else if (name === 'code') {
    //   value && value.length >= 4 && changeFromTip(false, name)
    // }
    event.preventDefault()
  }
  const submitChange = () => {
    if (!from.password) {
      return Toast.info('请输入密码')
    } else if (!(/^(?=.*\d)[a-zA-Z\d]{6,12}$/.test(from.password))) {
      return Toast.info('密码输入不符合要求')
    }
    if (!from.password2) {
      return Toast.info('请输入密码')
    } else if (!(/^(?=.*\d)[a-zA-Z\d]{6,12}$/.test(from.password2))) {
      return Toast.info('密码输入不符合要求')
    }
    http.postChangePassword({
      mobile: userInfo.mobile,
      password: from.password,
      confirmPassword: from.password2,
    }).then(val => {
      Toast.info('修改成功请重新登录', 1)
      history.replace('/login')
      userState.clearToken()
    }).catch(err => {
      err && err.msg && Toast.info(err.msg, 1)
    })
  }
  return (
    <div>
      <div className={styles.heardNav}>
        <Image src={nevBar} />
        <div>修改密码</div>
        <div onClick={submitChange}>保存</div>
      </div>
      <div className={styles.topPhone}>
        <label>手机号</label>
        <input type='tel' disabled value={userInfo.mobile} />
      </div>
      <div className={styles.password}>
        <label htmlFor={'password' + random}>新登录密码</label>
        <input
          type='password'
          id={'password' + random}
          placeholder='请输入6-12位登录密码'
          value={from.password}
          name='password'
          onChange={changeFrom}
          minLength={6}
          maxLength={12}
        />
      </div>
      <div className={styles.borderBottom1} />
      <div className={styles.password}>
        <label htmlFor={'password2' + random}>确认新密码</label>
        <input
          type='password'
          id={'password2' + random}
          placeholder='请输入6-12位登录密码'
          value={from.password2}
          name='password2'
          onChange={changeFrom}
          minLength={6}
          maxLength={12}
        />
      </div>
      {showTip && <p className={styles.warningTxt}>*密码输入不一致</p>}
    </div>)
}

export default ChangePassword
