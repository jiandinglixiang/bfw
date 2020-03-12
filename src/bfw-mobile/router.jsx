import React from 'react'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/global.css'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from './page/home/home'
import DetailsContainer from './page/details/DetailsContainer.jsx'
import FastClick from 'fastclick'
import TabBar from './components/TabBar/TabBar.jsx'
import Login from './page/mine/login/Login.jsx'
import ChangePassword from './page/mine/changePassword/ChangePassword.jsx'
import About from './page/about/about.jsx'
import { updateDeviceSize } from './device.js'
import Mine from './page/mine/mine.jsx'
import { userState } from '../tool/userToken.js'
import { PropTypes } from '../tool/util.js'

document.querySelector('#meta-index').content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'

FastClick.attach(document.body)

updateDeviceSize()

function PrivateRoute ({ children, ...attr }) {
  if (userState.userToken()) {
    return <Route {...attr}>{children}</Route>
  }
  return <Redirect to='/login' />
}

function MoreRouter1 () {
  return <div>
    <Switch>
      <Route exact path='/'><Home /></Route>
      <PrivateRoute path='/mine'><Mine /></PrivateRoute>
      <Route path='/login'><Login /></Route>
    </Switch>
    <TabBar />
  </div>
}

function Router () {
  return <HashRouter>
    <Switch>
      <Route exact path='/'><MoreRouter1 /></Route>
      <Route path='/details'><DetailsContainer /></Route>
      <Route path='/changePassword'><ChangePassword /></Route>
      <Route path='/about'><About /></Route>
      <Route path='/'><MoreRouter1 /></Route>
    </Switch>
  </HashRouter>
}

export default Router

PrivateRoute.propTypes = {
  children: PropTypes.any
}
