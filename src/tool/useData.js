import { useEffect, useState } from 'react'

// 自定义useState
export function globalDataInit (InitialValue) {
  const dispatch = new Map()
  let state = InitialValue
  let time = 0

  function dispose (updateValue) {
    if (typeof updateValue !== typeof state) {
      return new Error(`newValue=${typeof updateValue} ！== state=${typeof state}`)
    }
    state = updateValue
    dispatch.forEach(function (UseStateFunc) {
      UseStateFunc(count => count + 1)
    })
  }

  function amend (updateValue) {
    if (typeof updateValue === 'function') {
      // updateValue（）可以返普通回函数/异步函数/者值
      const current = updateValue({ ...state })
      if (current && (typeof current === 'function' || (typeof current === 'object' && typeof current.then === 'function'))) {
        return Promise.resolve(current(state)).then(function (current2) {
          dispose(current2)
        })
      }
      return dispose(current)
    }
    return dispose(updateValue)
  }

  function amendThrottle (updateValue, timeOut) {
    clearTimeout(time)
    time = setTimeout(function () {
      amend(updateValue)
    }, timeOut || 100)
  }

  return function () {
    const value = useState(0)
    useEffect(function () {
      const size = dispatch.size
      dispatch.set(dispatch.size, value[1])
      console.log('加载', size)
      return function () {
        dispatch.delete(size)
        console.log('卸载', size)
      }
    }, [value[1]])
    // 返回值/修改函数/节流修改函数（100毫秒）
    return {
      state,
      amend,
      amendThrottle
    }
  }
}

// const [state, amend, amendThrottle] = useGlobal() // 多地多次使用
