import React, { useEffect, useMemo } from 'react'
import InPlay from '../InPlay'
import { fixedTopContentClass } from '../../../components/MatchTitle/MatchTitle'
import styles from './index.module.scss'
import NotStartedOrOver from '../NotStartedOrOver/NotStartedOrOver.jsx'
import { useStoreHome } from '../UseStore.js'

let time = null
let nodeList = [] // dom集合

function scrollFun () {
  if (!nodeList.length) {
    nodeList = document.querySelectorAll(`.${fixedTopContentClass}`)
  }
  const scrollTop = (document.documentElement.scrollTop || document.body.scrollTop) + 134
  let fixed = true
  for (let i = nodeList.length - 1; i >= 0; i--) {
    // console.log(scrollTop, nodeList[i].offsetTop)
    if (fixed && scrollTop > nodeList[i].offsetTop) {
      fixed = false
      nodeList[i].children[0].style = 'position: fixed;z-index: 2;top: 134px;'
    } else if (nodeList[i].children[0].style) {
      nodeList[i].children[0].style = ''
    }
  }
}

function onScroll () {
  // scrollTop就是触发滚轮事件时滚轮的高度
  clearTimeout(time)
  time = setTimeout(scrollFun, 150)
  // console.log(2)
}

function MatchContainer () {
  const [state] = useStoreHome()
  const stateVE = useMemo(function () {
    return [
      state.not_start_match_list[state.gameId + state.time],
      state.start_match_list[state.gameId + state.time],
      state.end_match_list[state.gameId + state.time]
    ]
  }, [state])
  useEffect(function () {
    window.addEventListener('scroll', onScroll)
    return function () {
      nodeList = [] // dom集合清空
      window.removeEventListener('scroll', onScroll)
    }
  }, [stateVE])
  if (!stateVE[state.gameStatus] || (stateVE[state.gameStatus] && !stateVE[state.gameStatus].length)) {
    return <div className={styles.withOut}>暂无数据</div>
  }
  if (state.gameStatus === 1) {
    return <InPlay data={stateVE[1]} />
  }
  return <NotStartedOrOver data={stateVE[state.gameStatus]} isOver={state.gameStatus === 2} />
}

export default MatchContainer
