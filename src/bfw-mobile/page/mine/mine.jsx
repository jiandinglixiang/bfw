import React, { useState } from 'react'
import styles from './index.module.scss'
import defaultImg from '../../assets/default_100.png'
import password from '../../assets/modify_password.png'
import { Link } from 'react-router-dom'
import { Modal } from 'antd-mobile'
import { PropTypes } from '../../../tool/util.js'
import { connect } from 'react-redux'
import { Divs, Image, Pars, Text } from '../../components/BasicsHtml/BasicsHtml.jsx'

function Mine (props) {
  const { width, height, } = props
  const autoWidth = {
    width: `${width}px`,
    minHeight: `${height - 40}px`,
    backgroundColor: ' #06051A'
  }
  const [showModal, changShow] = useState(false)
  return <Divs style={autoWidth}>
    <Divs className={styles.topHead}>
      <Image src={defaultImg} />
      <Divs><Pars>PDD没有人鱼线</Pars><Text /></Divs>
    </Divs>
    <Divs className={styles.listLink}>
      <Link to='/'>
        <Image className={styles.leftIcon} src={password} />
        <Pars>修改密码</Pars>
        <span />
      </Link>

      <Link to='/'>
        <Image className={styles.leftIcon} src={password} />
        <Pars>关于我们</Pars>
        <span />
      </Link>
    </Divs>
    <button
      className={styles.loginOut}
      onClick={() => changShow(!showModal)}
    >退出登陆
    </button>
    <Modal
      visible={showModal}
      transparent
      onClose={() => changShow(!showModal)}>
      <Divs className={styles.modalBody}>
        <Pars>确认退出账户吗？</Pars>
        <Divs>
          <button onClick={() => changShow(!showModal)}>取消</button>
          <button>清空</button>
        </Divs>
      </Divs>
    </Modal>
  </Divs>
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
