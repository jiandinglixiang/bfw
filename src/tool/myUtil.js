function classFilter (className) {
  if (className) {
    if (Array.isArray(className)) {
      className = className.filter(x => x).join(' ')
      if (!className) {
        return
      }
    }
    return { className }
  }
}

function fromEntries (arr) {
  return arr.reduce(function (obj, val) {
    obj[val[0]] = val[1]
    return obj
  }, {})
}

function searchObject (search) {
  try {
    if (typeof search !== 'string') {
      return {}
    }
    const params = new URLSearchParams(search)
    if (!Object.fromEntries) {
      return fromEntries([...params.entries()])
    }
    return Object.fromEntries(params.entries())
  } catch (err) {
    console.error('查询参数错误', err)
    return {}
  }
}

function findSearch (location) {
  const hash = location.hash.indexOf('?')
  if (hash !== -1) {
    return location.hash.slice(hash + 1)
  }
  const search = location.search.indexOf('?')
  if (search !== -1) {
    return location.search.slice(search + 1)
  }
  return ''
}

export default {
  fromEntries,
  classFilter,
  searchObject,
  findSearch
}
