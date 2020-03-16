import React from 'react'
import { PropTypes } from '../../../tool/util.js'

function WebIframe ({ src = '', minHeight = '', height = '' }) {
  const styles = {
    width: '100%',
    minHeight,
    height,
    overflow: 'hidden'
  }
  return <iframe
    style={styles}
    src={src}
    frameBorder='0'
    scrolling='no'
  />
}

export default WebIframe

WebIframe.propTypes = {
  height: PropTypes.string,
  minHeight: PropTypes.string,
  src: PropTypes.string
}
