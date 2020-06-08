import React from 'react';
import styles from './index.less';
import Header from './components/Header';
const Server = (props: any) => {
  return (
    <div className={styles['server-wrapper']}>
      <Header />
      <div className={styles['menu-lg-wrapper']}>menu</div>
      <div className={styles['server-container']}>{props.children}</div>
    </div>
  );
};

export default Server;
