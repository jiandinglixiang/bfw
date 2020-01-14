import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { Carousel } from 'antd-mobile'

function CarouselPic (props) {
  const { carouseMap } = props
  const [autoplay, setAuto] = useState(false)
  try {
    return <div className={styles.content}>
      <Carousel
        autoplay={autoplay}
        infinite
      >
        {
          carouseMap.map((value, index) => {
            return <a
              key={index}
              href={value.url}
              target='_blank'
              className={styles.carousel}
              rel='noopener noreferrer'>
              <img
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
  } catch (e) {
    return <div className={styles.content} />
  }
}

CarouselPic.propTypes = {
  carouseMap: PropTypes.array,
}

export default CarouselPic
