import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import echarts from 'echarts'

function LineChart () {
  const ref = useRef()
  useEffect(function () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(ref.current)
    // 绘制图表
    myChart.setOption({
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
        formatter: '{b0}:lsurus经济领先 {c0}'
      },
      grid: {
        top: '10%',
        left: '6%',
        right: '8%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '1:00', '05:00', '06:00', '11:00', '12:00'],
        axisLabel: {
          // 刻度线
          fontWeight: 'bold',
          color: '#85838F'
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
        }
      },
      yAxis: [
        {
          type: 'value',
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
          type: 'category',
          position: 'right',
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
          data: [1, 1, 1, 1, 1],
        }
      ],
      series: [
        {
          type: 'line',
          data: [
            {
              value: -100,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: 200,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: -300,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: 100,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: 200,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: 300,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: 400,
              itemStyle: {
                color: '#3393FF'
              }
            },
            {
              value: 400,
              itemStyle: {
                color: '#3393FF'
              }
            }
          ],
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
          },
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
    })
  }, [ref])
  return <div>
    <div className={styles.lineChartSwitch}>
      <div>
        <button>经济差</button>
        <button className={styles.activeClick}>经验差</button>
      </div>
    </div>
    <div ref={ref} className={styles.container} />
  </div>
}

export default LineChart
