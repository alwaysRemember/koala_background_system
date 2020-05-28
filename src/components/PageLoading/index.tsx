import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
export default () => {
  return (
    <div className={styles['loading-wrapper']}>
      <Spin size="large" />
    </div>
  );
};
