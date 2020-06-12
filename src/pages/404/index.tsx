import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';
const notFound = () => {
  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found-con']}>
        <h1>404</h1>
        <p>您所寻找的页面不存在。你可以点击下面的按钮，返回主页。</p>
        <Button
          className={styles['go-home']}
          type="primary"
          onClick={() => {
            history.replace('/server');
          }}
        >
          返回主页
        </Button>
      </div>
    </div>
  );
};

export default notFound;
