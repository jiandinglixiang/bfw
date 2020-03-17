import React, { useEffect, useRef } from 'react'
import def1 from '../../../assets/default_teamred_40.png'
import def2 from '../../../assets/default_teamblue_40.png'
import echarts from 'echarts'
import styles from './index.module.scss'
import { diffCatch } from '../../../../tool/util.js'
import { Image } from '../../../components/BasicsHtml/BasicsHtml.jsx'

function RadarChart (props = {}) {
  const propsVE = diffCatch(props)({
    endMatch: {
      team1: {
        game_type_id: 0,
        team_logo: ''
      },
      team2: {
        team_logo: ''
      },
      battle_data: {
        team1: {
          level: 0,
          kills: 0,
          deaths: 0,
          last_hits: 0,
          denies: 0,
          gold: 0,
          assists: 0
        },
        team2: {
          level: 0,
          kills: 0,
          deaths: 0,
          last_hits: 0,
          denies: 0,
          gold: 0,
          assists: 0
        }
      }
    }
  })
  let colorArr = []

  const ref = useRef()
  const gameLol = propsVE.endMatch.team1.game_type_id === 1
  useEffect(function () {
    // 基于准备好的dom，初始化echarts实例
    // 绘制图表
    const battleData = propsVE.endMatch.battle_data
    const myChart = echarts.init(ref.current)
    const [level, deaths, gold, kills] = [
      {
        name: '等级',
        team1: battleData.team1.level,
        team2: battleData.team2.level
      },
      {
        name: '死亡',
        team1: battleData.team1.deaths,
        team2: battleData.team2.deaths
      },
      {
        name: '经济',
        team1: battleData.team1.gold,
        team2: battleData.team2.gold
      },
      {
        name: '击杀',
        team1: battleData.team1.kills,
        team2: battleData.team2.kills
      }
    ]
    let indicator
    if (gameLol) {
      const [assists] = [{
        name: '总辅助',
        team1: battleData.team1.assists,
        team2: battleData.team2.assists
      }]
      indicator = [level, deaths, gold, assists, kills].map(value => {
        return {
          ...value,
          max: (value.team1 + value.team2) || 100
        }
      })
      if (propsVE.endMatch.team1.other_more_attr.camp === 'blue') {
        colorArr = ['#3393FF', '#E12727']
      } else if (propsVE.endMatch.team2.other_more_attr.camp === 'blue') {
        colorArr = ['#E12727', '#3393FF']
      }
    } else {
      const [denies, lastHits] = [
        {
          name: '反补',
          team1: battleData.team1.denies,
          team2: battleData.team2.denies
        },
        {
          name: '正补',
          team1: battleData.team1.last_hits,
          team2: battleData.team2.last_hits
        }]
      indicator = [level, deaths, denies, gold, lastHits, kills].map(value => {
        return {
          ...value,
          max: (value.team1 + value.team2) || 100
        }
      })
      if (propsVE.endMatch.team1.other_more_attr.camp === 'dire') {
        colorArr = ['#3393FF', '#E12727']
      } else if (propsVE.endMatch.team2.other_more_attr.camp === 'dire') {
        colorArr = ['#E12727', '#3393FF']
      }
    }
    const option = {
      backgroundColor: '#101831',
      series: [
        {
          type: 'radar',
          symbolSize: 4,
          data: [
            {
              value: indicator.map(val => val.team1 / val.max * val.max),
              lineStyle: {
                width: 1,
                color: colorArr[0]
              },
              areaStyle: {
                color: colorArr[0],
                opacity: 0.2
              },
              itemStyle: {
                color: '#fff',
                borderColor: colorArr[0]
              }
            },
            {
              value: indicator.map(val => val.team2 / val.max * val.max),
              lineStyle: {
                width: 1,
                color: colorArr[1]
              },
              areaStyle: {
                color: colorArr[1],
                opacity: 0.2
              },
              itemStyle: {
                color: '#fff',
                borderColor: colorArr[1]
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
        indicator,
      }
    }
    myChart.setOption(option)
  }, [ref, propsVE.endMatch.battle_data, gameLol])
  return <div className={styles.container}>
    <div className={styles.left}>
      <div>
        <Image src={[propsVE.endMatch.team1.team_logo, def1]} />
        <p>{propsVE.endMatch.team1.team_name}</p>
      </div>
      <p>总等级:{propsVE.endMatch.battle_data.team1.level}</p>
      <p>总击杀:{propsVE.endMatch.battle_data.team1.kills}</p>
      <p>总死亡:{propsVE.endMatch.battle_data.team1.deaths}</p>
      {
        gameLol ? <p>总辅助:{propsVE.endMatch.battle_data.team1.assists}</p> : [
          <p key='0'>总正补:{propsVE.endMatch.battle_data.team1.last_hits}</p>,
          <p key='1'>总反补:{propsVE.endMatch.battle_data.team1.denies}</p>
        ]
      }
    </div>
    <div ref={ref} className={styles.canvasContainer} />
    <div className={styles.right}>
      <div>
        <p dir='rtl'>{propsVE.endMatch.team2.team_name}</p>
        <Image src={[propsVE.endMatch.team2.team_logo, def2]} />
      </div>
      <p>{propsVE.endMatch.battle_data.team2.level}:总等级 </p>
      <p>{propsVE.endMatch.battle_data.team2.kills}:总击杀 </p>
      <p>{propsVE.endMatch.battle_data.team2.deaths}:总死亡 </p>
      {
        gameLol ? <p>{propsVE.endMatch.battle_data.team2.assists}:总辅助</p> : [
          <p key='0'> {propsVE.endMatch.battle_data.team2.last_hits}:总正补</p>,
          <p key='1'> {propsVE.endMatch.battle_data.team2.denies}:总反补</p>
        ]
      }
    </div>
  </div>
}

export default RadarChart
