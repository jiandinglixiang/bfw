import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import HeadBar from '../../components/HeadNav/HeadNav'
import logo from '../../assets/logo.png'
import NoticeBar from '../../components/NoticeBar/NoticeBar'
import CarouselPic from './CarouselPic/CarouselPic'
import { getGameKindAsync, getKindDataAsync } from './store'
import { useParams } from 'react-router-dom'
import TabsContainer from './TabsContainer/TabsContainer'
import MatchContainer from './MatchContainer/MatchContainer'
import { PropTypes } from '../../../tool/util'

function Home (props) {
  const {
    width,
    height,
    notice,
    bannerList,
    dispatch,
  } = props
  const { gameId } = useParams()
  useEffect(function () {
    dispatch(getGameKindAsync()).then(state => {
      if (state && state.home) {
        dispatch(getKindDataAsync(gameId || state.home.kindId || 0,
          state.home.time))
      }
    })
  }, [gameId, dispatch])
  return <div
    style={{
      width: `${width}px`,
      minHeight: `${height}px`,
    }}
    className={styles.content}>
    <div className={styles.fixedTop}>
      <div>
        <HeadBar
          title={<img src={logo} height='16' alt='logo' />}
          hideBack
        />
        <NoticeBar txt={notice} />
        <CarouselPic carouseMap={bannerList} />
        <TabsContainer />
      </div>
    </div>
    <MatchContainer />
  </div>
}

Home.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  notice: PropTypes.string,
  bannerList: PropTypes.array,
  dispatch: PropTypes.func,
}

function mapStateToProps (state) {
  return {
    width: state.device.width,
    height: state.device.height,
    notice: state.home.notice,
    bannerList: state.home.bannerList,
  }
}

export default connect(mapStateToProps,
  function (dispatch) {
    return { dispatch }
  },
)(Home)
