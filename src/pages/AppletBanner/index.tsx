import React, { useRef } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import AddBannerModal from './components/AddBannerModal';
import { IAddBannerModalRef } from './components/AddBannerModal/interface';

const AppletBanner = () => {
  const addBannerModalRef = useRef<IAddBannerModalRef>();
  return (
    <div className={styles['applet-banner-wapper']}>
      <Button
        type="primary"
        onClick={() => addBannerModalRef.current?.setVisible(true)}
      >
        添加banner
      </Button>

      <AddBannerModal cref={addBannerModalRef} />
    </div>
  );
};
export default AppletBanner;
