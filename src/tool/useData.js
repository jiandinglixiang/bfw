import { useEffect, useMemo, useState } from 'react'

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

  function setStore (data) {
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

  const useStore = [(filterFunc) => {
    if (process.env.NODE_ENV !== 'production') {
      if (filterFunc !== undefined && typeof filterFunc !== 'function') {
        throw Error('filterFunc必须是函数')
      }
    }
    const [value, func] = useState(state)
    useEffect(loadLoop.bind(null, mapLoop, func), [func])
    if (typeof filterFunc === 'function') {
      const newValue = useMemo(privatization.bind(null, value, filterFunc), [value])
      return [newValue, setStore]
    }
    return [value, setStore]
  }]
  return {
    useStore: useStore[0],
    setStore,
    getStore: () => state
  }
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
    useStoreX: useStore[0],
    dispatchX: dispatchFunc,
    getStoreX: () => state
  }
}

// const [state, amend, amendThrottle] = useGlobal() // 多地多次使用
