import React from 'react'
import styles from './index.module.scss'

const hideRatio = ['gpm', 'xpm', 'rating', 'adr', 'kda']

function PvpStatistics (props) {
  let { stat, showMode } = props
  if (!stat.length) {
    stat = showMode ? [
      {
        name: '系列赛',
        team1_count: '胜/场',
        team1_ratio: 0,
        team2_count: '胜/场',
        team2_ratio: 0
      }, {
        name: '局数',
        team1_count: '0胜/0局',
        team1_ratio: 0,
        team2_count: '0胜/0局',
        team2_ratio: 0
      }, { name: 'GPM', team1_count: 0, team1_ratio: 0, team2_count: 0, team2_ratio: 0 }, {
        name: 'KDA',
        team1_count: null,
        team1_ratio: 0,
        team2_count: null,
        team2_ratio: 0
      }, { name: '一血', team1_count: '0次', team1_ratio: 0, team2_count: '0次', team2_ratio: 0 }, {
        name: '十杀',
        team1_count: '0次',
        team1_ratio: 0,
        team2_count: '0次',
        team2_ratio: 0
      }, {
        name: '完赛时间>38',
        team1_count: '0次',
        team1_ratio: 0,
        team2_count: '0次',
        team2_ratio: 0
      }, {
        name: '完赛总击杀>52.5',
        team1_count: '0次',
        team1_ratio: 0,
        team2_count: '0次',
        team2_ratio: 0
      },
      { name: '击杀双数', team1_count: '0次', team1_ratio: 0, team2_count: '0次', team2_ratio: 0 }
    ] : [
      { name: '系列赛', team1_count: '0胜', team1_ratio: 0, team2_count: '0胜', team2_ratio: 0 },
      { name: '总获胜局数', team1_count: '0胜', team1_ratio: 0, team2_count: '0胜', team2_ratio: 0 },
      { name: 'GPM', team1_count: null, team1_ratio: 0, team2_count: null, team2_ratio: 0 },
      { name: 'KDA', team1_count: null, team1_ratio: 0, team2_count: null, team2_ratio: 0 },
      { name: '一血率', team1_count: '0次', team1_ratio: 0, team2_count: '0次', team2_ratio: 0 },
      { name: '十杀率', team1_count: '0次', team1_ratio: 0, team2_count: '0次', team2_ratio: 0 },
      { name: '击杀双数', team1_count: '0局', team1_ratio: 0, team2_count: '0局', team2_ratio: 0 }
    ]
  }
  return <ul className={styles.appContent}>
    {stat.map((value, index) => {
      const [originalRatio1, originalRatio2] = [value.team1_ratio * 1, value.team2_ratio * 1]
      let team1Ratio = 0
      let team2Ratio = 0
      if (originalRatio1 || originalRatio2) {
        team1Ratio = (originalRatio1 && originalRatio1 >= originalRatio2)
          ? originalRatio1 + 2
          : originalRatio1
        team2Ratio = (originalRatio2 && originalRatio2 >= originalRatio1)
          ? originalRatio2 + 2
          : originalRatio2
      }
      if (showMode) {
        team1Ratio /= 2
        team2Ratio /= 2
      }
      return <li key={index}>
        <p>{value.name}</p>
        <div>
          <p>{value.team1_count}</p>
          <div className={showMode ? styles.centerStatisticsHistory : styles.centerStatistics}>
            <div style={{ width: `${team1Ratio}%`, zIndex: team1Ratio >= team2Ratio ? 1 : 'auto' }} />
            <div style={{ width: `${team2Ratio}%`, zIndex: team2Ratio > team1Ratio ? 1 : 'auto' }} />
            {hideRatio.includes(value.name.toLocaleLowerCase()) ? null : <span>{value.team1_ratio}%</span>}
            {hideRatio.includes(value.name.toLocaleLowerCase()) ? null : <span>{value.team2_ratio}%</span>}
          </div>
          <p>{value.team2_count}</p>
        </div>
      </li>
    })}
  </ul>
}

export default PvpStatistics
