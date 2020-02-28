import React from 'react'
import { useHistory } from 'react-router-dom'
import { diffCatch, inning } from '../../../../tool/util.js'
import TipTitle from '../TipTitle/TipTitle.jsx'
import BoutTitleBar from '../BoutTitleBar/BoutTitleBar.jsx'
import KotsuboneItem from './KotsuboneItem.jsx'
import BPList from '../BPList/BPList.jsx'

function Kotsubone (props) {
  // 小局
  const history = useHistory()
  const { endMatch } = diffCatch(props)({ endMatch: [] })
  return <ul>
    {
      endMatch.map((value, index) => {
        const valueVe = diffCatch(value)({
          poor_economy: {},
          team1: {
            team_logo: '',
            other_more_attr: {},
            team_name: '',
            round: 1,
            is_win: 1,
            players: [],
            ban: []
          },
          team2: {
            team_logo: '',
            other_more_attr: {},
            team_name: '',
            round: 1,
            is_win: 1,
            players: [],
            ban: []
          },
          battle_data: {}
        })
        const round = inning(valueVe.team1.round)
        const team1Win = valueVe.team1.is_win > 1
        return <li key={index} onClick={() => history.push('/details/both')}>
          <TipTitle title={round} />
          <div style={{ height: '10px' }} />
          <BoutTitleBar
            winName={team1Win ? valueVe.team1.team_name : valueVe.team2.team_name}
            nowTxt={round}
          />
          <div style={{ backgroundColor: '#203457' }}>
            <KotsuboneItem endMatchVe={valueVe} />
            <BPList team1={valueVe.team1.players} team2={valueVe.team2.players} />
          </div>
        </li>
      })
    }
    {
      !endMatch.length && <li key={-1321} onClick={() => history.push('/details/both')}>
        <TipTitle title='小局' />
        <div style={{ height: '10px' }} />
        <BoutTitleBar />
        <div style={{ backgroundColor: '#203457' }}>
          <KotsuboneItem />
          <BPList />
        </div>
      </li>
    }
  </ul>
}

export default Kotsubone
