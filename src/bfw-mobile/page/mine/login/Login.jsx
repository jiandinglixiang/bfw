import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import password from '../../../assets/modify_password.png'
import welcome from '../../../assets/mine_welcome_word.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import UseStore, { loginLinkState } from '../UseStore.js'
import { Toast } from 'antd-mobile'

const verify = {
  isMobile (mobile) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(mobile)
  },
  passwordValid (value) {
    return /^(?=.*\d)[a-zA-Z\d]{6,12}$/.test(value)
  },
  smsValid (value) {
    return /^\d{6}$/.test(value)
  }
}
function Countdown () {
  return <button className={styles.countdown} disabled>
    获取验证码
  </button>
}

function LoginModule () {
  const random = Math.random()
  const [disSubmit, changeSub] = useState(true)
  const [telErr, setTelErr] = useState(false)
  const telRef = useRef()
  const passwordRef = useRef()
  const handleSubmit = (event) => {
    event.preventDefault()
    UseStore.userLogin(telRef.current.value, passwordRef.current.value).then((val) => {
      console.log(val)
    }).catch((err) => {
      console.log(err)
      err && err.msg && Toast.fail(err.msg)
    })
  }
  const verifyVal = (event) => {
    if (!verify.passwordValid(passwordRef.current.value)) {
      return changeSub(true)
    }
    if (!verify.isMobile(telRef.current.value)) {
      setTelErr(true)
      return changeSub(true)
    }
    setTelErr(false)
    changeSub(false)
  }
  return (
    <div className={styles.loginInput}>
      <h4>登陆</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor={'tels' + random}>手机号</label>
          <input
            ref={telRef}
            type='tel'
            id={'tels' + random}
            minLength={11}
            maxLength={11}
            placeholder='请输入手机账号'
            onChange={verifyVal}
          />
          {telErr && <p>*手机号不正确</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'passwords' + random}>密码</label>
          <input
            ref={passwordRef}
            type='password'
            minLength={6}
            maxLength={12}
            id={'passwords' + random}
            placeholder='请输入6-12位登录密码'
            onChange={verifyVal}
          />
        </div>
        <div className={styles.forgetPassword}>
          <span onClick={() => loginLinkState.setStore('reset')}>忘记密码?</span>
        </div>
        <button
          disabled={disSubmit}
          className={styles.buttonBlue2}
          type='submit'
        >登陆
        </button>
        <button
          className={styles.buttonBlue1}
          onClick={() => loginLinkState.setStore('register')}>注册
        </button>
      </form>
    </div>)
}

function RegisterModule () {
  const random = Math.random()
  const [from, setFrom] = useState({
    mobile: '',
    password: '',
    password2: '',
    code: '',
    consent: true
  })
  const changeFrom = () => {
  }
  return (
    <div className={styles.loginInput}>
      <h4>注册</h4>
      <form>
        <div className={styles.formItem}>
          <label htmlFor={'tels' + random}>用户名</label>
          <input type='tel' id={'tels' + random} placeholder='请输入手机账号' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'passwords' + random}>密码</label>
          <input type='password' id={'passwords' + random} placeholder='请输入6-12位登录密码' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'passwords2' + random}>确认密码</label>
          <input type='password' id={'passwords2' + random} placeholder='请再次输入密码' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.codeVerify}>
          <label htmlFor={'code' + random}>验证码</label>
          <div>
            <input type='password' id={'code' + random} placeholder='请输入验证码' />
            <Countdown />
          </div>
          <p>*手机号不正确</p>
        </div>
        <div className={styles.consentWord}>
          <b className={styles.checked} /><span>我已阅读并同意</span> <span>“网络服务协议”</span>
        </div>
        <button className={styles.buttonBlue2}>注册</button>
        <button className={styles.buttonBlue1} onClick={() => loginLinkState.setStore('login')}>返回登陆
        </button>
      </form>
    </div>)
}

function ResetPasswordsModule () {
  return (
    <div className={styles.loginInput}>
      <h4>忘记密码</h4>
      <form>
        <div className={styles.formItem}>
          <label htmlFor='tels'>用户名</label>
          <input type='tel' id='tels' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.codeVerify}>
          <label htmlFor='passwords'>验证码</label>
          <div>
            <input type='password' id='passwords' placeholder='请输入验证码' />
            <Countdown />
          </div>
          <p>*手机号不正确</p>
        </div>
        <div className={styles.formItem}>
          <label htmlFor='passwords'>新密码</label>
          <input type='password' id='passwords' placeholder='请输入验证码' />
        </div>
        <button className={styles.buttonBlue2}>确认</button>
        <button
          className={styles.buttonBlue3}
          onClick={() => loginLinkState.setStore('login')}>返回登录
        </button>
      </form>
    </div>)
}

function LoginView () {
  const [link, linkTo] = loginLinkState.useStore()
  switch (link) {
    case 'login':
      return <LoginModule />
    case 'register':
      return <RegisterModule />
    case 'reset':
      return <ResetPasswordsModule />
    default:
      // 'welcome':
      return (
        <div className={styles.loginButton}>
          <Image src={welcome} />
          <button onClick={() => linkTo('login')}>登陆/注册</button>
        </div>)
  }
}

function Login () {
  const el = window.document.documentElement || window.document.body
  return (
    <div
      className={styles.container}
      style={{ minHeight: el.offsetHeight - 40 + 'px' }}>
      <LoginView />
      <div className={styles.linkBottom}>
        <div>
          <Link to='/about'>
            <Image className={styles.leftIcon} src={password} />
            <p>关于我们</p>
            <span />
          </Link>
        </div>
      </div>
    </div>)
}

Login.propTypes = {}

export default Login

LoginView.propTypes = {}
