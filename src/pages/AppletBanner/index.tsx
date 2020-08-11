import React, { useRef, useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Table, Tag, Popconfirm } from 'antd';
import AddBannerModal from './components/AddBannerModal';
import {
  IAddBannerModalRef,
  IAppletHomeBannerItem,
} from './components/AddBannerModal/interface';
import { getAppletHomeBannerList, deleteAppletHomeBanner } from '@/api';
import { ColumnsType } from 'antd/lib/table';
import {
  EAppletHomeBannerTypeTransferEnum,
  EAppletHomeBannerTypeEnum,
} from './enum';
import { openInNewTab } from '@/utils';

const AppletBanner = () => {
  const addBannerModalRef = useRef<IAddBannerModalRef>();
  const [loading, setLoading] = useState<boolean>(false);
  const [bannerList, setBannerList] = useState<Array<IAppletHomeBannerItem>>(
    [],
  );

  const columns: ColumnsType<IAppletHomeBannerItem> = [
    {
      title: 'banner图片',
      dataIndex: 'imgPath',
      align: 'center',
      width: 200,
      render: (url: string) => (
        <img
          src={url}
          alt=""
          className={styles['banner-img']}
          onClick={() => {
            openInNewTab(url);
          }}
        />
      ),
    },
    {
      title: '关联的产品ID',
      dataIndex: 'productId',
      align: 'center',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      width: 100,
      render: (type: EAppletHomeBannerTypeEnum) => (
        <Tag color="lime">{EAppletHomeBannerTypeTransferEnum[type]}</Tag>
      ),
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (_, { id }: IAppletHomeBannerItem) => (
        <Popconfirm
          title="是否删除此条数据"
          okText="删除"
          cancelText="取消"
          onConfirm={async () => {
            setLoading(true);
            try {
              await deleteAppletHomeBanner({ id });
              window.message.success('删除成功', 1).then(() => {
                getData();
              });
            } catch (e) {}
            setLoading(false);
          }}
        >
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const list = await getAppletHomeBannerList();
      setBannerList(list);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles['applet-banner-wapper']}>
      <Button
        type="primary"
        onClick={() => addBannerModalRef.current?.setVisible(true)}
      >
        添加banner
      </Button>

      <Table
        className={styles['table-wrapper']}
        columns={columns}
        dataSource={bannerList}
        bordered
        loading={loading}
        rowKey={(record: IAppletHomeBannerItem) => record.id}
        scroll={{
          x: 600,
        }}
        pagination={false}
      />

      <AddBannerModal cref={addBannerModalRef} submitCb={getData} />
    </div>
  );
};
export default AppletBanner;
