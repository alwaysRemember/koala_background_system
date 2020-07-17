import React, { useState, useEffect } from 'react';

import styles from './index.less';
import { Upload, Button, Spin } from 'antd';
import { IBannerItem } from '../../interface';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { uploadProductBanner } from '@/api';
const Banner = ({ fileList }: { fileList: Array<IBannerItem> }) => {
  const [bannerList, setBannerList] = useState<Array<IBannerItem>>(fileList);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const onChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') return;
    setUploadLoading(true);
    const formData = new FormData();
    formData.set('file', file.originFileObj as File);
    const data = await uploadProductBanner(formData);
    setBannerList(bannerList.concat([data]));
    setUploadLoading(false);
  };

  const onRemove = (info: UploadFile) => {
    console.log(info);
  };

  useEffect(() => {
    setBannerList(fileList);
  }, [fileList]);
  return (
    <Spin tip="正在上传中..." spinning={uploadLoading}>
      <Upload
        accept="image/*"
        listType="picture"
        fileList={bannerList.map(
          (item: IBannerItem) =>
            Object.assign({}, item, {
              thumbUrl: item.url,
              status: 'done',
              uid: item.id + '',
              size: 0,
              type: 'IMAGE',
            }) as UploadFile,
        )}
        isImageUrl={() => true}
        onRemove={onRemove}
        onChange={onChange}
      >
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    </Spin>
  );
};

export default Banner;
