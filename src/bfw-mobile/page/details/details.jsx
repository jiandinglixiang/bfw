import React, { useEffect, useState } from 'react'
import HeadBar from '../../components/HeadBar/HeadBar.jsx'
import styles from './index.module.scss'
import { store } from '../../redux'
import { getMatchDetailsAsync } from './store'
import { diffCatch, PropTypes, useSearch } from '../../../tool/util.js'
import TopLogoNameScore from './TopLogoNameScore/TopLogoNameScore.jsx'
import { connect } from 'react-redux'
import Page0 from './DetailsPage/Page0.jsx'
import Page1 from './DetailsPage/Page1.jsx'
import Page2 from './DetailsPage/Page2.jsx'
import LiveButton from './LiveButton/LiveButton.jsx'

function equalActive (index, eq) {
  return index === eq ? styles.active : ''
}

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

function TabsList ({ gameOver, index, updateIndex }) {
  return <div className={styles.tabsList}>
    <div
      className={equalActive(index, 0)}
      onClick={() => updateIndex(0)}>
      <p>指数分析</p>
    </div>
    <div
      className={equalActive(index, 1)}
      onClick={() => updateIndex(1)}>
      <p>历史数据</p>
    </div>
    <div
      className={equalActive(index, 2)}
      onClick={() => updateIndex(2)}>
      <p>{gameOver ? '赛果' : '赛况'}</p>
    </div>
  </div>
}

function Details (props) {
  const [search] = useSearch()
  const [tabIndex, update] = useState(0)
  useEffect(() => {
    store.dispatch(getMatchDetailsAsync(search.smid))
    window.scrollTo(0, 0)
  }, [search.smid])
  const { matchList, liveList } = diffCatch(props)({
    liveList: [],
    matchList: {
      game_name: '',
      game_type_id: 0,
      odds_list: [],
      score_list: [],
      status: 0 // 状态 0：未开始 1：进行中 2：已结束
    }
  })
  return (
    <div className={styles['game-rear-' + matchList.game_type_id]}>
      <HeadBar title={matchList.game_name} />
      <div style={{
        paddingTop: '16px',
        minHeight: '121px'
      }}>
        <TopLogoNameScore matchList={matchList} />
        {!!liveList.length && <LiveButton liveList={liveList} />}
      </div>
      <TabsList
        gameOver={matchList.status === 2}
        index={tabIndex}
        updateIndex={update}
      />
      <div className={styles.paddingBody}>
        <div style={{ display: tabIndex === 0 ? 'block' : 'none' }}>
          <Page0 oddList={matchList.odds_list} />
        </div>
        {
          tabIndex === 1 && <Page1 matchList={matchList} smid={matchList.smid} />
        }
        {
          tabIndex === 2 && <Page2 matchList={matchList} smid={matchList.smid} />
        }
      </div>
    </div>
  )
}

export default connect(function (state) {
  return {
    liveList: state.details.liveList,
    matchList: state.details.matchList
  }
})(Details)

TabsList.propTypes = {
  gameOver: PropTypes.bool,
  index: PropTypes.number,
  updateIndex: PropTypes.func
}
