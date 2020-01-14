import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import { Carousel } from 'antd'
import { connect } from 'react-redux'
import notice from '../../../../assets/notice.png'

function TopCarouselContent (props) {
  const [active, setActive] = useState(0)
  const refCarousel = useRef(null)
  const bannerList = props.bannerList || []

  return <div className={styles.topCarousel}>
    <div className={styles.noticeMsg}>
      <img src={notice} alt=''/>
      <div>
        <p>{props.notice || '加载中...'}</p>
        <p>{props.notice || '加载中...'}</p>
      </div>
    </div>
    <div className={styles.carouselC}>
      <div className={styles.carouselContent}>
        <Carousel
          ref={refCarousel}
          autoplay
          dots={false}
          beforeChange={(from, to) => setActive(to)}
        >
          {bannerList.map((val, x) => {
            return <div className={styles.carouselItem} key={x}>
              <a
                href={val.url}
                target='_blank'
                rel='noopener noreferrer'>
                <img alt='' src={val.img}/>
              </a>
            </div>
          })}
        </Carousel>
      </div>
      <div className={styles.carouselList}>
        {
          bannerList.map((val, x) => {
            return <div
              className={`${styles.carouseImg} ${x === active ? styles.tapActive : ''}`}
              key={x}
              onClick={() => {
                refCarousel && refCarousel.current.goTo(x)
                setActive(x)
              }}>
              <img alt='' src={val.img}/>
            </div>
          })
        }
      </div>
    </div>
  </div>
}

function mapStateToProps (state) {
  return {
    notice: state.home.notice,
    bannerList: state.home.bannerList
  }
}

export default connect(mapStateToProps)(TopCarouselContent)
