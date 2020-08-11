import React, { useState, MutableRefObject, useImperativeHandle } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Descriptions, Tooltip, Select, Spin, Upload } from 'antd';
import {
  IAddBannerModalRef,
  ISelectProductItem,
  IBannerImgItem,
} from './interface';
import styles from './index.less';
import {
  getProductByProductId,
  uploadBannerImg,
  removeAppletHomeBannerImg,
  appletHomeAddBanner,
} from '@/api';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { IFileItem } from './interface';
import { UploadFile } from 'antd/lib/upload/interface';

const AddBannerModal = ({
  cref,
}: {
  cref: MutableRefObject<IAddBannerModalRef | undefined>;
}) => {
  useImperativeHandle(cref, () => ({
    setVisible: type => setVisible(type),
  }));

  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const [productId, setProductId] = useState<string>();
  const [productList, setProductList] = useState<Array<ISelectProductItem>>([]);
  const [bannerImgList, setBannerImgList] = useState<Array<IBannerImgItem>>([]);

  let timer: NodeJS.Timeout;

  const cancel = () => {
    setVisible(false);
  };

  /**
   * 数据确认提交
   */
  const submit = async () => {
    if (!productId || !bannerImgList.length) {
      window.message.error('请正确填写数据');
      return;
    }
    setSubmitBtnLoading(true);

    try {
      await appletHomeAddBanner({
        productId,
        bannerImgId: bannerImgList[0].id,
      });
      window.message.success('新增成功', 1).then(() => {
        setProductId('');
        setBannerImgList([]);
      });
      setVisible(false);
    } catch (e) {}
    setSubmitBtnLoading(false);
  };

  /**
   * 根据产品id获取产品
   * @param productId
   */
  const getData = async (productId: string) => {
    if (!productId) return;
    setLoading(true);
    try {
      const list = await getProductByProductId({ productId });
      setProductList(list);
    } catch (e) {}
    setLoading(false);
  };

  /**
   * 选择框搜索
   * @param value  搜索的字段
   */
  const search = (value: string) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      getData(value);
    }, 500);
  };

  /**
   * 选择框->选中item
   * @param value
   */
  const change = (value: string) => {
    setProductId(value);
  };

  /**
   * 文件选中事件
   * @param param0
   */
  const uploadChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') return;
    setUploadLoading(true);
    const formData = new FormData();
    formData.set('file', file.originFileObj as File);
    try {
      const data = await uploadBannerImg(formData);
      setBannerImgList([data]);
    } catch (e) {}
    setUploadLoading(false);
  };

  /**
   * 删除banner
   * @param param0
   */
  const onRemoveFile = async ({ id }: IFileItem) => {
    setUploadLoading(true);

    try {
      await removeAppletHomeBannerImg({ id });
      setBannerImgList([]);
    } catch (e) {}
    setUploadLoading(false);
  };

  return (
    <Modal
      visible={visible}
      title="添加banner"
      onOk={submit}
      onCancel={cancel}
      footer={[
        <Button key="back" onClick={cancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitBtnLoading}
          onClick={submit}
        >
          确认
        </Button>,
      ]}
    >
      <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
        <Descriptions.Item label="选择商品" className={styles['content-item']}>
          <Tooltip placement="top" title="请输入商品ID，商品ID可从商品列表查询">
            <Select
              style={{ width: '100%' }}
              showSearch
              value={productId}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={search}
              onChange={change}
              notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
            >
              {productList.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  <p className={styles['product-name']}>{item.productName}</p>
                </Select.Option>
              ))}
            </Select>
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label="上传图片" className={styles['content-item']}>
          <Spin tip="正在上传中..." spinning={uploadLoading}>
            <Upload
              multiple
              onChange={uploadChange}
              fileList={bannerImgList.map(
                item =>
                  Object.assign({}, item, {
                    thumbUrl: item.url,
                    status: 'done',
                    uid: item.id + '',
                    size: 0,
                    type: 'IMAGE',
                  }) as IFileItem,
              )}
              onRemove={(info: UploadFile) => {
                onRemoveFile(info as IFileItem);
              }}
            >
              {!bannerImgList.length && (
                <Button>
                  <UploadOutlined /> Upload
                </Button>
              )}
            </Upload>
          </Spin>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default AddBannerModal;
