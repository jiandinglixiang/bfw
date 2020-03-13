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
      team1_more_attr: { other_more_attr: {} },
      team2_more_attr: { other_more_attr: {} }
    },
    matchResult: {
      economic_curve_list: []
    },
    endMatch: {
      poor_economy: {
        economic_curve: []
      },
      team1: {
        game_type_id: 0,
        other_more_attr: {},
      },
      team2: {
        game_type_id: 0,
        other_more_attr: {},
      }
    }
  })
  let curveList = []
  let colorArr = ['#E12727', '#3393FF']
  const team1 = {
    name: '',
    isBlue: true,
    lead: true
  }
  const team2 = {
    name: '',
    isRed: false,
    lead: false
  }
  if (propsVE.isBoth) {
    curveList = propsVE.endMatch.poor_economy.economic_curve
    team1.name = propsVE.endMatch.team1.team_name
    team2.name = propsVE.endMatch.team2.team_name
    team1.lead = propsVE.endMatch.team1.other_more_attr.gold_lead > 0
    team2.lead = propsVE.endMatch.team2.other_more_attr.gold_lead > 0
    if ([propsVE.endMatch.team1.game_type_id, propsVE.endMatch.team2.game_type_id].includes(5)) {
      team1.isBlue = propsVE.endMatch.team1.other_more_attr.camp === 'dire'
      team2.isRed = propsVE.endMatch.team2.other_more_attr.camp === 'radiant'
      colorArr = ['#3393FF', '#E12727']
    } else if ([propsVE.endMatch.team1.game_type_id, propsVE.endMatch.team2.game_type_id].includes(1)) {
      team1.isBlue = propsVE.endMatch.team1.other_more_attr.camp === 'blue'
      team2.isRed = propsVE.endMatch.team2.other_more_attr.camp === 'red'
    }
  } else {
    curveList = propsVE.matchResult.economic_curve_list
    team1.name = propsVE.matchList.host_team_name
    team2.name = propsVE.matchList.guest_team_name
    team1.lead = propsVE.matchList.team1_more_attr.other_more_attr.gold_lead > 0
    team2.lead = propsVE.matchList.team2_more_attr.other_more_attr.gold_lead > 0
    if ([propsVE.matchList.game_type_id, propsVE.matchList.game_type_id].includes(5)) {
      team1.isBlue = propsVE.matchList.team1_more_attr.other_more_attr.camp === 'dire'
      team2.isRed = propsVE.matchList.team2_more_attr.other_more_attr.camp === 'radiant'
      colorArr = ['#3393FF', '#E12727']
    } else if ([propsVE.matchList.game_type_id, propsVE.matchList.game_type_id].includes(1)) {
      team1.isBlue = propsVE.matchList.team1_more_attr.other_more_attr.camp === 'blue'
      team2.isRed = propsVE.matchList.team2_more_attr.other_more_attr.camp === 'red'
    }
  }

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let maxGold = 1
    let maxTime = 25
    const data = curveList.map(value => {
      const valueVE = diffCatch(value)({
        time: 0,
        gold: 0
      })
      const gold = valueVE.gold / 1000
      const time = valueVE.time / 60
      if (Math.abs(gold) > maxGold) {
        maxGold = Math.abs(gold)
      }
      if (time > maxTime) {
        maxTime = time
      }
      return [parseInt(time), gold]
    })
    maxGold = maxGold === 1 ? 1 : parseInt(maxGold / 2 + 1) * 2
    maxTime = maxTime <= 25 ? 25 : (maxTime + 5) >= 65 ? 65 : parseInt(maxTime / 5 + 1) * 5
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
        interval: parseInt(maxTime / 5),
        min: 0,
        max: maxTime,
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
          interval: maxGold / 2,
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
          interval: maxGold / 2,
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
          // itemStyle: {
          //   color: '#E12727'
          // },
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
          seriesIndex: 0,
          pieces: [
            {
              value: 0,
              color: colorArr[0]
            },
            {
              lt: 0,
              color: colorArr[0]
            },
            {
              gt: 0,
              color: colorArr[1]
            },
          ],
        },
      ],
      outOfRange: {
        color: colorArr[1]
      }
    }
    const myChart = echarts.init(ref.current)
    myChart.setOption(chartOption)
  }, [ref, curveList, colorArr])
  return <div>
    <div className={styles.lineChartSwitch}>
      <div>
        {
          team1.lead ? (
            [
              <div key={1} className={team1.isBlue ? styles.teamBlue : styles.teamRed}><p>{team1.name || '-'}</p></div>,
              <div key={2} className={team2.isRed ? styles.teamRed : styles.teamBlue}><p>{team2.name || '-'}</p></div>
            ]
          ) : (
            [
              <div key={2} className={team2.isRed ? styles.teamRed : styles.teamBlue}><p>{team2.name || '-'}</p></div>,
              <div key={1} className={team1.isBlue ? styles.teamBlue : styles.teamRed}><p>{team1.name || '-'}</p></div>,
            ])
        }
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className={styles.activeClick}>经济差</button>
      </div>
    </div>
    <div ref={ref} className={styles.container} />
  </div>
}

export default LineChart

LineChart.propTypes = {}
