import React, { useState } from 'react'
import styles from './index.module.scss'
import defaultImg from '../../assets/default_100.png'
import password from '../../assets/modify_password.png'
import { Link } from 'react-router-dom'
import { Modal } from 'antd-mobile'
import { PropTypes } from '../../../tool/util.js'
import { connect } from 'react-redux'

function Mine (props) {
  const { width, height, } = props
  const autoWidth = {
    width: `${width}px`,
    minHeight: `${height - 40}px`,
    backgroundColor: ' #06051A'
  }
  const [showModal, changShow] = useState(false)
  return <div style={autoWidth}>
    <div className={styles.topHead}>
      <img src={defaultImg} />
      <div><p>PDD没有人鱼线</p><span /></div>
    </div>
    <div className={styles.listLink}>
      <Link to='/'>
        <img className={styles.leftIcon} src={password} />
        <p>修改密码</p>
        <span />
      </Link>

      <Link to='/'>
        <img className={styles.leftIcon} src={password} />
        <p>关于我们</p>
        <span />
      </Link>
    </div>
    <button
      className={styles.loginOut}
      onClick={() => changShow(!showModal)}
    >退出登陆
    </button>
    <Modal
      visible={showModal}
      transparent
      onClose={() => changShow(!showModal)}>
      <div className={styles.modalBody}>
        <p>确认退出账户吗？</p>
        <div>
          <button onClick={() => changShow(!showModal)}>取消</button>
          <button>清空</button>
        </div>
      </div>
    </Modal>
  </div>
}

Mine.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  dispatch: PropTypes.func,
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
)(Mine)
