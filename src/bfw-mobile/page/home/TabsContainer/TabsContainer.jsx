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
import { getKindDataAsync, setShowType } from '../store'
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

function TabsContainer (props) {
  const {
    width,
    gameKind,
    kindId,
    time,
    showType
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
      <div
        className={`${styles.navBar}  ${menuState === 2
          ? styles.showAll
          : ''}`}>
        <div
          className={styles.menuContent}>
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
          <div
            onClick={() => onShowTypeClick(0)}
            className={`${styles.noStart} ${showType === 0 ? styles.activeButton : ''}`}>
            <p>
              <span>赛程</span>
            </p>
          </div>
          <div
            onClick={() => onShowTypeClick(1)}
            className={`${styles.starting} ${showType === 1 ? styles.activeButton : ''}`}>
            <p>
              <span>进行中</span>
            </p>
          </div>
          <div
            onClick={() => onShowTypeClick(2)}
            className={`${styles.endOver} ${showType === 2 ? styles.activeButton : ''}`}>
            <p><span>赛果</span></p>
          </div>
          {time === dayName[1] ? <CountDown cbk={() => onTimeClick(kindId, time)} /> : null}
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
