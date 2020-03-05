import React, { useMemo } from 'react'
import { PropTypes } from '../../../tool/util.js'

function useMemo2 (className) {
  return useMemo(function () {
    if (className && Array.isArray(className)) {
      return className.join(' ')
    }
    return className
  }, [className])
}

function Dd (props = {}) {
  const className = useMemo2(props.className)
  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  )
}

function Pp (props = {}) {
  const className = useMemo2(props.className)
  return (
    <p {...props} className={className}>
      {props.children}
    </p>
  )
}

function Ss (props = {}) {
  const className = useMemo2(props.className)
  return (
    <span {...props} className={className}>
      {props.children}
    </span>
  )
}

function Image (props = {}) {
  const className = useMemo2(props.className)
  return (
    <img
      {...props}
      className={className}
      onError={err => {
        console.log(err)
      }}
    />
  )
}

Dd.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
}
Pp.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
}
Ss.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
}
Image.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
}
