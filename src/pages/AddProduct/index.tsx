import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import { Input, Button, Switch, InputNumber, Spin } from 'antd';
import styles from './index.less';
import { EProductStatus } from '@/enums/EProduct';
import Editor from './components/Editor';
import { IEditor } from './components/Editor/interface';
import { IBannerItem, IVideo, IProduct } from './interface';
import Banner from './components/Banner';
import { IBannerRef } from './components/Banner/interface';
import Video from './components/Video';
import { IVideoRef } from './components/Video/interface';
import { uploadProduct, getProductDetail } from '@/api';
import CategoriesSelect from '@/components/CategoriesSelect';

/**
 *
 * @param param0 ?productId   产品id
 */
const AddProduct = ({
  location: {
    query: { productId },
  },
}: any) => {
  if (!!productId) {
    document.title = '修改商品详情';
  }
  const [bannerList, setBannerList] = useState<Array<IBannerItem>>([]); // banner列表
  const [videoData, setVideoData] = useState<IVideo>(); // 产品视频

  const [name, setName] = useState<string>(''); // 产品名
  const [productStatus, setProductStatus] = useState<EProductStatus>(
    EProductStatus.PUT_ON_SHELF,
  ); // 产品状态  default = 上架
  const [categoriesId, setCategoriesId] = useState<number>(); // 产品所属类别
  const [productDetail, setProductDetail] = useState<string>(''); // 产品详情
  const [productBrief, setProductBrief] = useState<string>(''); // 产品简介
  const [productAmount, setProductAmount] = useState<number>(0); // 产品金额 分

  const [isLoading, setIsLoading] = useState<boolean>(!!productId);
  const [spinTip, setSpinTip] = useState<string>('数据请求中');

  const editorRef = useRef<IEditor>();
  const bannerRef = useRef<IBannerRef>();
  const videoRef = useRef<IVideoRef>();

  /**
   * 分类标题
   * @param param0
   */
  const ItemTitle = ({ text }: { text: string }) => (
    <div className={styles['item-title']}>{text}</div>
  );

  const getData = async () => {
    try {
      const {
        name,
        productStatus,
        categoriesId,
        amount,
        productBrief,
        productDetail,
        bannerList,
        videoData,
      } = await getProductDetail({
        productId,
      });
      setBannerList(bannerList);
      setVideoData(videoData);
      setName(name);
      setProductStatus(productStatus);
      setCategoriesId(categoriesId);
      setProductDetail(productDetail);
      setProductBrief(productBrief);
      setProductAmount(amount);
      setIsLoading(false);
    } catch (e) {}
  };

  const submit = async () => {
    setSpinTip('商品信息上传中');
    setIsLoading(true);
    let params: IProduct = {
      name,
      productStatus,
      categoriesId: categoriesId as number,
      amount: productAmount,
      productBrief,
      productDetail: editorRef.current?.getValue() || '',
      mediaIdList: editorRef.current?.getMediaList() || [],
      delMediaIdList: editorRef.current?.getDelMediaList() || [],
      bannerIdList: bannerRef.current?.getBannerIdList() || [],
      delBannerIdList: bannerRef.current?.getDelBannerIdList() || [],
      videoId: videoData?.id,
      delVideoIdList: videoRef.current?.getDelVideoIdList() || [],
    };

    if (productId) {
      params.productId = productId;
    }
    try {
      await uploadProduct(params);
      setIsLoading(false);
      await window.message.success(productId ? '修改商品成功' : '添加商品成功');
      history.go(-1);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    productId && getData();
  }, []);

  return (
    <Spin tip={spinTip} spinning={isLoading}>
      <div className={styles['add-product-wrapper']}>
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品名称" />
          <div className={styles['product-item-value']}>
            <Input
              placeholder="请输入产品名称"
              value={name}
              onChange={e => {
                e.persist();
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品金额 (分)" />
          <div className={styles['prodcut-item-value']}>
            <InputNumber
              style={{
                width: '300px',
              }}
              step={10}
              value={Boolean(productAmount) ? productAmount : undefined}
              onChange={(value: number | string | undefined) =>
                setProductAmount(Number(value))
              }
            />
          </div>
        </div>

        <div className={styles['add-product-item']}>
          <ItemTitle text="产品类型" />
          <div className={styles['prodcut-item-value']}>
            <CategoriesSelect
              defaultValue={categoriesId}
              selectIdChange={id => setCategoriesId(id)}
            />
          </div>
        </div>

        <div className={styles['add-product-item']}>
          <ItemTitle text="产品状态" />
          <div className={styles['product-item-value']}>
            {productStatus === EProductStatus.UNDER_REVIEW ? (
              <Button type="dashed" size="middle" disabled>
                审核中
              </Button>
            ) : (
              <Switch
                checkedChildren="上架"
                unCheckedChildren="下架"
                checked={productStatus === EProductStatus.PUT_ON_SHELF}
                onChange={(checked: boolean) =>
                  setProductStatus(
                    checked
                      ? EProductStatus.PUT_ON_SHELF
                      : EProductStatus.OFF_SHELF,
                  )
                }
              />
            )}
          </div>
        </div>

        <div className={styles['add-product-item']}>
          <ItemTitle text="产品简介" />
          <div className={styles['product-item-value']}>
            <Input.TextArea
              rows={4}
              value={productBrief}
              onChange={e => {
                e.persist();
                setProductBrief(e.target.value);
              }}
            />
          </div>
        </div>

        {/* 新增banner */}
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品banner" />
          <Banner fileList={bannerList} cref={bannerRef} />
        </div>

        {/* 新增视频 */}
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品视频" />
          <Video
            cref={videoRef}
            videoData={videoData}
            videoChange={(data: IVideo | undefined) => setVideoData(data)}
          />
        </div>

        {/* 编辑器 */}
        <div className={styles['product-editor']}>
          <Editor cref={editorRef} content={productDetail} />
        </div>

        <div className={styles['button-wrapper']}>
          <Button type="primary" className={styles['submit']} onClick={submit}>
            提交
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default AddProduct;
