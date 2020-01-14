import React from 'react'
import styles from './index.module.scss'
import titleLine from '../../../../assets/title_line.png'
import redDot from '../../../../assets/red_f.png'
import blueDot from '../../../../assets/blue_f.png'

function TitleAndTameNameContent (props) {
  /*
    * tameName
    * title
    * */
  const { id } = props
  let typeShow = <div className={styles.pvpTameName}><img className={styles.centerImg} src={titleLine} alt=''/></div>
  if (props.tameName && Array.isArray(props.tameName)) {
    typeShow = <div className={styles.pvpTameName}>
      <p className={styles.tameName}>{props.tameName[0]}</p>
      <img className={styles.tameDot} src={redDot} alt=''/>
      <img className={styles.centerImg} src={titleLine} alt=''/>
      <img className={styles.tameDot} src={blueDot} alt=''/>
      <p className={styles.tameName}>{props.tameName[1]}</p>
    </div>
  }
  return <div className={styles.appContent} id={id}>
    <p>{props.title}</p>
    {typeShow}
    <div className={styles.paddingTop10}>
      {props.children}
    </div>
  </div>
}

export default TitleAndTameNameContent
