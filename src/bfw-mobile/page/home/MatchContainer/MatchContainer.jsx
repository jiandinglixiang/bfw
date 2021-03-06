import React, { useEffect } from 'react'
import InPlay from '../InPlay'
import RaceOff from '../RaceOff'
import GameOver from '../GameOver'
import { fixedTopClass } from '../../../components/MatchTitle/MatchTitle'
import fixedTop from '../index.module.scss'
import { connect } from 'react-redux'
import { PropTypes } from '../../../../tool/util'
import styles from './index.module.scss'

let time = null
let nodeList = [] // dom集合
let topDistance = 0

function scrollFun () {
  // console.log(time, nodeList)
  if (!nodeList.length) {
    nodeList = document.querySelectorAll(`.${fixedTopClass}`)
  }
  if (!topDistance) {
    topDistance = document.querySelector(`.${fixedTop.fixedTop}`).clientHeight + 134
  }
  const scrollTop = (document.documentElement.scrollTop ||
    document.body.scrollTop) + topDistance
  let fixed = true
  for (let i = nodeList.length - 1; i >= 0; i--) {
    // console.log(scrollTop, nodeList[i].offsetTop)
    if (fixed && scrollTop > nodeList[i].offsetTop) {
      fixed = false
      nodeList[i].children[0].style = `position: fixed;z-index: 2;top: ${topDistance}px;`
    } else {
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

function MatchContainer ({
  endMatchList = [],
  notStartMatchList = [],
  startMatchList = []
}) {
  const withOut = startMatchList.length + notStartMatchList.length + endMatchList.length
  useEffect(function () {
    if (withOut) {
      window.addEventListener('scroll', onScroll)
    }
    return function () {
      nodeList = [] // dom集合清空
      topDistance = 0
      window.removeEventListener('scroll', onScroll)
    }
  }, [withOut, endMatchList, notStartMatchList, startMatchList])
  if (!withOut) {
    return <div className={styles.withOut}>暂无数据</div>
  }
  return <div>
    <InPlay data={startMatchList} />
    <RaceOff data={notStartMatchList} />
    <GameOver data={endMatchList} />
  </div>
}

MatchContainer.propTypes = {
  endMatchList: PropTypes.array,
  notStartMatchList: PropTypes.array,
  startMatchList: PropTypes.array
}

function mapStateToProps (state) {
  const home = state.home
  const kindId = home.kindId
  const time = home.time
  return {
    endMatchList: home.endMatchList[`${kindId}-${time}`],
    notStartMatchList: home.notStartMatchList[`${kindId}-${time}`],
    startMatchList: home.startMatchList[`${kindId}-${time}`]
  }
}

export default connect(mapStateToProps, null)(MatchContainer)
