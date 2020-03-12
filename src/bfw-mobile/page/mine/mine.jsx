import React, { useState } from 'react'
import styles from './index.module.scss'
import defaultImg from '../../assets/default_100.png'
import password from '../../assets/modify_password.png'
import { Link, useHistory } from 'react-router-dom'
import { Modal } from 'antd-mobile'
import { Divs, Image, Pars, Text } from '../../components/BasicsHtml/BasicsHtml.jsx'
import { useUserInfo } from './UseStore.js'
import { userState } from '../../../tool/userToken.js'

function Mine () {
  const history = useHistory()

  const [userInfo] = useUserInfo.useStore()

  const [showModal, changShow] = useState(false)
  return (
    <Divs>
      <Divs className={styles.topHead}>
        <Image src={[userInfo.avatar, defaultImg]} />
        <Divs><Pars>{userInfo.nickname}</Pars><Text /></Divs>
      </Divs>
      <Divs className={styles.listLink}>
        <Link to='/changePassword'>
          <Image className={styles.leftIcon} src={password} />
          <Pars>修改密码</Pars>
          <span />
        </Link>

        <Link to='/about'>
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
            <button
              onClick={() => {
                userState.clearToken()
                history.replace('/login')
              }}>清空
            </button>
          </Divs>
        </Divs>
      </Modal>
    </Divs>)
}

export default Mine
