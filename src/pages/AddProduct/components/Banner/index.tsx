import React, {
  useState,
  useEffect,
  MutableRefObject,
  useImperativeHandle,
} from 'react';

import styles from './index.less';
import { Upload, Button, Spin } from 'antd';
import { IBannerItem } from '../../interface';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { uploadProductBanner } from '@/api';
import { IFileItem, IBannerRef } from './interface';
const Banner = ({
  fileList,
  cref,
}: {
  fileList: Array<IBannerItem>;
  cref: MutableRefObject<IBannerRef | undefined>;
}) => {
  useImperativeHandle(cref, () => ({
    getBannerIdList: () => bannerList.map((item: IBannerItem) => item.id),
    getDelBannerIdList: () => delIdList,
  }));

  const [bannerList, setBannerList] = useState<Array<IBannerItem>>(fileList);
  const [delIdList, setDelIdList] = useState<Array<string>>([]);

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  /**
   * 监听上传
   * @param param0
   */
  const onChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') return;
    setUploadLoading(true);
    const formData = new FormData();
    formData.set('file', file.originFileObj as File);
    const data = await uploadProductBanner(formData);
    setBannerList(bannerList.concat([data]));
    setUploadLoading(false);
  };

  /**
   * 删除文件
   * @param info
   */
  const onRemove = (info: IFileItem) => {
    setDelIdList(list => {
      list = JSON.parse(JSON.stringify(list));
      list.push(info.id);
      return list;
    });
    // 获取删除文件的下标
    const index = bannerList.findIndex(
      (item: IBannerItem) => item.id === info.id,
    );

    // 删除文件
    const prevBannerList: Array<IBannerItem> = JSON.parse(
      JSON.stringify(bannerList),
    );
    prevBannerList.splice(index, 1);

    setBannerList(prevBannerList);
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
            }) as IFileItem,
        )}
        isImageUrl={() => true}
        onRemove={(info: UploadFile) => {
          onRemove(info as IFileItem);
        }}
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
