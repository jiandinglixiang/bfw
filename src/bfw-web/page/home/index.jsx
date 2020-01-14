import React, { useEffect } from 'react'
import styles from './index.module.scss'
import TopNav from '../../components/TopNav'
import DownBar from '../../components/DownBar'
import TopCarouselContent from './components/TopCarouselContent'
import GameMatchContent from './components/GameMatchContent'
import FriendlyLink from '../../components/FriendlyLink'
import DownloadQcr from '../../components/DownloadQcr'
import FixedRightContainer from '../../components/FixedRightContainer'
import { connect } from 'react-redux'
import { getGameKindAsync, getKindDataAsync } from './store'
import { useLocation } from 'react-router-dom'

function Home (props) {
  const { dispatch } = props
  const { search } = useLocation()
  const paramsString = search.substring(1)
  const searchParams = new URLSearchParams(paramsString)
  const gameId = searchParams.get('gameId')
  useEffect(function () {
    dispatch(getGameKindAsync()).then(state => {
      if (state && state.home) {
        dispatch(getKindDataAsync(gameId || state.home.kindId, state.home.time))
      }
    })
  }, [dispatch, gameId])

  return (<div className={styles.appContent}>
    <TopNav/>
    <div className={styles.homeBody}>
      <TopCarouselContent/>
      <GameMatchContent/>
    </div>
    <FriendlyLink/>
    <DownBar/>
    <FixedRightContainer>
      <DownloadQcr/>
    </FixedRightContainer>
  </div>)
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(Home)
