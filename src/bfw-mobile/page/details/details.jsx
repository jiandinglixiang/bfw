import React, { useEffect, useMemo, useState } from 'react'
import HeadBar from '../../components/HeadBar/HeadBar.jsx'
import styles from './index.module.scss'
import { queryToObj, useDiffCatch } from '../../../tool/util.js'
import TopLogoNameScore from './TopLogoNameScore/TopLogoNameScore.jsx'
import Page0 from './DetailsPage/Page0.jsx'
import Page1 from './DetailsPage/Page1.jsx'
import Page2 from './DetailsPage/Page2.jsx'
import LiveButton from './LiveButton/LiveButton.jsx'
import { Route, Switch, useLocation } from 'react-router-dom'
import BothPage from './DetailsPage/BothPage.jsx'
import UseStore, { detailsData } from './UseStore.js'
import { Divs } from '../../components/BasicsHtml/BasicsHtml.jsx'

export function comparisonUtil (gameId, gameStatus) {
  // equalStatus
  function eq (a, b) {
    if (b === undefined) {
      return true
    }
    if (a === b) {
      return true
    }
    if (Array.isArray(b) && b.includes(a)) {
      return true
    }
    return false
  }

  return function (id, status) {
    // id 游戏
    // status 0未开始1进行中2以结束
    return eq(gameId, id) && eq(gameStatus, status)
  }
}

function TabsList () {
  const [state] = detailsData.useStore()
  const stateVE = useDiffCatch(state)({
    match_list: {
      status: 0,
      odds_list: []
    }
  })
  const [tabIndex, update] = useState(0)
  return (
    <div>
      <div className={styles.tabsList}>
        <Divs
          className={tabIndex === 0 && styles.active}
          onClick={() => update(0)}>
          <p>指数分析</p>
        </Divs>
        <Divs
          className={tabIndex === 1 && styles.active}
          onClick={() => update(1)}>
          <p>历史数据</p>
        </Divs>
        <Divs
          className={tabIndex === 2 && styles.active}
          onClick={() => update(2)}>
          <p>{stateVE.match_list.status === 2 ? '赛果' : '赛况'}</p>
        </Divs>
      </div>
      <div className={styles.paddingBody + ' ' + styles.paddingBody2}>
        <div style={{ display: tabIndex === 0 ? 'block' : 'none' }}>
          <Page0 oddList={stateVE.match_list.odds_list} />
        </div>
        {
          tabIndex === 1 && <Page1 />
        }
        {
          tabIndex === 2 && <Page2 />
        }
      </div>
    </div>)
}

function Details () {
  const [state] = detailsData.useStore()
  return (
    <div>
      <div style={{
        paddingTop: '16px',
        minHeight: '121px'
      }}>
        <TopLogoNameScore matchList={state.match_list} />
        <LiveButton liveList={state.live_list} />
      </div>
      <TabsList />
    </div>
  )
}

function DetailsContainer () {
  const location = useLocation()
  const search = useMemo(function () {
    return queryToObj(location.search)
  }, [location.search])

  useEffect(() => {
    window.scrollTo(0, 0)
    const time = setInterval(function () {
      // UseStore.getDetails(search.smid)
    }, 5000)
    UseStore.getDetails(search.smid)
    return function () {
      clearTimeout(time)
    }
  }, [search])
  return (
    <div className={styles['game-rear-' + search.gameId]}>
      <HeadBar title={search.matchName} />
      <Switch>
        <Route path='/details/both'><BothPage search={search} /></Route>
        <Route path='/details'><Details search={search} /></Route>
      </Switch>
    </div>)
}

export default DetailsContainer
