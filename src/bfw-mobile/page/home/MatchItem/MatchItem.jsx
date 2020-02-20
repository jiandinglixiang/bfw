import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import React, { useMemo } from 'react'
import defLogo from '../../../assets/default_team_60.png'
import { formatDate2, initOddAndLogoMobile, inning, PropTypes, } from '../../../../tool/util'
import { scoreListReduce } from '../../../../bfw-web/page/AnalysisData/components/TameNowStatus'

export function gameRound (scoreList, roundTotal) {
  try {
    let round = 1
    if (scoreList[scoreList.length - 1]) {
      round = scoreList[scoreList.length - 1].game_no * 1 + 1 > roundTotal
        ? scoreList[scoreList.length - 1].game_no
        : scoreList[scoreList.length - 1].game_no * 1 + 1
    }
    return inning(round)
  } catch (e) {
    console.log(e)
    return '第一局'
  }
}

function tameDataScore (tameData) {
  try {
    return <p>
      <span>{tameData[0].score[0].team}</span><span>-</span><span>{tameData[1].score[0].team}</span>
    </p>
  } catch (e) {
    return <p><span>0</span><span>-</span><span>0</span></p>
  }
}

function routerDetails (data, history) {
  history.push(
    `/details/${data.smid}/${data.game_type_name}/${data.game_name}/${data.host_team_name} VS ${data.guest_team_name}/${data.game_type_id}`)
}

function MatchItem (props) {
  const history = useHistory()
  const { data = {}, mode } = props
  const [scoreList, roundTotal] = [data.score_list || [], data.round_total || 0]
  const tameData = useMemo(function () {
    const [score1, score2] = [[], []]
    if (mode === '1') {
      const scoreList = data.score_list || []
      if (scoreList.length) {
        const arr = scoreListReduce(scoreList)
        score1.push({ team: arr[0], win: false, })
        score2.push({ team: arr[1], win: false, })
      } else {
        score1.push({ team: '0', win: false, })
        score2.push({ team: '0', win: false, })
      }
    } else if (mode === '2') {
      const score = (data.score || '').split(/:|,/)
      score1.push({ team: score[0] || 0, win: false, })
      score2.push({ team: score[1] || 0, win: false, })
    }
    const [tame1 = { score: [] }, tame2 = { score: [] }] = initOddAndLogoMobile(data, { score1, score2, })
    return [tame1, tame2]
  }, [data, mode])

  try {
    return <li
      className={styles.content}
      onClick={() => routerDetails(data, history)}>
      <div className={styles.matchState}>
        <div className={styles.leftName}>
          <img src={data.icon || defLogo} alt='' />
          <p>{data.game_name || '加载中...'}</p>
        </div>
        <div className={styles.centerData}>
          <p className={styles[`state${mode}`]}>
            {
              mode === '1' ? `${data.match_rules || ''}/${gameRound(scoreList,
                roundTotal)}` : formatDate2(data.game_start_time)
            }
          </p>
        </div>
        <div className={styles.rightLink}>
          {mode === '1' ? null : <p className={styles.dataLink}>数据分析</p>}
        </div>
      </div>
      <div className={styles.tamePvp}>
        <p
          className={styles.tameName}
          style={{ textAlign: 'right' }}>{tameData[0].name}</p>
        <div className={styles.logOdds}>
          <img src={tameData[0].logo || defLogo} alt='' />
          <p className={styles.odds}>{tameData[0].odds || '-'}</p>
        </div>
        <div className={styles.centerBody}>
          {
            mode === '0' ? <p>VS</p> : tameDataScore(tameData)
          }
          <p className={styles.odds}>指数</p>
        </div>
        <div className={styles.logOdds}>
          <img src={tameData[1].logo || defLogo} alt='' />
          <p className={styles.odds}>{tameData[1].odds || '-'}</p>
        </div>
        <p className={styles.tameName}>{tameData[1].name}</p>
      </div>
    </li>
  } catch (e) {
    console.log(e)
    return <li className={styles.content} />
  }
}

MatchItem.propTypes = {
  data: PropTypes.object,
  mode: PropTypes.string,
}
export default MatchItem
