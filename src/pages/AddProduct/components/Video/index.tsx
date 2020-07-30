import React, { useState, MutableRefObject, useImperativeHandle } from 'react';
import { Upload, Spin, Button } from 'antd';
import { IVideo } from '../../interface';
import { IFileItem } from '../Banner/interface';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { uploadProductVideo } from '@/api';
import { IVideoRef } from './interface';
import { UploadFile } from 'antd/lib/upload/interface';

const Video = ({
  videoData,
  videoChange,
  cref,
  disabled = false,
}: {
  videoData: IVideo | undefined;
  videoChange: (data: IVideo | undefined) => void;
  cref: MutableRefObject<IVideoRef | undefined>;
  disabled?: boolean;
}) => {
  useImperativeHandle(cref, () => ({
    getDelVideoIdList: () => delVideoIdList,
  }));

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [delVideoIdList, setDelVideoIdList] = useState<Array<string>>([]); // 删除的视频文件id

  const onChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') return;
    setUploadLoading(true);
    const formData = new FormData();
    formData.set('file', file.originFileObj as File);
    try {
      const data = await uploadProductVideo(formData);
      videoChange(data);
    } catch (e) {}
    setUploadLoading(false);
  };

  const onRemove = (info: IFileItem) => {
    videoChange(undefined);
    setDelVideoIdList(list => {
      list = JSON.parse(JSON.stringify(list));
      list.push(info.id);
      return list;
    });
  };

  const onPreview = (info: IFileItem) => {
    const a = document.createElement('a');
    a.href = info.url as string;
    a.target = '_blank';
    a.click();
  };
  return (
    <div>
      <Spin tip="正在上传中..." spinning={uploadLoading}>
        <Upload
          disabled={disabled}
          accept="video/*"
          listType="picture"
          fileList={(((videoData && [videoData]) || []) as Array<IVideo>).map(
            (item: IVideo) =>
              Object.assign({}, item, {
                thumbUrl: item.url,
                status: 'done',
                uid: item.id + '',
                size: 0,
                type: 'VIDEO',
              }) as IFileItem,
          )}
          onRemove={(file: UploadFile) => {
            onRemove(file as IFileItem);
          }}
          onPreview={file => {
            onPreview(file as IFileItem);
          }}
          onChange={onChange}
        >
          <Button disabled={disabled}>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </Spin>
    </div>
  );
};

export default Video;
