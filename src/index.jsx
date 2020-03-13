import React, { lazy, Suspense } from 'react'
import 'react-app-polyfill/stable'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import device from 'current-device'

let App
if (device.mobile() || (() => true)) {
  const MobileRouter = lazy(() => import(/* webpackChunkName: 'mobile' */'./bfw-mobile/router'))
  App = <Suspense fallback={<div>Loading...</div>}><MobileRouter /></Suspense>
} else {
  const WebRouter = lazy(() => import(/* webpackChunkName: 'web' */'./bfw-web/router'))
  const store = require('./bfw-web/store').default
  const Provider = require('react-redux').Provider
  App = <Provider store={store}><Suspense fallback={<div>Loading...</div>}><WebRouter /></Suspense></Provider>
}
ReactDOM.render(App, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
// 模块热替换的 API
if (module.hot) {
  module.hot.accept()
}
