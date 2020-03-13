import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Link, useHistory } from 'react-router-dom'
import password from '../../../assets/modify_password.png'
import welcome from '../../../assets/mine_welcome_word.png'
import { Divs, Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import UseStore, { loginLinkState } from '../UseStore.js'
import { Toast } from 'antd-mobile'
import { PropTypes } from '../../../../tool/util.js'
import http from '../../../../tool/http.js'

export const verify = {
  isMobile (mobile) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(mobile)
  },
  passwordValid (value) {
    return /^(?=.*\d)[a-zA-Z\d]{6,12}$/.test(value)
  },
  smsValid (value) {
    return /^\d{4}$/.test(value)
  }
}
let inter = 0

const postCode = (disMobile) => {
  http.postCode(disMobile).catch(err => {
    console.log(err)
  })
}

function Countdown ({ disMobile }) {
  const [time, update] = useState(0)
  useEffect(() => {
    return function () {
      clearInterval(inter)
    }
  }, [])

  const down = () => {
    clearInterval(inter)
    update(10)
    inter = setInterval(function () {
      update(t => {
        if (t <= 1) {
          return 0
        } else {
          return t - 1
        }
      })
    }, 1000)
    postCode && postCode(disMobile)
  }
  return (
    <button
      onClick={down}
      className={styles.countdown}
      disabled={!disMobile || time !== 0}>
      {time ? time + 's后获取' : '获取验证码'}
    </button>)
}

function LoginModule () {
  const history = useHistory()
  const random = Math.random()
  const [disSubmit, changeSub] = useState(true)
  const [telErr, setTelErr] = useState(false)
  const telRef = useRef()
  const passwordRef = useRef()
  const handleSubmit = (event) => {
    event.preventDefault()
    UseStore.userLogin(telRef.current.value, passwordRef.current.value).then((val) => {
      history.replace('/mine')
    }).catch((err) => {
      err && err.msg && Toast.fail(err.msg, 1)
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
  const [fromTip, setFromTip] = useState({
    mobile: null,
    password: null,
    password2: null,
    code: null,
  })

  const disMobile = useMemo(() => {
    if (verify.isMobile(from.mobile)) {
      return from.mobile
    }
    return false
  }, [from.mobile])
  const changeFrom = (event, key) => {
    if (key === 'consent') {
      return setFrom({
        ...from,
        consent: event
      })
    }
    const target = event.currentTarget
    setFrom({
      ...from,
      [target.name]: target.value
    })
    event.preventDefault()
  }
  const changeFromTip = (event, name = '') => {
    if (event) {
      const target = event.currentTarget
      name = target.name
      event.preventDefault()
    }
    let pass = false
    const state = { ...fromTip }
    if (name === 'code') {
      state.code = !verify.smsValid(from.code)
      pass = true
    }
    if (pass || name === 'password2') {
      if (!verify.passwordValid(from.password2)) {
        state.password2 = '*请输入6-12位密码'
      } else if (from.password2 !== from.password) {
        state.password2 = '*密码输入不一致'
      } else {
        state.password2 = false
      }
      pass = true
    }
    if (pass || name === 'password') {
      state.password = !verify.passwordValid(from.password)
      pass = true
    }
    if (pass || name === 'mobile') {
      state.mobile = !verify.isMobile(from.mobile)
    }
    setFromTip(state)
  }
  const passSubmit = useMemo(() => {
    if (Object.entries(from).every(value => value[1])) {
      return ![fromTip.mobile, fromTip.password, fromTip.password2, fromTip.code].every(value => value === false)
    }
    return true
  }, [from, fromTip])
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!from.consent) {
      return Toast.info('请勾选网络服务协议', 1)
    }
    http.postRegister({
      password: from.password,
      mobile: from.mobile,
      confirmPassword: from.password2,
      code: from.code
    }).then(value => {
      Toast.info('注册成功，请登录', 1)
      loginLinkState.setStore('login')
    }).catch(err => {
      err && err.msg && Toast.fail(err.msg, 1)
    })
  }

  return (
    <Divs
      className={styles.loginInput}
    >
      <h4>注册</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor={'mobile' + random}>用户名</label>
          <input
            type='tel'
            id={'mobile' + random}
            placeholder='请输入手机账号'
            value={from.mobile}
            name='mobile'
            minLength={11}
            maxLength={11}
            onChange={changeFrom}
            onBlur={changeFromTip}
          />
          {fromTip.mobile && <p>*手机号不正确</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'password' + random}>密码</label>
          <input
            type='password'
            id={'password' + random}
            placeholder='请输入6-12位登录密码'
            value={from.password}
            name='password'
            onChange={changeFrom}
            minLength={6}
            maxLength={12}
            onBlur={changeFromTip}
          />
          {fromTip.password && <p>*请输入6-12位密码</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'password2' + random}>确认密码</label>
          <input
            type='password'
            id={'password2' + random}
            placeholder='请再次输入密码'
            value={from.password2}
            name='password2'
            onChange={changeFrom}
            minLength={6}
            maxLength={12}
            onBlur={changeFromTip}
          />
          {fromTip.password2 && <p>{fromTip.password2}</p>}
        </div>
        <div className={styles.codeVerify}>
          <label className={styles.title} htmlFor={'code' + random}>验证码</label>
          <label className={styles.box} htmlFor={'code' + random}>
            <input
              type='text'
              id={'code' + random}
              placeholder='请输入验证码'
              value={from.code}
              name='code'
              onChange={changeFrom}
              minLength={4}
              maxLength={4}
              onBlur={changeFromTip}
            />
            <Countdown disMobile={disMobile} />
          </label>
          {fromTip.code && <p>*请输入4位验证码</p>}
        </div>
        <div className={styles.consentWord}>
          <b
            onClick={() => changeFrom(!from.consent, 'consent')}
            className={from.consent ? styles.checked : null} />
          <span>我已阅读并同意</span>
          <span>“网络服务协议”</span>
        </div>
        <button
          type='submit'
          disabled={passSubmit}
          className={styles.buttonBlue2}>
          注册
        </button>
        <button
          className={styles.buttonBlue1}
          onClick={() => loginLinkState.setStore('login')}>
          返回登陆
        </button>
      </form>
    </Divs>)
}

const changeFromTip = (name = '', value, all) => {
  if (name === 'password') {
    return verify.passwordValid(value)
  }
  if (name === 'code') {
    return verify.smsValid(value)
  }
  if (name === 'mobile') {
    return verify.smsValid(value)
  }
}

function checkData (state) {
  const checkData = {}
  Object.entries(state).forEach(arr => {
    console.log(arr)
    if (arr[1].value) {
      checkData[arr[0]] = {
        ...arr[1],
        pass: changeFromTip(arr[0], arr[1].value)
      }
    } else {
      checkData[arr[0]] = arr[1]
    }
  })
  return checkData
}

function fromReducer (state, { type, name, value, check }) {
  if (check) {
    return checkData(state)
  }
  const change = { ...state[name] }
  if (type === 'change') {
    change.value = value
  } else if (type === 'focus') {
    change.focus++
  } else if (type === 'blur') {
    change.blur++
  }
  return {
    ...state,
    [name]: change
  }
}

function ResetPasswordsModule () {
  const random = Math.random()

  const [state, dispatch] = useReducer(fromReducer, {
    mobile: {
      blur: 0, // 失去焦点
      focus: 0, // 得到焦点
      value: '',
      tip: null,
      pass: false
    },
    password: {
      blur: 0, // 失去焦点
      focus: 0, // 得到焦点
      value: '',
      tip: null,
      pass: false
    },
    code: {
      blur: 0, // 失去焦点
      focus: 0, // 得到焦点
      value: '',
      tip: null,
      pass: false
    }
  })
  const disMobile = useMemo(function () {
    if (state.mobile.pass) {
      return state.mobile.value
    }
    return null
  }, [state.mobile.pass])

  const disSubmit = !(state.mobile.pass && state.password.pass && state.code.pass)

  const handleSubmit = (event) => {
    event.preventDefault()
    http.postPasswordReset({
      password: state.password,
      mobile: state.mobile,
      code: state.code
    }).then(value => {
      Toast.info('修改成功，请登录', 1)
      loginLinkState.setStore('login')
    }).catch(err => {
      err && err.msg && Toast.fail(err.msg, 1)
    })
  }

  const eventInit = (event) => {
    const type = event.type
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    dispatch({
      type,
      name,
      value
    })
    setTimeout(function () {
      dispatch({ check: true })
    }, 150)
  }
  return (
    <Divs className={[styles.loginInput, styles.loginInput2]}>
      <h4 style={{ color: '#F9DF70' }}>忘记密码</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor={'mobile' + random}>用户名</label>
          <input
            type='tel'
            id={'mobile' + random}
            placeholder='请输入手机账号'
            value={state.mobile.value}
            name='mobile'
            minLength={11}
            maxLength={11}
            onChange={eventInit}
            onBlur={eventInit}
            onFocus={eventInit}
          />
          {state.mobile.tip && <p>*手机号不正确</p>}
        </div>
        <div className={styles.codeVerify}>
          <label className={styles.title} htmlFor={'code' + random}>验证码</label>
          <label className={styles.box} htmlFor={'code' + random}>
            <input
              type='text'
              id={'code' + random}
              placeholder='请输入验证码'
              value={state.code.value}
              name='code'
              minLength={4}
              maxLength={4}
              onChange={eventInit}
              onBlur={eventInit}
              onFocus={eventInit}
            />
            <Countdown disMobile={disMobile} />
          </label>
          {state.code.tip && <p>*请输入4位验证码</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor={'password' + random}>新密码</label>
          <input
            type='password'
            id={'password' + random}
            placeholder='请输入6-12位登录密码'
            value={state.password.value}
            name='password'
            minLength={6}
            maxLength={12}
            onChange={eventInit}
            onBlur={eventInit}
            onFocus={eventInit}
          />
          {state.password.tip && <p>*请输入6-12位新密码</p>}
        </div>
        <button type='submit' disabled={disSubmit} className={styles.buttonBlue2}>确认</button>
        <button
          className={styles.buttonBlue3}
          onClick={() => loginLinkState.setStore('login')}>返回登录
        </button>
      </form>
    </Divs>)
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

Countdown.propTypes = {
  disMobile: PropTypes.any
}
