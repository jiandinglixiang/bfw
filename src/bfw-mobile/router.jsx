import React from 'react'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/global.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './page/home/home'
import { Details } from './page/details/details'
import FastClick from 'fastclick'

document.querySelector('#meta-index').content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'

FastClick.attach(document.body)

function Router () {
  return <HashRouter>
    <Switch>
      <Route
        exact
        path={[
          '/details/:smid/:gameName/:matchName/:tamePvp/:gameId',
          '/details']}
      >
        <Details />
      </Route>
      <Route exact path='/about'><Details /></Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  </HashRouter>
}

export default Router
