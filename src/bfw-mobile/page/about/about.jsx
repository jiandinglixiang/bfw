import React from 'react'
import styles from '../mine/changePassword/index.module.scss'
import nevBar from '../../assets/nav_back.png'
import { useHistory } from 'react-router-dom'
import { Image } from '../../components/BasicsHtml/BasicsHtml.jsx'
import WebIframe from '../../components/WebIframe/WebIframe.jsx'

function About () {
  const history = useHistory()
  const el = window.document.documentElement || window.document.body
  const minHeight = el.clientHeight - 45 + 'px'
  const height = 'calc(100vh - 45px)'
  return <div>
    <div className={styles.heardNav}>
      <Image src={nevBar} onClick={() => history.goBack()} />
      <div>关于我们</div>
    </div>
    <WebIframe height={height} minHeight={minHeight} src='http://scoredownloadtest.firebulls.net/help/about' />
  </div>
}

About.propTypes = {}
export default About
