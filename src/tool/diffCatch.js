export default function diffCatch22 (obj, backObj) {
  if (obj === undefined) return backObj
  const upType = typeof obj
  const backType = typeof backObj
  if (backType === 'object') {
    // 复杂类型
    if (upType !== 'object') {
      errorTip(obj, upType, backType)
      return backObj
    }
    const type1 = Object.prototype.toString.call(backObj)
    const type2 = Object.prototype.toString.call(obj)
    if (type1 === type2) {
      if (type2 === '[object Object]') {
        return Object.entries(backObj).reduce(function (init, arr) {
          init[arr[0]] = diffCatch22(obj[arr[0]], arr[1])
          return init
        }, {})
      }
      return obj
    }
    errorTip(obj, upType, backType)
    return backObj
  } else if (backType === upType) {
    // 基础类型
    return obj
  } else if (backType === 'number' && upType === 'string') {
    errorTip(obj, upType, backType)
    return (upType && parseFloat(upType)) || backType
  }
  obj && errorTip(obj, upType, backType)
  return backObj
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
