import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import echarts from 'echarts'
import { diffCatch, PropTypes } from '../../../../tool/util.js'

function PieChart ({ value }) {
  const ref = useRef()
  useEffect(function () {
    // 基于准备好的dom，初始化echarts实例
    const el = window.document.documentElement || window.document.body
    const myChart = echarts.init(ref.current, '', {
      width: el.offsetWidth - (el.offsetWidth * 0.04) + 'px'
    })
    const valueVE = diffCatch(value)({
      name: '',
      team1_count: '',
      team1_ratio: 0,
      team2_count: '',
      team2_ratio: 0,
    })
    // 绘制图表
    myChart.setOption({
      title: {
        text: valueVE.name,
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
              value: 100 - valueVE.team1_ratio,
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
              value: valueVE.team1_ratio,
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
                  return `{a|${params.value}%} \n{b|(${valueVE.team1_count})}`
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
              value: 100 - valueVE.team2_ratio,
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
              value: valueVE.team2_ratio,
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
                  return `{a|${params.value}%} \n{b|(${valueVE.team2_count})}`
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
  }, [ref, value])
  return <div ref={ref} className={styles.container} />
}

PieChart.propTypes = {
  value: PropTypes.object
}

export default PieChart
