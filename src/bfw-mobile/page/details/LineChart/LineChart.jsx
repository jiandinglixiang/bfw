import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import echarts from 'echarts'
import { diffCatch, toBigNumber } from '../../../../tool/util.js'

function LineChart (props) {
  const ref = useRef()
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
  let curveList = []
  if (propsVE.isBoth) {
    curveList = propsVE.endMatch.poor_economy.economic_curve
  } else {
    curveList = propsVE.matchResult.economic_curve_list
  }

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let maxGold = 12
    const data = curveList.map(value => {
      const valueVE = diffCatch(value)({
        time: 0,
        gold: 0
      })
      const max = valueVE.gold / 1000
      if (max > maxGold) {
        maxGold = max
      }
      return [parseInt(valueVE.time / 60), max]
    })
    maxGold = parseInt(maxGold / 6) * 6 + 6
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
          try {
            const paramsVE = diffCatch((params || [])[0])({
              data: []
            })
            const [x, y] = paramsVE.data
            const tm1 = parseInt(x)
            const tm2 = parseInt(x * 60 - tm1 * 60)
            const top = toBigNumber(y).toFormat(1)
            return `${tm1}:${tm2} 经济差 ${top}k`
          } catch (e) {
            return '-'
          }
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
          interval: parseInt(maxGold / 3),
          min: -maxGold,
          max: maxGold,
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
          interval: parseInt(maxGold / 3),
          min: -maxGold,
          max: maxGold,
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
          // data: [-12, -6, 0, 6, 12],
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
          dimension: 1,
          pieces: [
            {
              min: -99999,
              max: -2,
              color: '#E12727'
            },
            {
              max: 99999,
              min: -2,
              color: '#3393FF'
            }
          ],
          outOfRange: {
            color: '#3393FF'
          },
        },
      ]
    }
    const myChart = echarts.init(ref.current)
    myChart.setOption(chartOption)
  }, [ref, curveList])
  return <div>
    <div className={styles.lineChartSwitch}>
      <div>
        1
      </div>
      <div>
        <button className={styles.activeClick}>经济差</button>
        {/*     <button
          className={styles.activeClick}
          onClick={() => {
            chartOption.series[0].data = [
              [0, 0],
              [1, 6.232],
            ]
            myChart.setOption(chartOption)
          }}>经验差
        </button> */}
      </div>
    </div>
    <div ref={ref} className={styles.container} />
  </div>
}

export default LineChart

LineChart.propTypes = {}
