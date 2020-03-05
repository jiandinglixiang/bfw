import React from 'react'
import { Route } from 'react-router-dom'
import { PropTypes } from '../../../tool/util.js'
import { connect } from 'react-redux'

function RouteC (props = {}) {
  const autoStyle = {
    width: `${props.width}px`,
    minHeight: `${props.height}px`,
    margin: '0 auto'
  }
  return (
    <Route {...props}>
      <div style={autoStyle}>
        {props.children}
      </div>
    </Route>
  )
}

function mapStateToProps (state) {
  return {
    width: state.device.width,
    height: state.device.height,
  }
}

export default connect(mapStateToProps)(RouteC)

RouteC.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
  height: PropTypes.number,
}
