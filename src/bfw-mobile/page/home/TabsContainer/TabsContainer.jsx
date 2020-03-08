import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import menuDown from '../../../assets/menu_down.png'
import { DatePicker } from 'antd-mobile'
import PickerCustom from '../PickerCustom/PickerCustom'
import moment from 'moment'
import CountDown from '../CountDown/CountDown'
import { Divs, Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'
import UseStore, { useStoreHome, useStoreMenu } from '../UseStore.js'

let timeOut
const dayTime = moment(Date.now()).format('YYYY-MM-DD')

function TabsContainer () {
  const ref = useRef()
  const [state] = useStoreMenu()
  const [homeState, homeDispatch] = useStoreHome()
  const [menuState, setMenuState] = useState(0)
  // const [pickerTime, setPickerTime] = useState(new Date(Date.now()))
  useEffect(() => {
    const el = window.document.documentElement || window.document.body
    const width = el.offsetWidth > 750 ? 750 : el.offsetWidth < 320 ? 320 : el.offsetWidth
    const all = (width - 30) / 68
    if (state.game_list.length > all) {
      setMenuState(1)
    }
  }, [state.game_list.length])
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

  function statusTap (x) {
    // 切换赛程赛果
    homeDispatch({
      type: 'GAME_STATUS_UPDATE',
      gameStatus: x
    })
  }

  return (
    <div className={styles.content}>
      <div ref={ref} className={styles.fixedTop2}>
        <Divs className={[styles.navBar, menuState === 2 && styles.showAll]}>
          <div className={styles.menuContent}>
            {
              state.game_list.map((value) => {
                return (
                  <Divs
                    key={value.id}
                    className={[styles.dayName, value.id === homeState.gameId && styles.activeButton]}
                    onClick={() => {
                      if (menuState === 2) setMenuState(1)
                      if (value.id === homeState.gameId) return
                      UseStore.getScheduleList(value.id, homeState.time)
                    }}>
                    {value.game_name}
                  </Divs>
                )
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
              onClick={() => statusTap(0)}
              className={[styles.noStart, homeState.gameStatus === 0 && styles.activeButton]}>
              <p><span>赛程</span></p>
            </Divs>
            <Divs
              onClick={() => statusTap(1)}
              className={[styles.starting, homeState.gameStatus === 1 && styles.activeButton]}>
              <p><span>进行中</span></p>
            </Divs>
            <Divs
              onClick={() => statusTap(2)}
              className={[styles.endOver, homeState.gameStatus === 2 && styles.activeButton]}>
              <p><span>赛果</span></p>
            </Divs>
            {homeState.time === dayTime && <CountDown cbk={() => UseStore.getScheduleList()} />}
          </div>
          <div className={styles.showMenu}>
            <DatePicker
              mode='date'
              title='选者日期'
              value={new Date(Date.now())}
              onChange={(value) => {
                const date = moment(value)
                // setPickerTime(date.toDate())
                UseStore.getScheduleList(homeState.gameId, date.format('YYYY-MM-DD'))
              }}
            >
              <PickerCustom />
            </DatePicker>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabsContainer
