import React, { useEffect, useRef } from 'react'
import Logo from '../../../assets/ic_csgo.png'
import echarts from 'echarts'
import styles from './index.module.scss'

function RadarChart () {
  const ref = useRef()
  useEffect(function () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(ref.current)
    // 绘制图表
    myChart.setOption({
      backgroundColor: '#101831',
      series: [
        {
          type: 'radar',
          symbolSize: 4,
          data: [
            {
              value: [15, 12, 22, 17, 22, 28],
              name: '预算分配（Allocated Budget）',
              lineStyle: {
                width: 1,
                color: '#3359FF'
              },
              areaStyle: {
                color: 'rgba(51,89,255,0.2)'
              }
            },
            {
              value: [22, 22, 28, 22, 21],
              name: '实际开销（Actual Spending）',
              lineStyle: {
                width: 1,
                color: '#E12727'
              },
              areaStyle: {
                color: 'rgba(225,39,39,0.2)'
              }
            }
          ]
        }
      ],
      radar: {
        radius: '64%',
        center: ['50%', '50%'],
        splitNumber: 4, // 内圈数量
        name: {
          show: true,
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        },
        nameGap: 6, // 文字距离
        axisLine: {
          lineStyle: {
            color: '#85838F',
          }
        },
        splitLine: {
          lineStyle: {
            color: '#85838F'
          }
        },
        splitArea: {
          areaStyle: {
            color: ['#4f5975', '#203457', '#061a35', '#061a35'],
          }
        },
        indicator: [
          {
            name: '等级',
            max: 28,
          },
          {
            name: '死亡',
            max: 28
          },
          {
            name: '反补',
            max: 28
          },
          {
            name: '经济',
            max: 28
          },
          {
            name: '正补',
            max: 28
          },
          {
            name: '击杀',
            max: 28
          },
        ],
      }
    })
  }, [ref])
  return <div className={styles.container}>
    <div className={styles.left}>
      <div>
        <img src={Logo} />
        <p>UOLUOLUOLUOLUOLUOLUOLUOL</p>
      </div>
      <p>总等级: 50</p>
      <p>总击杀: 50</p>
      <p>总死亡: 50</p>
      <p>总正补: 50</p>
      <p>总反补: 50</p>
    </div>
    <div ref={ref} className={styles.canvasContainer} />
    <div className={styles.right}>
      <div>
        <p dir='rtl'>UOLUOLUOLUOLUOLUOLUOL</p>
        <img src={Logo} />
      </div>
      <p>总等级: 50</p>
      <p>总击杀: 50</p>
      <p>总死亡: 50</p>
      <p>总正补: 50</p>
      <p>总反补: 50</p>
    </div>
  </div>
}

export default RadarChart
