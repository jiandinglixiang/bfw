export function updateDeviceSize () {
  const el = window.document.documentElement || window.document.body
  if (!el) return
  let time

  function updates () {
    const width = el.offsetWidth > 750 ? 750 : el.offsetWidth < 320 ? 320 : el.offsetWidth
    window.document.documentElement.style.fontSize = `${width * 0.0375}px`
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
    ? window.document.body.style.fontSize = '12px'
    : window.addEventListener('DOMContentLoaded', (e) => {
      window.document.body.style.fontSize = '12px'
    }, false)
  updates()
}
