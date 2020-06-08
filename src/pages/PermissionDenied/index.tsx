import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import { removeLocal } from '@/utils';
import { persistor } from '@/store';
import { EGlobal } from '../../enums/Global';
const PermissionDenied = () => {
  const quit = () => {
    removeLocal(EGlobal.LOCAL_USER_INFO);
    persistor.purge();
    history.replace('/login');
  };
  return (
    <div className={styles['permission-denied']}>
      <div className={styles['permission-con']}>
        <h1 className={styles['text']}>
          抱歉！您的权限不足访问本页面，请联系管理员进行处理！
        </h1>
        <Button danger onClick={quit} className={styles['quit']}>
          退出登录此账号
        </Button>
      </div>
    </div>
  );
};

export default PermissionDenied;
