import React, { useEffect, useState } from 'react'
import { Calendar, Tabs } from 'antd'
import styles from './index.module.scss'
import MatchTimeTitle from '../MatchTimeTitle'
import InPlay from '../InPlay'
import RaceOff from '../RaceOff'
import GameOver from '../GameOver'
import timeImg from '../../../../assets/date.png'
import { connect } from 'react-redux'
import { dayName } from '../../../../../tool/util'
import store from '../../../../store'
import { getKindDataAsync, updateKindIdOrTime } from '../../store'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const { TabPane } = Tabs

function momentDiff (a, b) {
  if (a.game_start_time === b.game_start_time) {
    return 0
  }
  return moment(a.game_start_time).isAfter(b.game_start_time) ? -1 : 1
}

function onTabClick (id, time) {
  store.dispatch(getKindDataAsync(id * 1, time))
}

function onTimeClick (time, kindId) {
  store.dispatch(getKindDataAsync(kindId, time))
}

function onSelect (updateCal, kindId, value) {
  store.dispatch(getKindDataAsync(kindId, value.format('YYYY-MM-DD')))
  updateCal(cal => !cal)
}

function GameMatchContent (props) {
  const {
    kindId,
    gameKind,
    time,
    endMatchList,
    notStartMatchList,
    startMatchList,
    totalNumber,
    dispatch
  } = props
  const { search } = useLocation()
  const paramsString = search.substring(1)
  useEffect(function () {
    const searchParams = new URLSearchParams(paramsString)
    const defaultActiveKey = searchParams.get('gameId')
    if (!defaultActiveKey) return
    dispatch(updateKindIdOrTime({
      kindId: defaultActiveKey
    }))
  }, [dispatch, paramsString])
  const [cal, updateCal] = useState(false)
  const [timeOut, setTiOut] = useState(10)
  useEffect(function () {
    let t = null

    function updateTime () {
      clearTimeout(t)
      setTiOut(ti => {
        if (!ti) {
          onTabClick(kindId, time)
          return 10
        }
        return ti - 1
      })
      t = setTimeout(updateTime, 1000)
    }

    if (time !== dayName[1]) return
    t = setTimeout(updateTime, 1000)
    return function () {
      clearTimeout(t)
    }
  }, [kindId, time])

  const tabBar = <div className={styles.timeAndSelected}>
    {
      dayName.map((value, x) => {
        return <p
          className={`${styles.todayTime} ${value === time ? styles.tabActive : ''}`}
          key={value}
          onClick={() => onTimeClick(value, kindId)}>
          {x ? x === 1 ? '今天' : '明天' : '昨天'}
          {totalNumber[`${kindId}-${value}`] ? `(${totalNumber[`${kindId}-${value}`]})` : ''}
        </p>
      })
    }
    {time !== dayName[1] ? null : <p className={styles.timeUpdate}>刷新倒计时<span>{timeOut}</span>s</p>}
    <div className={styles.calendarIcon}>
      <img src={timeImg} alt='' onClick={() => updateCal(!cal)}/>
      <div className={`${styles.topCalendar} ${cal ? '' : styles.noAnyOne}`}>
        <Calendar
          defaultValue={moment()}
          fullscreen={false}
          onSelect={onSelect.bind(this, updateCal, kindId)}
        />
      </div>
    </div>
  </div>
  return (<div className={styles.tabBarStyle}>
    <Tabs
      activeKey={`${kindId}`}
      defaultActiveKey={`${kindId}`}
      tabBarExtraContent={tabBar}
      onTabClick={(id) => onTabClick(id, time)}
      type='card'>
      {
        gameKind.map((value) => {
          const start = startMatchList[`${value.id}-${time}`] || []
          const notStart = notStartMatchList[`${value.id}-${time}`] || []
          const end = endMatchList[`${value.id}-${time}`] || []
          end.sort(momentDiff)
          return <TabPane tab={value.game_name} key={value.id}>
            {start.length ? <MatchTimeTitle>正在进行的比赛</MatchTimeTitle> : null}
            <div className={styles.rowOneByOne}>
              {start.map((value1, index1) => <InPlay startMatchList={value1} key={index1}/>)}
            </div>
            {notStart.length ? <MatchTimeTitle>未开始的比赛</MatchTimeTitle> : null}
            <div className={styles.rowOneByOne}>
              {notStart.map((value1, index1) => <RaceOff notStartMatchList={value1} key={index1}/>)}
            </div>
            {end.length ? <MatchTimeTitle>已结束的比赛</MatchTimeTitle> : null}
            <div className={styles.rowOneByOne}>
              {end.map((value1, index1) => <GameOver endMatchList={value1} key={index1}/>)}
            </div>
          </TabPane>
        })
      }
    </Tabs>
  </div>)
}

function mapStateToProps (state) {
  return {
    kindId: state.home.kindId,
    gameKind: state.home.gameKind || [],
    time: state.home.time,
    endMatchList: state.home.endMatchList,
    notStartMatchList: state.home.notStartMatchList,
    startMatchList: state.home.startMatchList,
    totalNumber: state.home.totalNumber
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMatchContent)
