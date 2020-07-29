import React, { useState, MutableRefObject, useImperativeHandle } from 'react';
import { IMainImg } from '../../interface';
import Upload, { UploadChangeParam } from 'antd/lib/upload';
import { uploadProductMainImg } from '@/api';
import { IFileItem, IMainImgRef } from './interface';
import { Spin, Button } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

const MainImg = ({
  cref,
  mainImgChange,
  mainImgData,
}: {
  cref: MutableRefObject<IMainImgRef | undefined>;
  mainImgData: IMainImg | undefined;
  mainImgChange: (data: IMainImg | undefined) => void;
}) => {
  useImperativeHandle(cref, () => ({
    getDelMainImgIdList: () => delMainImgIdList,
  }));

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [delMainImgIdList, steDelMainImgIdList] = useState<Array<string>>([]); // 删除的主图文件id

  const onChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') return;
    setUploadLoading(true);
    const formData = new FormData();
    formData.set('file', file.originFileObj as File);
    try {
      const data = await uploadProductMainImg(formData);
      mainImgChange(data);
    } catch (e) {}
    setUploadLoading(false);
  };

  const onRemove = (info: IFileItem) => {
    mainImgChange(undefined);
    steDelMainImgIdList(list => {
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
          accept="image/*"
          listType="picture"
          fileList={(((mainImgData && [mainImgData]) || []) as Array<
            IMainImg
          >).map(
            (item: IMainImg) =>
              Object.assign({}, item, {
                thumbUrl: item.url,
                status: 'done',
                uid: item.id + '',
                size: 0,
                type: 'VIDEO',
              }) as IFileItem,
          )}
          isImageUrl={() => true}
          onRemove={(file: UploadFile) => {
            onRemove(file as IFileItem);
          }}
          onPreview={file => {
            onPreview(file as IFileItem);
          }}
          onChange={onChange}
        >
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </Spin>
    </div>
  );
};

export default MainImg;
