import React from 'react'
import { PropTypes } from '../../../../tool/util'
import GameTitle from '../GameTitle/GameTitle.jsx'
import Underway from '../Underway/Underway.jsx'
import MatchTitle from '../../../components/MatchTitle/MatchTitle.jsx'
import TryCatch from '../../../components/TryCatch/TryCatch.jsx'

function ScheduleList (props) {
  const { value = [] } = props
  return value.map((value1, index) => {
    return <ul key={index}>
      <TryCatch>
        <GameTitle typeId={value1.game_type_id} matchName={value1.game_name} />
        <Underway gameData={value1} />
      </TryCatch>
    </ul>
  })
}

function InPlay ({ data = [] }) {
  return <div>
    {
      data.map((value, index) => {
        return <div key={index}>
          <MatchTitle gameName={value.day} />
          <ScheduleList value={value.schedule_list} />
        </div>
      })
    }
  </div>
}

InPlay.propTypes = {
  data: PropTypes.array
}

export default InPlay
