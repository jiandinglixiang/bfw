import moment from 'moment'
import defaultImg from '../bfw-mobile/assets/default_team_60.png'
import BigNumber from 'bignumber.js'
import 'moment/locale/zh-cn'
import propTypes from 'prop-types'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

moment.locale('zh-cn')
BigNumber.config({ ROUNDING_MODE: 1 })

export const PropTypes = propTypes

export function Moment (...props) {
  return moment(...props)
}

BigNumber.config({ ROUNDING_MODE: 1 })

export function toBigNumber (x) {
  return new BigNumber(x)
}

export function toFixed (value) {
  try {
    return toBigNumber(value).toFixed(2)
  } catch (e) {
    return value
  }
}

export function searchFormat (obj) {
  // 对象转查询字符串
  if (typeof obj !== 'object') return ''
  try {
    const searchParams = new URLSearchParams('')
    Object.entries(obj).forEach(value => {
      searchParams.append(value[0], value[1])
    })
    const search = searchParams.toString()
    return search ? '?' + search : ''
  } catch (e) {
    return ''
  }
}

export function searchToObject (search = '', original) {
  // 查询字符串转对象
  const obj = {}
  try {
    let paramsString = ''
    if (search.includes('?')) {
      paramsString = search.substring(1)
    }
    const searchParams = new URLSearchParams(paramsString)
    if (original) {
      return searchParams
    }
    for (const pair of searchParams.entries()) {
      obj[pair[0]] = pair[1]
    }
    return obj
  } catch (e) {
    return original ? new URLSearchParams() : obj
  }
}

export function formatDate (time, forme) {
  try {
    return moment(time).format(forme || 'YYYY-MM-DD HH:mm')
  } catch (e) {
    return time
  }
}

export function formatDate2 (time) {
  try {
    return moment(time).format('MM-DD  HH:mm')
  } catch (e) {
    return time || ''
  }
}

export const dayName = (() => {
  const nowDate = moment()
  const today = nowDate.format('YYYY-MM-DD')
  nowDate.add(1, 'days')
  const tomorrow = nowDate.format('YYYY-MM-DD')
  nowDate.subtract(2, 'days')
  const yesterday = nowDate.format('YYYY-MM-DD')
  return [yesterday, today, tomorrow]
})()

export function inning (value) {
  if (!value || value === 0) return '全局'
  const arr = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  value = value.toString()
  if (value < 10) {
    return `第${arr[value]}局`
  } else if (value < 20) {
    return `第十${arr[value[1]]}局`
  } else if (value < 100) {
    return `第${arr[value[0]]}十${arr[value[1]]}局`
  } else {
    return `第${value}局`
  }
}

export function dayCallInit (time, length) {
  return function () {
    const date = Moment(time)
    let str = ''
    if (date.isSame(dayName[0])) {
      // 昨天
      str = '昨天'
    } else if (date.isSame(dayName[1])) {
      // 今天
      str = '今天'
    } else if (date.isSame(dayName[2])) {
      // 明天
      str = '明天'
    }
    return `${date.format('MM月DD日')} ${str}  ${length}场比赛`
  }
}

export function distanceNow (time) {
  const startDate = moment(time)
  const endDate = moment()
  const hm = endDate.diff(startDate) // 返回毫秒数
  return (hm / 1000 / 60 > 360) ? parseInt(hm / 1000 / 60) : ''
}

// eslint-disable-next-line camelcase
export function oddSort ({ odds, host_team_name }) {
  if (Array.isArray(odds)) {
    const oddsCpy = []
    odds.forEach(
      v => {
        // eslint-disable-next-line camelcase
        v.name === host_team_name ? oddsCpy.unshift(v) : oddsCpy.push(v)
      })
    return oddsCpy
  }
  return []
}

export function initOddAndLogoMobile (item, score) {
  const { score1, score2 } = score || {}
  const tameName = [
    {
      logo: item.host_team_logo,
      name: item.host_team_name,
      odds: null,
      score: score1 || [],
    },
    {
      logo: item.guest_team_logo,
      name: item.guest_team_name,
      odds: null,
      score: score2 || [],
    },
  ]
  if (Array.isArray(item.odds)) {
    return oddSort(item).map(value => {
      let nameLogo = {
        id: value.id,
        name: value.name,
        logo: defaultImg,
        odds: value.odds,
      }
      let tap
      if ((tap = tameName.find(value1 => value1.name === value.name))) {
        nameLogo = tap
        nameLogo.odds = value.odds
        nameLogo.id = value.id
      }
      return nameLogo
    })
  }
  return tameName
}

export function toLowerCaseEqual (name1, name2) {
  try {
    return name1.toLocaleLowerCase() === name2.toLocaleLowerCase()
  } catch (e) {
    return name1 === name2
  }
}

export function initOddAndLogo (item, score) {
  const { score1, score2 } = score || {}
  const tameName = [
    { logo: item.host_team_logo, name: item.host_team_name, odds: null, score: score1 || [] },
    { logo: item.guest_team_logo, name: item.guest_team_name, odds: null, score: score2 || [] }
  ]
  if (Array.isArray(item.odds)) {
    return oddSort(item).map(value => {
      let nameLogo = { id: value.id, name: value.name, logo: defaultImg, odds: value.odds }
      let tap
      if ((tap = tameName.find(value1 => toLowerCaseEqual(value1.name, value.name)))) {
        nameLogo = tap
        nameLogo.odds = value.odds
        nameLogo.id = value.id
      }
      return nameLogo
    })
  }
  return tameName
}

export function diffCatch2 (obj, ReturnObj) {
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
  } else if (formType1 === '[object Number]' && formType2 === '[object String]') {
    return toBigNumber(obj).toNumber()
  } else {
    if (obj) {
      console.warn('类型不服合!', '实际=', obj, '预期=', ReturnObj)
    }
    return ReturnObj
  }
}

export function diffCatch (obj) {
  // 所见即所得，多成数据取除保存
  return function (ReturnObj) {
    return diffCatch2(obj, ReturnObj)
  }
}

export function objCatch (obj, expected = {}) {
  return function (arrayOrKey) {
    try {
      if (Array.isArray(arrayOrKey)) {
        let temp = obj
        for (const key of arrayOrKey) {
          if (temp[key]) {
            temp = temp[key]
          } else {
            temp = expected
            break
          }
        }
        return temp || expected
      } else {
        return obj[arrayOrKey] || expected
      }
    } catch (e) {
      return expected
    }
  }
}

export function useSearch () {
  const location = useLocation()
  const search = useMemo(function () {
    try {
      const params = new URLSearchParams(location.search.slice(1))
      return Object.fromEntries(params.entries())
    } catch (err) {
      console.error('查询参数错误', err)
      return {}
    }
  }, [location.search])
  return [search, location]
}
