import React from 'react';
import styles from './index.module.scss'

function openUrl(event) {
    event.preventDefault()
    window.open('/#/aboutUs', '_blank')
    return false
}

function FriendlyLink() {
    return <div className={styles.appContent}>
        <div>
            <div className={styles.linkContent}>
                <p className={styles.modelTitle}>友情链接</p>
                <ul>
                    <li><a href="https://www.douyu.com" target="_blank" rel="noopener noreferrer">斗鱼直播</a></li>
                    <li><a href="https://www.huya.com" target="_blank" rel="noopener noreferrer">虎牙直播</a></li>
                    <li><a href="https://egame.qq.com" target="_blank" rel="noopener noreferrer">企鹅直播</a></li>
                    <li><a href="https://www.dota2.com.cn/main.htm" target="_blank" rel="noopener noreferrer">刀塔二</a>
                    </li>
                    <li><a
                        href="https://www.csgo.com.cn/main.html"
                        target="_blank"
                        rel="noopener noreferrer">反恐精英:全球局势</a>
                    </li>
                    <li><a href="https://lol.qq.com" target="_blank" rel="noopener noreferrer">英雄联盟</a></li>
                    <li><a href="https://pvp.qq.com" target="_blank" rel="noopener noreferrer">王者荣耀</a></li>
                    <li><a href="https://ow.blizzard.cn/home" target="_blank" rel="noopener noreferrer">守望先锋</a></li>
                </ul>
            </div>
            <div className={styles.linkContent}>
                <p className={styles.modelTitle}>联系方式</p>
                <ul>
                    <li><span onClick={openUrl}>商务合作</span></li>
                    <li><a
                        href="https://wpa.qq.com/msgrd?v=3&uin=3174237134&site=qq&menu=yes" target="_blank"
                        rel="noopener noreferrer">联系客服</a></li>
                    <li><span onClick={openUrl}>关于火牛电竞</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default FriendlyLink;
