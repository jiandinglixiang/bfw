import React from 'react'
import { Carousel } from 'antd'
import styles from './index.module.scss'

function onChange (a, b, c) {
  console.log(a, b, c)
}

function Carouse ({ bannerList, updateIndex }) {
  const map = <Carousel beforeChange={(from, to) => updateIndex(to)} autoplay dots={false}>
    {bannerList.map((val, x) => {
      val.img = 'http://placekitten.com/300/20' + x
      return <div className={styles.carouselItem} key={x}>
        <img alt='' src={val.img}/>
      </div>
    })}
  </Carousel>
  return map
}

export default Carouse
