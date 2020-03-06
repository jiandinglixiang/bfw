import React from 'react'
import styles from './index.module.scss'
import { PropTypes } from '../../../../tool/util.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import password from '../../../assets/modify_password.png'
import welcome from '../../../assets/mine_welcome_word.png'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function Countdown () {
  return <button className={styles.countdown} disabled>
    获取验证码
  </button>
}

function LoginView (props) {
  const { type } = props
  if (type === 1) {
    return <div className={styles.loginInput}>
      <h4>登陆</h4>
      <form>
        <div className={styles.formItem}>
          <label htmlFor='tels'>手机号</label>
          <input type='tel' id='tels' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.formItem}>
          <label htmlFor='passwords'>密码</label>
          <input type='password' id='passwords' />
        </div>
        <div className={styles.forgetPassword}>
          <Link to='/'>忘记密码?</Link>
        </div>
        <button className={styles.buttonBlue2}>登陆</button>
        <button className={styles.buttonBlue1}>注册</button>
      </form>
    </div>
  } else if (type === 2) {
    return <div className={styles.loginInput}>
      <h4>注册</h4>
      <form>
        <div className={styles.formItem}>
          <label htmlFor='tels'>用户名</label>
          <input type='tel' id='tels' placeholder='请输入手机账号' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.formItem}>
          <label htmlFor='passwords'>密码</label>
          <input type='password' id='passwords' placeholder='请输入6-12位登录密码' />
          <p>*手机号不正确</p>
        </div>
        <div className={styles.formItem}>
          <label htmlFor='passwords'>确认密码</label>
          <input type='password' id='passwords' placeholder='请再次输入密码' />
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
        <div className={styles.consentWord}>
          <b className={styles.checked} /><span>我已阅读并同意</span> <span>“网络服务协议”</span>
        </div>
        <button className={styles.buttonBlue2}>注册</button>
        <button className={styles.buttonBlue1}>返回登陆</button>
      </form>
    </div>
  } else if (type !== 3) {
    return <div className={styles.loginInput}>
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
        <button className={styles.buttonBlue3}>返回登录</button>
      </form>
    </div>
  } else {
    return <div className={styles.loginButton}>
      <Image src={welcome} />
      <button>登陆/注册</button>
    </div>
  }
}

function Login (props) {
  const { width, height, } = props
  const autoWidth = {
    width: `${width}px`,
    minHeight: `${height - 40}px`
  }
  return <div style={autoWidth} className={styles.container}>
    <LoginView />
    <div style={{
      height: '40px',
      width: '100%'
    }} />
    <div className={styles.linkBottom}>
      <Link to='/'>
        <Image className={styles.leftIcon} src={password} />
        <p>关于我们</p>
        <span />
      </Link>
    </div>
  </div>
}

Login.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

function mapStateToProps (state) {
  return {
    width: state.device.width,
    height: state.device.height,
    bannerList: state.home.bannerList,
  }
}

export default connect(mapStateToProps,
  function (dispatch) {
    return { dispatch }
  },
)(Login)
