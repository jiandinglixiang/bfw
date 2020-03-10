export function updateDeviceSize () {
  const el = window.document.documentElement || window.document.body
  if (!el) return
  let time

  function updates () {
    const big = el.offsetWidth > 750
    const small = el.offsetWidth < 320
    const size = big ? 75 : el.offsetWidth / 10
    window.document.documentElement.style.fontSize = `${size}px`
    const width = big ? 750 : small ? 320 : el.offsetWidth
    document.querySelector('#root').style = `width:${width}px;min-height:${width}px;margin:0 auto;`
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
