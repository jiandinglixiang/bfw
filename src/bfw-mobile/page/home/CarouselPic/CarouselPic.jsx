import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { Carousel } from 'antd-mobile'
import { useStoreMenu } from '../UseStore.js'

function CarouselPic (props) {
  const [state] = useStoreMenu()
  const [autoplay, setAuto] = useState(false)
  return <div className={styles.content}>
    <Carousel
      autoplay={autoplay}
      autoplayInterval={7000}
      infinite
    >
      {
        state.banner_list.map((value, index) => {
          return <a
            key={index}
            href={value.url}
            target='_blank'
            className={styles.carousel}
            rel='noopener noreferrer'>
            <img
              style={{
                height: '41vw',
                maxHeight: '308px'
              }}
              alt=''
              src={value.img}
              onLoad={(event) => {
                // fire window resize event to change height
                // window.dispatchEvent(new Event('resize'))
                setAuto(true)
                event.preventDefault()
              }}
            />
          </a>
        })
      }
    </Carousel>
  </div>
}

CarouselPic.propTypes = {
  carouseMap: PropTypes.array,
}

export default CarouselPic
