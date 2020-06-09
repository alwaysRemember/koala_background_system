import React, { useState, useImperativeHandle } from 'react';
import styles from './index.less';
import { setClassName } from '@/utils';
import Menu from '../Menu';
const MobileMenu = ({ cref }: { cref: any }) => {
  const [show, setShow] = useState<boolean>(false);

  useImperativeHandle(cref, () => ({
    changeMenuShowType() {
      setShow(!show);
    },
  }));

  return (
    <div
      className={setClassName([
        styles['mobile-menu-wrapper'],
        show ? '' : styles['hide'],
      ])}
    >
      <div className={styles['mobile-menu-con']}>
        <Menu />
      </div>
      <div
        className={styles['mobile-menu-mask']}
        onClick={() => setShow(!show)}
      />
    </div>
  );
};

export default MobileMenu;
