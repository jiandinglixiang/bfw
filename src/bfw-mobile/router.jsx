import React from 'react'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/global.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './page/home/home'
import Details from './page/details/details'
import FastClick from 'fastclick'
import TabBar from './components/TabBar/TabBar.jsx'
import Mine from './page/mine/mine.jsx'
import Login from './page/mine/login/Login.jsx'
import ChangePassword from './page/mine/changePassword/ChangePassword.jsx'
import About from './page/about/about.jsx'

document.querySelector('#meta-index').content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'

FastClick.attach(document.body)

function MoreRouter1 () {
  return <>
    <Switch>
      <Route path='/mine'><Mine /></Route>
      <Route path='/login'><Login /></Route>
      <Route path='/'><Home /></Route>
    </Switch>
    <TabBar />
  </>
}

function Router () {
  return <HashRouter>
    <Switch>
      <Route exact path='/'><MoreRouter1 /></Route>
      <Route path='/details'><Details /></Route>
      <Route path='/changePassword'><ChangePassword /></Route>
      <Route path='/about'><About /></Route>
      <Route path='/'><MoreRouter1 /></Route>
    </Switch>
  </HashRouter>
}

export default Router
