import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'

function DownloadQcr() {
    const [hide, showSwitch] = useState(styles.noneBody)
    useEffect(function () {
        let time = null

        function update() {
            const txt = document.querySelector(`.${styles.appContent}`)
            const scrollTop = document.documentElement.scrollTop;
            // console.log(document.documentElement.scrollTop, txt.offsetTop);
            if (!txt) return
            if (scrollTop > txt.offsetTop / 2) {
                showSwitch('')
            } else if (scrollTop <= txt.offsetTop / 2) {
                showSwitch(styles.noneBody)
            }
        }

        window.onscroll = function () {
            clearTimeout(time)
            time = setTimeout(update, 300)
        }
        return function () {
            clearTimeout(time)
        }
    }, [])
    return <div className={styles.appContent}>
        <div className={`${styles.actionButton} ${styles.downLoad} ${hide}`}>
            <span onClick={() => document.body.scrollIntoView()}>返回顶部</span>
            {/*<div className={styles.qcrImg}>*/}
            {/*    <div>*/}
            {/*        <img src={svg} alt=""/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
        {/*<div onClick={() => document.body.scrollIntoView()} className={styles.actionButton}>返回顶部</div>*/}
    </div>
}

export default DownloadQcr;
