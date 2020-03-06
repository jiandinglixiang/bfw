import React, { useMemo, useState } from 'react'
import { PropTypes } from '../../../tool/util.js'

function filterBool (x) {
  return !!x
}

function useMemo2 (className) {
  return useMemo(function () {
    if (className) {
      if (Array.isArray(className)) {
        return className.filter(filterBool).join(' ')
      }
      return className
    } else {
      return ''
    }
  }, [className])
}

export function Divs (props = {}) {
  const className = useMemo2(props.className)
  if (props.hide) {
    return null
  }
  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  )
}

export function Pars (props = {}) {
  const className = useMemo2(props.className)
  if (props.hide) {
    return null
  }
  return (
    <p {...props} className={className}>
      {props.children}
    </p>
  )
}

export function Text (props = {}) {
  const className = useMemo2(props.className)
  if (props.hide) {
    return null
  }
  return (
    <span {...props} className={className}>
      {props.children}
    </span>
  )
}

export function Image (props = {}) {
  const className = useMemo2(props.className)
  const isArray = Array.isArray(props.src)
  const [src, updateSrc] = useState(isArray ? props.src.find(filterBool) : props.src)
  if (props.hide) {
    return null
  }
  return (
    <img
      {...props}
      className={className}
      src={src}
      alt=''
      onError={() => {
        // 如果发生错误显示图片数组SRC之后的
        if (isArray) {
          const index = props.src.indexOf(src)
          if (index !== -1 && props.src[index + 1]) {
            updateSrc(props.src[index + 1])
          }
        }
      }}
    />
  )
}

Divs.propTypes = {
  hide: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.any,
}
Pars.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.bool,
  className: PropTypes.any,
}
Text.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.bool,
  className: PropTypes.any,

}
Image.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.bool,
  className: PropTypes.any,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}
