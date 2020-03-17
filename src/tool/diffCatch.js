import { toBigNumber } from './util.js'

export function diffCatch (value, defaultValue) {
  if (value === undefined) return defaultValue
  const upType = typeof value
  const backType = typeof defaultValue
  if (backType === 'object') {
    // 复杂类型
    if (upType !== 'object') {
      errorTip(value, upType, backType)
      return defaultValue
    }
    const type1 = Object.prototype.toString.call(defaultValue)
    const type2 = Object.prototype.toString.call(value)
    if (type1 === type2) {
      if (type2 === '[object Object]') {
        return Object.entries(defaultValue).reduce(function (init, arr) {
          init[arr[0]] = diffCatch(init[arr[0]], arr[1])
          return init
        }, { ...value })
      }
      return value
    }
    // errorTip(value, type2, type1)
    return defaultValue
  }
  if (backType === upType) {
    return value
  }
  if (backType === 'number' && upType === 'string') {
    // errorTip(value, upType, backType)
    return (value && parseFloat(value)) || defaultValue
  }
  errorTip(value, upType, backType)
  return defaultValue
}

function diffCatch2 (value, defaultValue) {
  const formType1 = Object.prototype.toString.call(defaultValue)
  const formType2 = Object.prototype.toString.call(value)
  const isObj2 = formType2 === '[object Object]'
  let isObj = formType1 === '[object Object]'
  let arr
  if (isObj) {
    arr = Object.keys(defaultValue)
    isObj = !!arr.length
  }
  if (isObj2 && isObj) {
    let copyObj
    try {
      copyObj = { ...value }
      arr.forEach(function (key) {
        copyObj[key] = diffCatch2(value[key], defaultValue[key])
      })
      return copyObj
    } catch (e) {
      console.log(e)
      return defaultValue
    }
  } else if (formType1 === formType2) {
    return value
  } else if (value && formType1 === '[object Number]' && formType2 === '[object String]') {
    return toBigNumber(value).toNumber()
  } else {
    if (value) {
      console.warn('类型不服合!', '实际=', value, '预期=', defaultValue)
    }
    return defaultValue
  }
}

function errorTip (obj, upType, backType) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('类型不服合!', obj, '实际=', upType, '预期=', backType)
  }
}

/*

window.timeasd2 = () => {
  setTimeout(function () {
    console.time('22')
    new Array(10000).fill(1).map(v => {
      diffCatch22({
        a: '1',
        b: 2,
        c: null,
        d: true,
        e () {},
        f: {
          a: 1,
          b: '2',
          c: null,
          d: true,
          e () {},
          f: {
            a: 1,
            b: '2',
            c: null,
            d: true,
            e () {},
            f: {},
            g: [1, 2, 3, 4, 5, 6, 1321, 654, 6541, 1]
          },
          g: [1, 2, 3, 4, 5, 6, 1321, 654, 6541, 1]
        },
        g: [1, 2, 3, 4, 5, 6, 1321, 654, 6541, 1]
      }, {
        a: 1,
        b: '2',
        c: null,
        d: true,
        e () {},
        f: {
          a: 1,
          b: '2',
          c: null,
          d: true,
          e () {},
          f: {
            a: 1,
            b: '2',
            c: null,
            d: true,
            e () {},
            f: {},
            g: [1, 2, 3, 4, 5, 6, 1321, 654, 6541, 1]
          },
          g: [1, 2, 3, 4, 5, 6, 1321, 654, 6541, 1]
        },
        g: [1, 2, 3, 4, 5, 6, 1321, 654, 6541, 1]
      })
    })
    console.timeEnd('22')
  }, 100)
}
*/
export default diffCatch
