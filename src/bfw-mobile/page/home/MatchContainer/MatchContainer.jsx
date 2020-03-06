import React, { useEffect } from 'react'
import InPlay from '../InPlay'
import { fixedTopContentClass } from '../../../components/MatchTitle/MatchTitle'
import { connect } from 'react-redux'
import { PropTypes } from '../../../../tool/util'
import styles from './index.module.scss'
import NotStartedOrOver from '../NotStartedOrOver/NotStartedOrOver.jsx'

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

function MatchContainer ({
  endMatchList = [],
  notStartMatchList = [],
  startMatchList = [],
  showType = 0
}) {
  const withOut = startMatchList.length + notStartMatchList.length + endMatchList.length
  useEffect(function () {
    if (withOut) {
      window.addEventListener('scroll', onScroll)
    }
    return function () {
      nodeList = [] // dom集合清空
      window.removeEventListener('scroll', onScroll)
    }
  }, [withOut, endMatchList, notStartMatchList, startMatchList])

  if (showType === 1) {
    return startMatchList.length ? <InPlay data={startMatchList} /> : <div className={styles.withOut}>暂无数据</div>
  } else if (showType === 2) {
    return endMatchList.length ? <NotStartedOrOver data={endMatchList} isOver /> : <div
      className={styles.withOut}>暂无数据</div>
  } else {
    return notStartMatchList.length ? <NotStartedOrOver data={notStartMatchList} /> : <div
      className={styles.withOut}>暂无数据</div>
  }
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
    startMatchList: home.startMatchList[`${kindId}-${time}`],
    showType: home.showType[`${kindId}-${time}`]
  }
}

export default connect(mapStateToProps, null)(MatchContainer)
