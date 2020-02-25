export const DEVICE_SIZE_CHANGE = 'DEVICE_SIZE_CHANGE'

export function deviceSizeChange (data) {
  return {
    type: 'DEVICE_SIZE_CHANGE',
    ...data,
  }
}

export const device = {
  data () {
    return {
      width: 375,
      height: 375,
    }
  },
  reducer (state = device.data(), action) {
    switch (action.type) {
      case deviceSizeChange().type:
        return {
          width: action.width || 375,
          height: action.height || 375,
        }
      default:
        return state
    }
  },
}

export function updateDeviceSize (store) {
  const el = window.document.documentElement || window.document.body
  if (!el) return
  let time

  function updates () {
    const size = el.offsetWidth > 750 ? 75 : el.offsetWidth / 10
    window.document.documentElement.style.fontSize = `${size}px`
    store.dispatch(deviceSizeChange({
      width: el.offsetWidth > 750 ? 750 : el.offsetWidth,
      height: el.offsetHeight || window.screen.availHeight,
    }))
  }

  window.addEventListener('resize', () => {
    clearTimeout(time)
    time = setTimeout(updates, 300)
  }, false)
  window.addEventListener('pageshow', (n) => {
    if (n.persisted) {
      clearTimeout(time)
      time = setTimeout(updates, 300)
    }
  }, false)
  window.document.readyState === 'complete'
    ? window.document.body.style.fontSize = '13px'
    : window.addEventListener('DOMContentLoaded', (e) => {
      window.document.body.style.fontSize = '13px'
    }, false)
  updates()
}
