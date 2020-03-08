import React, { useEffect } from 'react'
import styles from './index.module.scss'
import HeadBar from '../../components/HeadBar/HeadBar.jsx'
import logo from '../../assets/logo.png'
import NoticeBar from '../../components/NoticeBar/NoticeBar'
import CarouselPic from './CarouselPic/CarouselPic'
import TabsContainer from './TabsContainer/TabsContainer'
import MatchContainer from './MatchContainer/MatchContainer'
import TryCatch from '../../components/TryCatch/TryCatch.jsx'
import { Image } from '../../components/BasicsHtml/BasicsHtml.jsx'
import UseStore from './UseStore.js'

function Home () {
  useEffect(function () {
    UseStore.getHomeMenu().then(function () {
      UseStore.getScheduleList()
    })
  }, [])
  return (
    <div>
      <div className={styles.fixedTop1}>
        <div>
          <HeadBar title={<Image src={logo} height='16' />} hideBack />
          <NoticeBar />
        </div>
      </div>
      <CarouselPic />
      <TabsContainer />
      <TryCatch>
        <MatchContainer />
      </TryCatch>
    </div>
  )
}

export default Home
