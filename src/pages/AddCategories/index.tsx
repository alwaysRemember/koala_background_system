import React, { useState, useEffect } from 'react';
import { Input, Upload, Avatar, Switch, Button } from 'antd';

import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { createCategories } from '@/api';
const AddCategories = () => {
  const [name, setName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>(''); // 本地图片路径
  const [file, setFile] = useState<File>(); // 上传的图片
  const [isUse, setIsUse] = useState<boolean>(true); // 是否使用
  const [isSubmit, setIsSubmit] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * 上传文件选择
   * @param data
   */
  const uploadChange = ({ file }: UploadChangeParam) => {
    setFile(file.originFileObj as File);
  };

  /**
   * 删除文件
   */
  const deleteImg = () => {
    setFile(undefined);
  };

  /**
   * 数据提交
   */
  const submit = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.set('name', name);
    data.set('file', file as File);
    data.set('isUse', isUse ? 'on' : 'off');
    console.log(data);

    try {
      await createCategories(data);
      await window.message['success']('创建成功', 1);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (file) {
      // 创建本地预览链接
      const blob = new Blob([file]);
      setPreviewUrl(URL.createObjectURL(blob));
    } else {
      setPreviewUrl('');
    }
  }, [file]);

  // 监听数据改变操作
  useEffect(() => {
    setIsSubmit(!Boolean(file && name && isUse));
  }, [file, name, isUse]);

  return (
    <div className={styles['add-categories-wrapper']}>
      <div className={styles['categories-item']}>
        <span className={styles['label']}>名称</span>
        <Input
          className={styles['value']}
          value={name}
          onChange={e => {
            e.persist();
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles['categories-item']}>
        <span className={styles['label']}>图片</span>
        <div className={styles['value']}>
          <Upload
            accept="image/*"
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            onChange={uploadChange}
          >
            {previewUrl ? (
              <div
                className={styles['preview']}
                onClick={e => {
                  e.stopPropagation();
                  deleteImg();
                }}
              >
                <Avatar src={previewUrl} size={64} />
              </div>
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </div>
      </div>
      <div className={styles['categories-item']}>
        <span className={styles['label']}>是否使用</span>
        <div className={styles['value']}>
          <Switch
            checked={isUse}
            onChange={(checked: boolean) => setIsUse(checked)}
          />
        </div>
      </div>
      <Button
        type="primary"
        disabled={isSubmit}
        loading={isLoading}
        className={styles['submit']}
        onClick={submit}
      >
        提交
      </Button>
    </div>
  );
};

export default AddCategories;
