import React from 'react';
import styles from './index.module.scss'

function DownBar() {
    return <div className={styles.downBar}>
        <div className={styles.navTop}>
            <p>声明：本网数据仅供电竞爱好者浏览之用。任何人不得用于非 法用途，否则责任自负。本网所登载广告均为广告客户的个人意见及表达方式，和本网无任何关系。</p>
        </div>
    </div>
}

export default DownBar
