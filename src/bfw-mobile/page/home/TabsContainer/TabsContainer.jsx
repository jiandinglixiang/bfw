import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import menuDown from '../../../assets/menu_down.png'
import { dayName, toBigNumber } from '../../../../tool/util'
import { connect } from 'react-redux'
import CarouselPic from '../CarouselPic/CarouselPic'
import { DatePicker } from 'antd-mobile'
import PickerCustom from '../PickerCustom/PickerCustom'
import { store } from '../../../redux'
import { getKindDataAsync } from '../store'
import moment from 'moment'
import CountDown from '../CountDown/CountDown'

function onTabClick (kindId) {
  // 切换游戏
  store.dispatch(getKindDataAsync(kindId * 1, dayName[1]))
}

function onTimeClick (kindId, time) {
  // 切换今天明天后天
  store.dispatch(getKindDataAsync(kindId, time))
}

function onSelect (setPickerTime, kindId, time) {
  // 切换时间
  const data = moment(time)
  store.dispatch(getKindDataAsync(kindId, data.format('YYYY-MM-DD')))
  setPickerTime(data.toDate())
}

function TabsContainer (props) {
  const {
    width,
    gameKind,
    kindId,
    time,
    totalNumber,
  } = props
  const [menuState, setMenuState] = useState(0)
  const [pickerTime, setPickerTime] = useState(new Date(Date.now()))
  useEffect(function () {
    const all = (width - 30) / 68
    if (gameKind.length > all) {
      setMenuState(1)
    }
  }, [width, gameKind])
  try {
    return <div className={styles.content}>
      <div className={`${styles.navBar}  ${menuState === 2
        ? styles.showAll
        : ''}`}>
        <div className={styles.menuContent}>
          {
            gameKind.map((value, x) => {
              const className = `${styles.dayName} ${toBigNumber(value.id)
                .isEqualTo(kindId) ? styles.activeButton : ''}`
              return <div
                key={x}
                onClick={() => {
                  if (menuState === 2) setMenuState(1)
                  onTabClick(value.id)
                }}
                className={className}>{value.game_name}</div>
            })
          }
        </div>
        {menuState ? <img
          onClick={() => setMenuState(s => s === 1 ? 2 : 1)}
          className={`${styles.showMenu} ${menuState === 1
            ? ''
            : styles.rotateIcon}`} src={menuDown}
          alt='' /> : null}
      </div>
      <div className={styles.dayOpt}>
        <div className={styles.dayList}>
          {dayName.map((value, x) => {
            const className = `${styles.dayName} ${value === time
              ? styles.activeButton
              : ''}`
            const total = totalNumber[`${kindId}-${value}`]
            return <p
              key={x}
              onClick={() => onTimeClick(kindId, value)}
              className={className}>
              {x ? x === 1 ? '今天' : '明天' : '昨天'}
              {total ? `(${total})` : null}
            </p>
          })}
          {time === dayName[1] ? <CountDown
            cbk={() => onTimeClick(kindId, time)} /> : null}
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
  } catch (e) {
    return <div className={styles.content} />
  }
}

function mapStateToProps (state) {
  return {
    width: state.device.width,
    gameKind: state.home.gameKind,
    kindId: state.home.kindId,
    time: state.home.time,
    totalNumber: state.home.totalNumber,
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
