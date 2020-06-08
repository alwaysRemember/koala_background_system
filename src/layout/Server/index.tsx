import React, { useCallback } from 'react';
import styles from './index.less';
import { useMappedState } from 'redux-react-hook';
const Server = (props: any) => {
  const { userInfo } = useMappedState(useCallback(state => state, []));
  console.log(userInfo);

  return (
    <div className={styles['server-warpper']}>
      <header className={styles['server-header']}>
        <img
          src={require('../../images/global/koala_logo.png')}
          alt=""
          className={styles['logo']}
        />
        <div className={styles['avatar-wrapper']}>
          <img
            src={require('../../images/global/avatar.jpg')}
            alt=""
            className={styles['avatar']}
          />
        </div>
      </header>
    </div>
  );
};

export default Server;
