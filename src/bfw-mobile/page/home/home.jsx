import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import HeadBar from '../../components/HeadBar/HeadBar.jsx'
import logo from '../../assets/logo.png'
import NoticeBar from '../../components/NoticeBar/NoticeBar'
import CarouselPic from './CarouselPic/CarouselPic'
import { getGameKindAsync, getKindDataAsync } from './store'
import TabsContainer from './TabsContainer/TabsContainer'
import MatchContainer from './MatchContainer/MatchContainer'
import { PropTypes } from '../../../tool/util'
import TryCatch from '../../components/TryCatch/TryCatch.jsx'
import { Image } from '../../components/BasicsHtml/BasicsHtml.jsx'

export const fixedTopClass = styles.fixedTop2

function Home (props) {
  const { notice, bannerList, dispatch, } = props
  useEffect(function () {
    dispatch(getGameKindAsync()).then(state => {
      if (state && state.home) {
        dispatch(getKindDataAsync(state.home.kindId || 0, state.home.time))
      }
    })
  }, [dispatch])
  return <div>
    <div className={styles.fixedTop1}>
      <div>
        <HeadBar title={<Image src={logo} height='16' />} hideBack />
        <NoticeBar txt={notice} />
      </div>
    </div>
    <CarouselPic carouseMap={bannerList} />
    <TabsContainer />
    <TryCatch>
      <MatchContainer />
    </TryCatch>
  </div>
}

Home.propTypes = {
  notice: PropTypes.string,
  bannerList: PropTypes.array,
  dispatch: PropTypes.func,
}

function mapStateToProps (state) {
  return {
    notice: state.home.notice,
    bannerList: state.home.bannerList,
  }
}

export default connect(mapStateToProps,
  function (dispatch) {
    return { dispatch }
  },
)(Home)
