import React, { useEffect, useMemo, useState } from 'react'
import { PropTypes } from '../../../tool/util.js'

function filterBool (x) {
  return !!x
}

function useMemo2 (props) {
  const className = useMemo(function () {
    if (props.className) {
      if (Array.isArray(props.className)) {
        return props.className.filter(filterBool).join(' ')
      }
      return props.className
    }
    return null
  }, [props.className])
  return useMemo(function () {
    const attrs = { ...props }
    if (attrs.className !== undefined) {
      attrs.className = className
    }
    if (attrs.hide !== undefined) {
      attrs.hide = null
    }
    return attrs
  }, [props, className])
}

export function Divs (props) {
  const attrs = useMemo2(props)
  if (props.hide) return null
  return (
    <div {...attrs}>
      {props.children}
    </div>
  )
}

export function Pars (props = {}) {
  const attrs = useMemo2(props)
  if (props.hide) return null
  return (
    <p {...attrs}>
      {props.children}
    </p>
  )
}

export function Text (props = {}) {
  const attrs = useMemo2(props)
  if (props.hide) return null
  return (
    <span {...attrs}>
      {props.children}
    </span>
  )
}

export function Image (props = {}) {
  const attrs = useMemo2(props)
  const isArray = Array.isArray(attrs.src)
  const [src, updateSrc] = useState(isArray ? attrs.src.find(filterBool) : attrs.src)
  useEffect(function () {
    updateSrc(isArray ? attrs.src.find(filterBool) : attrs.src)
  }, [isArray, attrs.src])
  if (props.hide) return null
  return (
    <img
      {...attrs}
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
