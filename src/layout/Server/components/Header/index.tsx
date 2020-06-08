import React, { useCallback } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { Button } from 'antd';
import { EGlobal } from '@/enums/Global';
import { EUserAuth } from '@/enums/UserAuthEnum';
import { IUserDataResponse } from '@/pages/Login/interface';
import { useMappedState } from 'redux-react-hook';
import { persistor } from '@/store';
import { removeLocal } from '@/utils';

const Header = () => {
  const { userInfo }: { userInfo: IUserDataResponse } = useMappedState(
    useCallback(state => state, []),
  );

  const quit = () => {
    removeLocal(EGlobal.LOCAL_USER_INFO);
    persistor.purge();
    history.replace('/login');
  };

  const _getAuth = (auth: EUserAuth): string => {
    switch (auth) {
      case EUserAuth.ADMIN:
        return '管理员';
      case EUserAuth.PROXY:
        return '代理';
      case EUserAuth.PUBLIC:
        return '成员';
      default:
        return '成员';
    }
  };
  return (
    <header className={styles['server-header']}>
      <div className={styles['menu-icon']}>
        <i className="iconfont icon-caidan" />
      </div>
      <img
        src={require('../../../../images/global/koala_logo.png')}
        alt=""
        className={styles['logo']}
      />
      <div className={styles['user-info-wrapper']}>
        <ul className={styles['user-info']}>
          <li>
            <span className={styles['label']}>用户名 : </span>
            <span className={styles['value']}>{userInfo.username}</span>
          </li>
          <li>
            <span className={styles['label']}>权限 : </span>
            <span className={styles['value']}>{_getAuth(userInfo.auth)}</span>
          </li>
        </ul>
        <Button danger onClick={quit} className={styles['quit']}>
          退出
        </Button>
      </div>
    </header>
  );
};

export default Header;
