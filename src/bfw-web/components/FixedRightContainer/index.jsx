import React from 'react';
import styles from './index.module.scss'

function FixedRightContainer(props) {
    return <div className={styles.appContent}>
        {props.children}
    </div>
}

export default FixedRightContainer;
