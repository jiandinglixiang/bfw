import React, { useMemo } from 'react'
import { PropTypes } from '../../../tool/util.js'

function filterBool (x) {
  return !!x
}

function useClassName (className) {
  return useMemo(function () {
    if (className) {
      if (Array.isArray(className)) {
        return className.filter(filterBool).join(' ')
      }
      return className
    }
    return null
  }, [className])
}

export const Tag = {
  Div ({ hide, className, children, ...props }) {
    className = useClassName(className)
    if (hide) return null
    if (className) {
      props.className = className
    }
    return (
      <div {...props}>
        {children}
      </div>
    )
  },
  P ({ hide, className, children, ...props }) {
    className = useClassName(className)
    if (hide) return null
    if (className) {
      props.className = className
    }
    return (
      <p {...props}>
        {children}
      </p>
    )
  },
  Span ({ hide, className, children, ...props }) {
    className = useClassName(className)
    if (hide) return null
    if (className) {
      props.className = className
    }
    return (<span {...props}>{children}</span>)
  },
  Img ({ hide, className, src, ...props }) {
    const isArray = Array.isArray(src)
    className = useClassName(className)
    const img = useMemo(function () {
      return isArray ? src.find(filterBool) : src
    }, [isArray, src])
    if (props.hide) return null
    if (className) {
      props.className = className
    }
    if (img) {
      props.src = img
    }
    return (
      <img
        {...props}
        alt=''
        onError={(ele) => {
          // 如果发生错误显示图片数组SRC之后的
          if (isArray) {
            const index = src.indexOf(img)
            if (index !== -1 && src[index + 1]) {
              ele.currentTarget.src = src[index + 1]
            }
          }
        }}
      />
    )
  }
}
export const Divs = Tag.Div
export const Pars = Tag.P
export const Text = Tag.Span
export const Image = Tag.Img

Tag.Div.propTypes = {
  hide: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.any,
}
Tag.P.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.bool,
  className: PropTypes.any,
}
Tag.Span.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.bool,
  className: PropTypes.any,

}
Tag.Img.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.bool,
  className: PropTypes.any,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
}
