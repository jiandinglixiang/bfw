import React from 'react'
import aboutImg from '../../assets/aboutus_pic.png'
import styles from '../mine/changePassword/index.module.scss'
import nevBar from '../../assets/nav_back.png'
import { PropTypes } from '../../../tool/util.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Image } from '../../components/BasicsHtml/BasicsHtml.jsx'

function About (props) {
  const { height } = props
  const history = useHistory()
  const autoWidth = {
    width: '100%',
    minHeight: `${height - 45}px`,
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

About.propTypes = {
  height: PropTypes.number,
}

function mapStateToProps (state) {
  return {
    height: state.device.height
  }
}

export default connect(mapStateToProps)(About)
