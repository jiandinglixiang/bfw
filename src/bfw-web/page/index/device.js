export const DEVICE_SIZE_CHANGE = 'DEVICE_SIZE_CHANGE'

const current = {
  data () {
    return {
      width: 320,
      height: 320
    }
  },
  reducer (state = current.data(), action) {
    switch (action.type) {
      case DEVICE_SIZE_CHANGE:
        return { width: action.width || 320, height: action.height || 320 }
      default:
        return state
    }
  },
  effects: [],
  method: {
    update (store) {
      const el = window.document.documentElement || window.document.body
      if (!el) return
      let time

      function updates () {
        const size = el.offsetWidth > 640 ? 64 : el.offsetWidth / 10
        window.document.documentElement.style.fontSize = size + 'px'
        store.dispatch({
          type: DEVICE_SIZE_CHANGE,
          width: el.offsetWidth > 640 ? 640 : el.offsetWidth,
          height: el.offsetHeight || window.screen.availHeight
        })
      }

      window.addEventListener('resize', function () {
        clearTimeout(time)
        time = setTimeout(updates, 300)
      }, false)
      window.addEventListener('pageshow', function (n) {
        if (n.persisted) {
          clearTimeout(time)
          time = setTimeout(updates, 300)
        }
      }, false)
      window.document.readyState === 'complete' ? window.document.body.style.fontSize = '12px' : window.addEventListener('DOMContentLoaded', function (e) {
        window.document.body.style.fontSize = '12px'
      }, false)
      updates()
    }
  }
}

export default current
