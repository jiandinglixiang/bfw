import { useEffect, useMemo, useState } from 'react'

// 自定义useState
export function globalDataInit (InitialValue) {
  const dispatch = new Map()
  let state = InitialValue
  let time = 0

  function dispose (updateValue) {
    if (updateValue === state) {
      console.log('无变化')
      return state
    }
    if (typeof updateValue !== typeof state) {
      return new Error(`newValue=${typeof updateValue} ！== state=${typeof state}`)
    }
    state = updateValue
    dispatch.forEach(function (UseStateFunc) {
      UseStateFunc(count => count + 1)
    })
    return state
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
    const func = value[1]
    useEffect(function () {
      const size = dispatch.size
      dispatch.set(dispatch.size, func)
      console.log('加载', size)
      return function () {
        dispatch.delete(size)
        console.log('卸载', size)
      }
    }, [func])
    // 返回值/修改函数/节流修改函数（100毫秒）
    return [
      state,
      amend,
      amendThrottle
    ]
  }
}

function eqType (a, b) {
  if (process.env.NODE_ENV !== 'production') {
    if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
      console.error('类型不统一')
    }
  }
}

function privatization (value, func) {
  if (typeof func === 'function') {
    return func(value)
  }
  return value
}

function loadLoop (mapLoop, func) {
  const size = mapLoop.size
  mapLoop.set(size, func)
  console.log('加载', size)
  return function () {
    mapLoop.delete(size)
    console.log('卸载', size)
  }
}

export function createUseStore (state) {
  const mapLoop = new Map()

  function setState (data) {
    const ret = typeof data === 'function' ? data(state) : data
    eqType(ret, state)
    if (Object.is(ret, state)) {
      // 相同不更新
      return
    }
    state = ret
    mapLoop.forEach(function (UseStateFunc) {
      UseStateFunc(state)
    })
    return state
  }

  return [(filterFunc) => {
    if (process.env.NODE_ENV !== 'production') {
      if (filterFunc !== undefined && typeof filterFunc !== 'function') {
        throw Error('filterFunc必须是函数')
      }
    }
    const [value, func] = useState(state)
    useEffect(loadLoop.bind(null, mapLoop, func), [func])
    if (typeof filterFunc === 'function') {
      const newValue = useMemo(privatization.bind(null, value, filterFunc), [value])
      return [newValue, setState]
    }
    return [value, setState]
  }, setState, () => state]
}

export function createUseReducer (reducer, state) {
  if (typeof reducer !== 'function') {
    throw Error('reducer 必须是func')
  }
  const mapLoop = new Map()

  function dispatchFunc (...action) {
    const ret = reducer(state, ...action)
    // console.log(JSON.parse(JSON.stringify(action)), JSON.parse(JSON.stringify(state)), JSON.parse(JSON.stringify(ret)), reducer)
    eqType(ret, state)
    if (Object.is(ret, state)) {
      // 相同不更新
      return
    }
    state = ret
    mapLoop.forEach(function (UseStateFunc) {
      UseStateFunc(state)
    })
    return state
  }

  const useStore = [(filterFunc) => {
    const [value, func] = useState(state)
    useEffect(loadLoop.bind(null, mapLoop, func), [func])
    if (typeof filterFunc === 'function') {
      const newValue = useMemo(privatization.bind(null, value, filterFunc), [value])
      return [newValue, dispatchFunc]
    } else {
      return [value, dispatchFunc]
    }
  }]
  return {
    useStore: useStore[0],
    dispatchFunc,
    getState: () => state
  }
}

// const [state, amend, amendThrottle] = useGlobal() // 多地多次使用
