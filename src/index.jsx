import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import device from 'current-device'

let Router
let store
if (device.mobile()) {
  Router = lazy(() => import(/* webpackChunkName: 'mobile' */'./bfw-mobile/router'))
  store = require('./bfw-mobile/redux').default
} else {
  Router = lazy(() => import(/* webpackChunkName: 'web' */'./bfw-web/router'))
  store = require('./bfw-web/store').default
}
ReactDOM.render(<Provider store={store}>
  <Suspense fallback={<div>Loading...</div>}>
    <Router />
  </Suspense>
</Provider>, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
