import React, { useState } from 'react'
import liveBtnOn from '../../../assets/btn_live_on.png'
import { Icon, Modal } from 'antd-mobile'
import styles from './index.module.scss'
import { useDiffCatch } from '../../../../tool/util.js'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function onPress (value) {
  window.open(value.live_h5_url || value.live_url, '_blank')
}
function LiveButton (props) {
  const [show, changShow] = useState(false)
  const { liveList } = useDiffCatch(props)({ liveList: [] })
  return (
    <div style={{ textAlign: 'center' }}>
      <Image onClick={() => changShow(!show)} src={liveBtnOn} width='80' height='30' />
      <Modal
        visible={show}
        transparent
        title={<span style={{ fontWeight: 'bold' }}>请选择直播源</span>}
        onClose={() => changShow(!show)}>
        <div>
          {
            liveList.map((value, index) => {
              return (
                <div className={styles.modalBody} key={index} onClick={() => onPress(value)}>
                  <span>{value.live_name || '---'}</span>
                  <Icon type='right' />
                </div>
              )
            })
          }
        </div>
      </Modal>
    </div>
  )
}

export default LiveButton
