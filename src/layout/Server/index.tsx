import React, { useRef } from 'react';
import styles from './index.less';
import Header from './components/Header';
import Menu from './components/Menu';
import MobileMenu from './components/MobileMenu';
const Server = (props: any) => {
  const mobileMenuRef = useRef<any>();

  const mobileMenuClick = () => {
    mobileMenuRef.current.changeMenuShowType();
  };
  return (
    <div className={styles['server-wrapper']}>
      <Header mobileMenuClick={mobileMenuClick} />
      <div className={styles['menu-lg-wrapper']}>
        <Menu />
      </div>
      <MobileMenu cref={mobileMenuRef} />
      <div className={styles['server-container']}>{props.children}</div>
    </div>
  );
};

export default Server;
