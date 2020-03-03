import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import echarts from 'echarts'
import { diffCatch, toBigNumber } from '../../../../tool/util.js'

function LineChart (props) {
  const ref = useRef()
  const [myChart, update] = useState({})
  const propsVE = diffCatch(props)({
    isBoth: false,
    matchList: {
      game_type_id: 0,
      team1_more_attr: {},
      team2_more_attr: {}
    },
    matchResult: {
      economic_curve_list: []
    },
    endMatch: {
      poor_economy: {
        economic_curve: []
      },
      team1: {},
      team2: {}
    }
  })
  const team1 = {
    name: '',
    camp: true
  }
  const team2 = {
    name: '',
    camp: false
  }
  let curveList = propsVE.matchResult.economic_curve_list
  if (propsVE.isBoth) {
    curveList = propsVE.endMatch.poor_economy.economic_curve
    team1.name = propsVE.endMatch.team1.team_name
    team2.name = propsVE.endMatch.team2.team_name
    if (propsVE.endMatch.team1.game_type_id === 5) {
      // dota
      team1.camp = propsVE.endMatch.team1.camp === 'dire'
      team2.camp = propsVE.endMatch.team2.camp === 'dire'
    }
    if (propsVE.endMatch.team1.game_type_id === 1) {
      // lol
      team1.camp = propsVE.endMatch.team1.camp === 'blue'
      team2.camp = propsVE.endMatch.team2.camp === 'blue'
    }
  } else {
    curveList = propsVE.matchResult.economic_curve_list
    team1.name = propsVE.matchList.host_team_name
    team2.name = propsVE.matchList.guest_team_name
    if (propsVE.matchList.game_type_id === 5) {
      // dota
      team1.camp = propsVE.matchList.team1_more_attr.camp === 'dire'
      team2.camp = propsVE.matchList.team2_more_attr.camp === 'dire'
    }
    if (propsVE.matchList.game_type_id === 1) {
      // lol
      team1.camp = propsVE.matchList.team1_more_attr.camp === 'blue'
      team2.camp = propsVE.matchList.team2_more_attr.camp === 'blue'
    }
  }
  const data = curveList.map(value => {
    const valueVE = diffCatch(value)({
      time: 0,
      gold: 0
    })
    return [valueVE.time / 60, valueVE.gold / 1000]
  })
  // 绘制图表[x,y]
  const chartOption = {
    backgroundColor: '#06051A',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      padding: [0, 8],
      textStyle: {
        fontSize: 12,
        lineHeight: 15
      },
      backgroundColor: 'transparent',
      position (pos, params, el, elRect, size) {
        const obj = { top: '8%' }
        if (pos[0] < size.viewSize[0] / 2) {
          el.setAttribute('class', 'baidu-tooltip321')
          obj.left = pos[0]
        } else {
          el.setAttribute('class', 'baidu-tooltip123')
          obj.right = size.viewSize[0] - pos[0]
        }
        return obj
      },
      formatter (params) {
        const [x, y] = params.data
        const tm1 = parseInt(x)
        const tm2 = x * 60
        const top = toBigNumber(y).toFormat(1)
        return `${tm1}:${tm2 - tm1} ${team1.name}经济领先 ${top}`
      }
    },
    grid: {
      top: '10%',
      left: '6%',
      right: '8%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitNumber: 6,
      interval: 13,
      min: 0,
      max: 65,
      boundaryGap: false,
      axisLabel: {
        // 刻度线
        formatter (value, index) {
          return `${value}:00`
        },
        fontWeight: 'bold',
        color: '#85838F',
      },
      axisLine: {
        // 刻度线
        show: false
      },
      axisTick: {
        // 刻度
        show: false
      },
      splitLine: {
        // 表内 线条
        show: true,
        lineStyle: {
          color: '#4F5975',
          type: 'dotted'
        }
      },
      axisPointer: {
        lineStyle: {
          color: '#4F5975'
        }
      },
    },
    yAxis: [
      {
        type: 'value',
        splitNumber: 5,
        interval: 6,
        min: -12,
        max: 12,
        axisLabel: {
          margin: 20,
          formatter: '{value} K',
          fontWeight: 'bold',
          color: '#85838F'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          length: 10,
          lineStyle: {
            color: '#4F5975',
            type: 'dotted'
          }
        },
        splitLine: {
          // 表内虚线
          show: true,
          lineStyle: {
            color: '#4F5975',
            type: 'dotted'
          }
        },
      },
      {
        // 右边标线
        type: 'value',
        position: 'right',
        splitNumber: 5,
        interval: 6,
        min: -12,
        max: 12,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          length: 15,
          lineStyle: {
            color: '#4F5975',
            type: 'dotted'
          }
        },
        splitLine: { show: false },
        data: [-12, -6, 0, 6, 12],
      }
    ],
    series: [
      {
        type: 'line',
        data: data,
        symbol: 'none',
        areaStyle: {
          color: 'rgba(36,43,73,0.3)',
          origin: 'start'
        },
        itemStyle: {
          color: '#E12727'
        },
        lineStyle: {
          width: 3
        }
      }
    ],
    visualMap: [
      {
        show: false,
        type: 'piecewise',
        pieces: [
          {
            gte: 0,
            lt: 99999,
            color: '#3393FF'
          },
          {
            lt: 0,
            gt: -99999,
            color: '#E12727'
          }
        ],
        outOfRange: {
          color: '#3393FF'
        },
      },
    ]
  }
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(ref.current)
    myChart.setOption(chartOption)
    update(myChart)
  }, [ref, curveList])
  return <div>
    <div className={styles.lineChartSwitch}>
      <div>
        <button className={styles.activeClick}>经济差</button>
        <button
          className={styles.activeClick}
          onClick={() => {
            chartOption.series[0].data = [
              [0, 0],
              [1, 6.232],
            ]
            myChart.setOption(chartOption)
          }}>经验差
        </button>
      </div>
    </div>
    <div ref={ref} className={styles.container} />
  </div>
}

export default LineChart

LineChart.propTypes = {}
