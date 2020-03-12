import React from 'react'
import aboutImg from '../../assets/aboutus_pic.png'
import styles from '../mine/changePassword/index.module.scss'
import nevBar from '../../assets/nav_back.png'
import { useHistory } from 'react-router-dom'
import { Image } from '../../components/BasicsHtml/BasicsHtml.jsx'

function About (props) {
  const history = useHistory()
  const autoWidth = {
    width: '100%',
    backgroundColor: ' #06051A'
  }
  return <div>
    <div className={styles.heardNav}>
      <Image src={nevBar} onClick={() => history.goBack()} />
      <div>关于我们</div>
    </div>
    <Image src={aboutImg} style={autoWidth} />
  </div>
}

About.propTypes = {}
export default About
