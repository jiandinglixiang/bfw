import React from 'react';
import styles from './index.module.scss'
import {Link} from 'react-router-dom';

function TopNav() {
    return <div className={styles.navTop}>
        <div>
            <Link to="/">
                <div className={styles.navButton}>首页</div>
            </Link>
            {/*<Link to="/analysisData">*/}
            {/*    <div className={styles.navButton}>APP下载</div>*/}
            {/*</Link>*/}
        </div>
    </div>
}

export default TopNav
