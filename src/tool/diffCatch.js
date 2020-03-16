import { diffCatch, toBigNumber } from './util.js'

export function diffCatch21 (obj, ReturnObj) {
  const formType1 = Object.prototype.toString.call(ReturnObj)
  const formType2 = Object.prototype.toString.call(obj)
  const isObj2 = formType2 === '[object Object]'
  let isObj = formType1 === '[object Object]'
  let arr
  if (isObj) {
    arr = Object.keys(ReturnObj)
    isObj = !!arr.length
  }
  if (isObj2 && isObj) {
    let copyObj
    try {
      copyObj = { ...obj }
      arr.forEach(function (key) {
        copyObj[key] = diffCatch(obj[key])(ReturnObj[key])
      })
      return copyObj
    } catch (e) {
      console.log(e)
      return ReturnObj
    }
  } else if (formType1 === formType2) {
    return obj
  } else if (obj && formType1 === '[object Number]' && formType2 === '[object String]') {
    return toBigNumber(obj).toNumber()
  } else {
    if (obj) {
      console.warn('类型不服合!', '实际=', obj, '预期=', ReturnObj)
    }
    return ReturnObj
  }
}

export function diffCatch22 (obj, backObj) {
  const backType = typeof backObj
  const upType = typeof obj

  if (backType === 'object') {
    // 复杂类型
    if (upType !== 'object') return backObj
    const type1 = Object.prototype.toString.call(backObj)
    const type2 = Object.prototype.toString.call(obj)
    if (type1 === type2) {
      if (type2 === '[object Object]') {
        return Object.entries(backObj).reduce(function (init, arr) {
          init[arr[0]] = obj[arr[0]] === undefined ? diffCatch22(obj[arr[0]], arr[1]) : arr[1]
          return init
        }, {})
      }
      // obj
      return obj
    }
    console.warn('类型不服合!', obj, '实际=', upType, '预期=', backType)
    return backObj
  } else if (backType === upType) {
    // 基础类型
    return obj
  } else if (backType === 'number' && upType === 'string') {
    console.warn('类型不服合!', obj, '实际=', upType, '预期=', backType)
    return (upType && parseFloat(upType)) || backType
  }
  obj && console.warn('类型不服合!', obj, '实际=', upType, '预期=', backType)
  return backObj
}
