import React from 'react'
import { useHistory } from 'react-router-dom'
import { diffCatch, inning } from '../../../../tool/util.js'
import TipTitle from '../TipTitle/TipTitle.jsx'
import BoutTitleBar from '../BoutTitleBar/BoutTitleBar.jsx'
import BPList from '../BPList/BPList.jsx'
import TopLogoNameScore, { csgoBothInit } from '../TopLogoNameScore/TopLogoNameScore.jsx'
import { globalDataInit } from '../../../../tool/useData.js'
import { comparisonUtil } from '../details.jsx'
import CsGoNowStatus from '../CsGoNowStatus/CsGoNowStatus.jsx'
import styles from './index.module.scss'

export const useStatePublicBoth = globalDataInit({
  poor_economy: [],
  team1: {
    real_players: [],
    real_history: [],
    end_match: []
  },
  team2: {},
  battle_data: {},
  real_history: {}
})

function BothItem (props) {
  // dota lol koa
  const propsVE = diffCatch(props)({
    endMatch: {
      team1: {
        status: 0,
        game_type_id: 0,
        other_more_attr: {},
        players: []
      },
      team2: {
        other_more_attr: {},
        players: []
      }
    }
  })
  const equalStatus = comparisonUtil(propsVE.endMatch.team1.game_type_id, propsVE.endMatch.team1.status)
  return (
    <div style={{
      backgroundColor: '#203457',
      padding: '2%'
    }}>
      <TopLogoNameScore
        endMatch={propsVE.endMatch}
        isBottomBoth
      />
      {
        equalStatus([1, 5]) && (
          <BPList
            team1={propsVE.endMatch.team1.players}
            team2={propsVE.endMatch.team2.players}
          />
        )
      }
    </div>)
}

function BothItem2 (props) {
  // csgo
  const propsVE = diffCatch(props)({
    endMatch: {
      team1: {
        game_type_id: 0,
        other_more_attr: {},
        players: {}
      },
      team2: {
        other_more_attr: {},
        players: {}
      }
    }
  })
  const scgoData = csgoBothInit(propsVE.endMatch)
  return (
    <div>
      <p className={styles.mapCenter}>
        {
          propsVE.endMatch.team1.other_more_attr.map
        }
      </p>
      <div style={{
        backgroundColor: '#203457',
        padding: '0 2%'
      }}>
        <CsGoNowStatus {...scgoData} isBottomBoth />
      </div>
    </div>
  )
}

function Kotsubone (props) {
  // 赛况/赛果 列表
  const history = useHistory()
  const propsVE = diffCatch(props)({
    matchList: {}, // 赛程
    matchResult: {} // 赛况赛果
  })
  const [bothData, updateBothData] = useStatePublicBoth()

  function goBoth (value) {
    updateBothData(value)
    history.push('/details/both')
  }

  return <ul>
    {
      propsVE.endMatch.map((value, index) => {
        const valueVE = diffCatch(value)({
          team1: {
            game_type_id: 0,
            round: 0,
            is_win: 0
          }
        })
        const round = inning(valueVE.team1.round)
        const winName = valueVE.team1.is_win > 1 ? valueVE.team1.team_name : valueVE.team2.team_name
        return (
          <li key={index} onClick={() => goBoth(value)}>
            {
              !propsVE.gameOver && [
                <div key='0' style={{ height: '12px' }} />,
                <TipTitle key='1' title={round} />
              ]
            }
            <div style={{ height: '10px' }} />
            <BoutTitleBar
              winName={winName}
              nowTxt={round}
            />
            {
              valueVE.team1.game_type_id === 3 ? <BothItem2 endMatch={valueVE} /> : <BothItem endMatch={valueVE} />
            }
          </li>
        )
      })
    }
  </ul>
}

export default Kotsubone
