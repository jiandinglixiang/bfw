import React from 'react'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/global.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './page/home/home'
import DetailsContainer from './page/details/DetailsContainer.jsx'
import FastClick from 'fastclick'
import TabBar from './components/TabBar/TabBar.jsx'
import Mine from './page/mine/mine.jsx'
import Login from './page/mine/login/Login.jsx'
import ChangePassword from './page/mine/changePassword/ChangePassword.jsx'
import About from './page/about/about.jsx'
import RouteC from './components/RouteC/RouteC.jsx'

document.querySelector('#meta-index').content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'

FastClick.attach(document.body)

function MoreRouter1 () {
  return <>
    <Switch>
      <RouteC path='/mine'><Mine /></RouteC>
      <RouteC path='/login'><Login /></RouteC>
      <RouteC path='/'><Home /></RouteC>
    </Switch>
    <TabBar />
  </>
}

function Router () {
  return <HashRouter>
    <Switch>
      <Route exact path='/'><MoreRouter1 /></Route>
      <RouteC path='/details'><DetailsContainer /></RouteC>
      <RouteC path='/changePassword'><ChangePassword /></RouteC>
      <RouteC path='/about'><About /></RouteC>
      <RouteC path='/'><MoreRouter1 /></RouteC>
    </Switch>
  </HashRouter>
}

export default Router
