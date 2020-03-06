import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import menuDown from '../../../assets/menu_down.png'
import { dayName } from '../../../../tool/util'
import { connect } from 'react-redux'
import CarouselPic from '../CarouselPic/CarouselPic'
import { DatePicker } from 'antd-mobile'
import PickerCustom from '../PickerCustom/PickerCustom'
import { store } from '../../../redux'
import { getKindDataAsync, setShowType } from '../store'
import moment from 'moment'
import CountDown from '../CountDown/CountDown'
import { Divs, Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function onTabClick (kindId) {
  // 切换游戏
  return store.dispatch(getKindDataAsync(kindId * 1, dayName[1]))
}

function onTimeClick (kindId, time) {
  // 切换今天明天后天
  store.dispatch(getKindDataAsync(kindId, time, true))
}

function onShowTypeClick (showType) {
  // 切换赛程赛果
  store.dispatch(setShowType({ showType }))
}

function onSelect (setPickerTime, kindId, time) {
  // 切换时间
  const data = moment(time)
  store.dispatch(getKindDataAsync(kindId, data.format('YYYY-MM-DD')))
  setPickerTime(data.toDate())
}

let timeOut
function TabsContainer (props) {
  const {
    width,
    gameKind,
    kindId,
    time,
    showType
  } = props
  const [gameIndex, updateGameIndex] = useState(0)
  const [menuState, setMenuState] = useState(0)
  const [pickerTime, setPickerTime] = useState(new Date(Date.now()))
  useEffect(function () {
    const all = (width - 30) / 68
    if (gameKind.length > all) {
      setMenuState(1)
    }
  }, [width, gameKind])
  const ref = useRef(null)
  useEffect(() => {
    function onScroll () {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        if (ref) {
          const scrollTop = (document.documentElement.scrollTop || document.body.scrollTop)
          if (scrollTop > 154) {
            ref.current.style = 'position: fixed;z-index: 2;top:74px;'
          } else if (ref.current.style) {
            ref.current.style = ''
          }
        }
      }, 150)
    }

    if (ref) {
      window.addEventListener('scroll', onScroll)
    }
    return function () {
      clearTimeout(timeOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={styles.content}>
      <div ref={ref} className={styles.fixedTop2}>
        <Divs className={[styles.navBar, menuState === 2 && styles.showAll]}>
          <div className={styles.menuContent}>
            {
              gameKind.map((value, x) => {
                return (
                  <Divs
                    key={x}
                    className={[styles.dayName, x === gameIndex && styles.activeButton]}
                    onClick={() => {
                      if (menuState === 2) setMenuState(1)
                      onTabClick(value.id)
                      updateGameIndex(x)
                    }}>
                    {value.game_name}
                  </Divs>)
              })
            }
          </div>
          <Image
            hide={!menuState}
            onClick={() => setMenuState(s => s === 1 ? 2 : 1)}
            className={[styles.showMenu, menuState !== 1 && styles.rotateIcon]}
            src={menuDown}
          />
        </Divs>
        <div className={styles.dayOpt}>
          <div className={styles.dayList}>
            <Divs
              onClick={() => onShowTypeClick(0)}
              className={[styles.noStart, showType === 0 && styles.activeButton]}>
              <p>
                <span>赛程</span>
              </p>
            </Divs>
            <Divs
              onClick={() => onShowTypeClick(1)}
              className={[styles.starting, showType === 1 && styles.activeButton]}>
              <p>
                <span>进行中</span>
              </p>
            </Divs>
            <Divs
              onClick={() => onShowTypeClick(2)}
              className={[styles.endOver, showType === 2 && styles.activeButton]}>
              <p><span>赛果</span></p>
            </Divs>
            {time === dayName[1] && <CountDown cbk={() => onTimeClick(kindId, time)} />}
          </div>
          <div className={styles.showMenu}>
            <DatePicker
              mode='date'
              title='选者日期'
              value={pickerTime}
              onChange={(value) => onSelect(setPickerTime, kindId, value)}
            >
              <PickerCustom />
            </DatePicker>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  const kindId = state.home.kindId
  const time = state.home.time
  return {
    width: state.device.width,
    gameKind: state.home.gameKind,
    kindId: kindId,
    time: time,
    showType: state.home.showType[`${kindId}-${time}`],
  }
}

CarouselPic.propTypes = {
  width: PropTypes.number,
  gameKind: PropTypes.array,
  kindId: PropTypes.any,
  time: PropTypes.string,
  totalNumber: PropTypes.object,
}

export default connect(mapStateToProps)(TabsContainer)

TabsContainer.propTypes = {
  gameKind: PropTypes.any,
  kindId: PropTypes.any,
  showType: PropTypes.any,
  time: PropTypes.any,
  width: PropTypes.any
}
