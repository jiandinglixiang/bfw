import React from 'react'
import dateImg from '../../../assets/date.png'
import PropTypes from 'prop-types'

function PickerCustom ({ onClick }) {
  return <img
    style={{
      width: '100%',
      height: '100%',
    }} src={dateImg} alt='' onClick={onClick} />
}

PickerCustom.propTypes = {
  onClick: PropTypes.any,
}

export default PickerCustom
