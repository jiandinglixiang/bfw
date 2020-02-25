import React from 'react'
import styles from './index.module.scss'
import dota from '../../../assets/ic_csgo.png'

function CsGoMapImg (props) {
  return <div>
    <div className={styles.operatingRecord}>
      <div className={styles.topTitle}>
        <img src={dota} />
        <b>13</b>
        <p>上半场</p>
        <b>13</b>
        <img src={dota} />
      </div>
      <div className={styles.teamRed}>
        <img src={dota} />
        <div className={styles.hodlRight}>
          <img src={dota} /><img src={dota} /><img src={dota} /><img src={dota} /><img src={dota} />
          <img src={dota} />
          <img src={dota} />
          <img src={dota} /><img src={dota} /><img src={dota} /><img src={dota} />
          <img src={dota} /><img src={dota} />
        </div>
      </div>
      <div className={styles.teamBlue}>
        <img src={dota} />
        <div>
          <img src={dota} />
        </div>
      </div>
    </div>
    <p className={styles.mapRight}>mirage</p>
    <p className={styles.extraTimeTxt}>加时赛</p>
    <table className={styles.csgoTableYellow}>
      <thead>
        <tr>
          <th><p>UOL</p></th>
          <th className={styles.alignItemsLeft}><p>血量</p></th>
          <th><p>K/D/A</p></th>
          <th><p>武器</p></th>
          <th><p>护甲</p></th>
          <th><p>$</p></th>
          <th><p>ADR</p></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><p>Valiar</p></td>
          <td className={styles.alignItemsLeft}>
            <p className={styles.bigTxt}>100</p>
            <div
              className={styles.haemalStrandIcon}
              style={{
                backgroundColor: 'red',
                width: '80%'
              }} />
          </td>
          <td><p>18/16/2</p></td>
          <td><img src={dota} /></td>
          <td><img src={dota} /></td>
          <td><p className={styles.bigTxt}>295000</p></td>
          <td><p>103.2</p></td>
        </tr>
        <tr>
          <td><p>Valiar</p></td>
          <td className={styles.alignItemsLeft}>
            <p className={styles.bigTxt}>100</p>
            <div
              className={styles.haemalStrandIcon}
              style={{
                backgroundColor: 'red',
                width: '80%'
              }} />
          </td>
          <td><p>18/16/2</p></td>
          <td><img src={dota} /></td>
          <td><img src={dota} /></td>
          <td><p className={styles.bigTxt}>295000</p></td>
          <td><p>103.2</p></td>
        </tr>
        <tr>
          <td><p>Valiar</p></td>
          <td className={styles.alignItemsLeft}>
            <p className={styles.bigTxt}>100</p>
            <div
              className={styles.haemalStrandIcon}
              style={{
                backgroundColor: 'red',
                width: '80%'
              }} />
          </td>
          <td><p>18/16/2</p></td>
          <td><img src={dota} /></td>
          <td><img src={dota} /></td>
          <td><p className={styles.bigTxt}>295000</p></td>
          <td><p>103.2</p></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div className={styles.singLeft} />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
}

export default CsGoMapImg
