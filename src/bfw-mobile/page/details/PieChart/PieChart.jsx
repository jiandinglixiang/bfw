import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import echarts from 'echarts'

function PieChart () {
  const ref = useRef()
  useEffect(function () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(ref.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: '完赛总击杀数>56',
        padding: 0,
        textAlign: 'center',
        left: 'middle',
        top: 'middle',
        textStyle: {
          color: '#fff',
          width: '40%',
          height: '100%',
          fontSize: 12,
          lineHeight: 13
        }
      },
      backgroundColor: '#06051A',
      series: [
        {
          type: 'pie',
          radius: ['65%', '75%'],
          hoverAnimation: false,
          silent: false,
          center: ['20%', '50%'],
          data: [
            {
              value: 100,
              labelLine: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#101831',
                }
              }
            },
            {
              value: 100,
              labelLine: {
                show: false
              },
              label: {
                rich: {
                  a: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: '600',
                  },
                  b: {
                    color: '#85838F',
                    fontSize: 12,
                  }
                },
                formatter: function (params) {
                  // console.log(params)
                  return '{a|' + params.value + '%}' + '\n{b|(14局)}'
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'normal',
                  color: '#fff'
                }
              },
              itemStyle: {
                normal: {
                  color: '#E12727',
                  shadowBlur: 11
                }
              }
            }
          ]
        },
        {
          type: 'pie',
          radius: ['65%', '75%'],
          hoverAnimation: false,
          silent: false,
          center: ['80%', '50%'],
          data: [
            {
              value: 100,
              labelLine: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#101831',
                }
              }
            },
            {
              value: 25,
              labelLine: {
                show: false
              },
              label: {
                rich: {
                  a: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: '600',
                  },
                  b: {
                    color: '#85838F',
                    fontSize: 12,
                  }
                },
                formatter: function (params) {
                  // console.log(params)
                  return '{a|' + params.value + '%}' + '\n{b|(14局)}'
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '14',
                  fontWeight: 'normal',
                  color: '#fff'
                }
              },
              itemStyle: {
                normal: {
                  color: '#3393FF',
                  shadowBlur: 11
                }
              }
            }
          ]
        }
      ]
    })
  }, [ref])
  return <div ref={ref} className={styles.container} />
}

export default PieChart
