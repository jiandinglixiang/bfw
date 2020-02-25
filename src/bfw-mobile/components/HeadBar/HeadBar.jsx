import React from 'react'
import nevBar from '../../assets/nav_back.png'
import { useHistory } from 'react-router-dom'
import { PropTypes } from '../../../tool/util'
import scss from './index.module.scss'

function HeadBar ({ title, rightContent, fixedTop, hideBack, styles }) {
  const history = useHistory()
  // console.log(history)
  return <div className={scss.component}>
    <div
      className={`${scss.body} ${fixedTop ? scss.fixedTop : ''}`}
      style={styles}>
      {
        hideBack ? null : <img
          onClick={history.goBack}
          className={scss.backImg}
          src={nevBar} alt=''
        />
      }
      <div className={scss.center}>
        {title}
      </div>
      <div className={scss.rightContent}>
        {rightContent}
      </div>
    </div>
  </div>
}

HeadBar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  rightContent: PropTypes.element,
  fixedTop: PropTypes.bool,
  hideBack: PropTypes.bool,
  styles: PropTypes.object,
}
export default HeadBar
