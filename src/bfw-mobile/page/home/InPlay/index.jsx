import React from 'react'
import { formatDate3, PropTypes, useDiffCatch } from '../../../../tool/util'
import GameTitle from '../GameTitle/GameTitle.jsx'
import Underway from '../Underway/Underway.jsx'
import MatchTitle from '../../../components/MatchTitle/MatchTitle.jsx'
import TryCatch from '../../../components/TryCatch/TryCatch.jsx'

function ScheduleList (props) {
  const propsVE = useDiffCatch(props)({ value: [] })
  return propsVE.value.map((value1, index) => {
    const time = formatDate3(value1.game_start_time)
    return <ul key={index}>
      <TryCatch>
        <GameTitle
          gameId={value1.game_type_id}
          gameName={value1.game_name}
          icon={value1.icon}
          time={time}
        />
        <Underway gameData={value1} />
      </TryCatch>
    </ul>
  })
}

function InPlay (props) {
  const propsVE = useDiffCatch(props)({ data: [] })
  return <div>
    {
      propsVE.data.map((value, index) => {
        return (
          <div key={index}>
            <MatchTitle gameName={value.day} />
            <ScheduleList value={value.schedule_list} />
          </div>
        )
      })
    }
  </div>
}

InPlay.propTypes = {
  data: PropTypes.array
}

export default InPlay
