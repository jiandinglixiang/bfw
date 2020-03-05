import React, { useMemo, useState } from 'react'
import { PropTypes } from '../../../tool/util.js'

function useMemo2 (className) {
  return useMemo(function () {
    if (className && Array.isArray(className)) {
      return className.filter(v => !!v).join(' ')
    }
    return className
  }, [className])
}

export function Divs (props = {}) {
  const className = useMemo2(props.className)
  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  )
}

export function Pars (props = {}) {
  const className = useMemo2(props.className)
  return (
    <p {...props} className={className}>
      {props.children}
    </p>
  )
}

export function Text (props = {}) {
  const className = useMemo2(props.className)
  return (
    <span {...props} className={className}>
      {props.children}
    </span>
  )
}

export function Image (props = {}) {
  const className = useMemo2(props.className)
  const isArray = Array.isArray(props.src)
  const [src, updateSrc] = useState(isArray ? props.src[0] : props.src)
  return (
    <img
      {...props}
      className={className}
      src={src}
      onError={() => {
        if (isArray && props.src[1]) {
          updateSrc(props.src[1])
        }
      }}
    />
  )
}

Divs.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}
Pars.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}
Text.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}
Image.propTypes = {
  children: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}
