import React from 'react'
import 'antd/dist/antd.css'
import './page/index/global.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './page/home'
import AnalysisData from './page/AnalysisData'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import AboutUs from './page/aboutUs'

document.querySelector('#meta-index').content = 'width=device-width, initial-scale=1'

function Router () {
  return <ConfigProvider locale={zhCN}>
    <HashRouter>
      <Switch>
        <Route
          exact
          path='/analysisData'>
          <AnalysisData />
        </Route>
        <Route
          exact
          path='/aboutUs'>
          <AboutUs />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  </ConfigProvider>
}

export default Router
