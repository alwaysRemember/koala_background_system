import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import { Input, Button, Switch, InputNumber, Spin, Descriptions } from 'antd';
import styles from './index.less';
import { EProductStatus } from '@/enums/EProduct';
import Editor from './components/Editor';
import { IEditor } from './components/Editor/interface';
import {
  IBannerItem,
  IVideo,
  IProduct,
  IMainImg,
  IProductParameter,
  IProductConfig,
  IProductConfigList,
} from './interface';
import Banner from './components/Banner';
import { IBannerRef } from './components/Banner/interface';
import { IVideoRef } from './components/Video/interface';
import { uploadProduct, getProductDetail, updateProductStatus } from '@/api';
import CategoriesSelect from '@/components/CategoriesSelect';
import Video from './components/Video';
import MainImg from './components/MainImg';
import { IMainImgRef } from './components/MainImg/interface';
import { setClassName } from '@/utils';
import ProductParameterItem from './components/ProductParameterItem';
import ProductConfigItem from './components/ProductConfigItem';
import CitySelect from './components/CitySelect';

/**
 *
 * @param param0 ?productId   产品id
 */
const AddProduct = ({
  location: {
    query: { productId, review },
  },
}: any) => {
  if (!!productId) {
    document.title = '修改商品详情';
  }
  review = !!review; // 判断是否为只读
  const [bannerList, setBannerList] = useState<Array<IBannerItem>>([]); // banner列表
  const [videoData, setVideoData] = useState<IVideo>(); // 产品视频
  const [mainImg, setMainImg] = useState<IMainImg | undefined>(); // 产品主图

  const [name, setName] = useState<string>(''); // 产品名
  const [productStatus, setProductStatus] = useState<EProductStatus>(
    EProductStatus.PUT_ON_SHELF,
  ); // 产品状态  default = 上架
  const [productType, setProductType] = useState<boolean>(true); // 是否属于7天无理由退款产品
  const [categoriesId, setCategoriesId] = useState<string>(); // 产品所属类别
  const [productDetail, setProductDetail] = useState<string>(''); // 产品详情
  const [productBrief, setProductBrief] = useState<string>(''); // 产品简介
  const [productAmount, setProductAmount] = useState<number>(0); // 产品金额 分
  const [productCostAmount, setProductConstAmount] = useState<number>(0); // 产品成本金额
  const [productConfigList, setProductConfigList] = useState<
    Array<IProductConfigList>
  >([]); // 产品配置
  const [productDeliveryCity, setProductDeliveryCity] = useState<string>(''); // 产品发货地
  const [productShipping, setProductShipping] = useState<number>(0); // 产品运费

  const [productParameterList, setProductParameterList] = useState<
    Array<IProductParameter>
  >([]); // 产品参数

  const [productConfigDelList, setProductConfigDelList] = useState<
    Array<number>
  >([]); // 删除的产品配置

  const [isLoading, setIsLoading] = useState<boolean>(!!productId);
  const [spinTip, setSpinTip] = useState<string>('数据请求中');

  const editorRef = useRef<IEditor>();
  const bannerRef = useRef<IBannerRef>();
  const videoRef = useRef<IVideoRef>();
  const mainImgRef = useRef<IMainImgRef>();

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
        mainImg,
        productType,
        productParameter,
        productConfigList,
        productDeliveryCity,
        productShipping,
        costAmount,
      } = await getProductDetail({
        productId,
      });
      setBannerList(bannerList);
      setVideoData(videoData);
      setProductType(productType);
      setName(name);
      setProductStatus(productStatus);
      setCategoriesId(categoriesId);
      setProductDetail(productDetail);
      setProductBrief(productBrief);
      setProductAmount(amount);
      setProductConstAmount(costAmount);
      setMainImg(mainImg);
      setProductParameterList(productParameter);
      setProductConfigList(_formatProductConfigList(productConfigList));
      setProductDeliveryCity(productDeliveryCity);
      setProductShipping(productShipping);
    } catch (e) {}
    setIsLoading(false);
  };

  const submit = async () => {
    const productDetail = editorRef.current?.getValue() || '';
    const bannerIdList = bannerRef.current?.getBannerIdList() || [];
    if (
      !name ||
      !categoriesId ||
      !productAmount ||
      !productBrief ||
      !productDetail ||
      !productDetail ||
      !bannerIdList.length ||
      !videoData ||
      !mainImg ||
      !productDeliveryCity ||
      !productCostAmount
    ) {
      window.message.error('请填写商品必须的参数');
      return;
    }
    setSpinTip('商品信息上传中');
    setIsLoading(true);
    const transferProductConfigList = productConfigList.reduce(
      (prev: Array<IProductConfig>, value: IProductConfigList) => {
        // 给每一项绑定当前的分类名
        value.list.forEach(item => {
          item.categoryName = value.title;
        });
        return [...prev, ...value.list];
      },
      [],
    );
    let params: IProduct = {
      name,
      productStatus,
      productType,
      categoriesId: categoriesId as string,
      amount: productAmount,
      costAmount: productCostAmount,
      productBrief,
      productDetail,
      mediaIdList: editorRef.current?.getMediaList() || [],
      delMediaIdList: editorRef.current?.getDelMediaList() || [],
      bannerIdList,
      delBannerIdList: bannerRef.current?.getDelBannerIdList() || [],
      videoId: videoData.id,
      delVideoIdList: videoRef.current?.getDelVideoIdList() || [],
      mainImgId: mainImg.id,
      delMainImgIdList: mainImgRef.current?.getDelMainImgIdList() || [],
      productParameter: productParameterList.filter(
        item => item.key && item.value,
      ),
      productConfigList: transferProductConfigList.filter(
        item => item.name && item.amount >= 0,
      ),
      productConfigDelList: transferProductConfigList
        .filter(item => item.id && !item.name && item.amount <= 0)
        .map(item => item.id as number),
      productDeliveryCity,
      productShipping,
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

  /**
   * 修改产品状态
   * @param productStatus
   */
  const changeProductStatus = async (
    productStatus: EProductStatus.OFF_SHELF | EProductStatus.PUT_ON_SHELF,
  ) => {
    setIsLoading(true);
    try {
      await updateProductStatus({ productId, productStatus });
      setIsLoading(false);
      await window.message.success('已更新商品状态');
      history.go(-1);
    } catch (e) {}
  };

  /**
   * 产品参数输入框失焦事件
   * @param data
   * @param index
   */
  const productParameterItemOnBlur = (
    data: IProductParameter,
    index: number,
  ) => {
    setProductParameterList(prev => {
      const list = JSON.parse(JSON.stringify(prev));
      list[index] = data;
      return list;
    });
  };

  /**
   * 删除对应的下标配置
   * @param index
   */
  const removeProductParameter = (index: number) => {
    const list = JSON.parse(JSON.stringify(productParameterList));
    list.splice(index, 1);
    setProductParameterList(list);
  };

  /**
   * 产品配置数据改变
   * @param data
   * @param index
   */
  const productConfigItemDataChange = (
    data: IProductConfigList,
    index: number,
  ) => {
    const list = JSON.parse(JSON.stringify(productConfigList));
    list[index] = data;
    setProductConfigList(list);
  };

  /**
   * 删除产品配置
   * @param index
   */
  const removeProductConfig = (index: number) => {
    const list = JSON.parse(JSON.stringify(productConfigList));
    setProductConfigDelList(prev =>
      prev.concat(
        productConfigList[index].list
          .filter(item => item.id)
          .map(item => item.id as number),
      ),
    );
    list.splice(index, 1);
    setProductConfigList(list);
  };

  /**
   * 组合商品配置数组
   * @param data
   */
  const _formatProductConfigList = (
    data: Array<IProductConfig>,
  ): Array<IProductConfigList> =>
    data.reduce((prev: Array<IProductConfigList>, current: IProductConfig) => {
      let index: number = -1;
      // 判断是否已存在当前的分类
      prev.some((item, i) => {
        if (item.title === current.categoryName) {
          index = i;
        }
      });

      if (index === -1) {
        prev.push({
          title: current.categoryName,
          list: [current],
        });
      } else {
        prev[index].list = prev[index].list.concat([current]);
      }
      return prev;
    }, []);

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
              disabled={review}
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
          <ItemTitle text="产品类型" />
          <div className={styles['prodcut-item-value']}>
            <CategoriesSelect
              disabled={review}
              defaultValue={categoriesId}
              selectIdChange={id => setCategoriesId(id)}
            />
          </div>
        </div>
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品金额 (分)" />
          <div className={styles['prodcut-item-value']}>
            <InputNumber
              disabled={review}
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
          <ItemTitle text="产品成本金额 (分)" />
          <div className={styles['prodcut-item-value']}>
            <InputNumber
              disabled={review}
              style={{
                width: '300px',
              }}
              step={10}
              value={Boolean(productCostAmount) ? productCostAmount : undefined}
              onChange={(value: number | string | undefined) =>
                setProductConstAmount(Number(value))
              }
            />
          </div>
        </div>
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品运费 (分,默认0)" />
          <div className={styles['prodcut-item-value']}>
            <InputNumber
              disabled={review}
              style={{
                width: '300px',
              }}
              step={10}
              value={productShipping}
              onChange={(value: number | string | undefined) =>
                setProductShipping(Number(value))
              }
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
              disabled={review}
              rows={4}
              value={productBrief}
              onChange={e => {
                e.persist();
                setProductBrief(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles['add-product-item']}>
          <ItemTitle text="发货地点" />
          <div className={styles['product-item-value']}>
            <CitySelect
              value={productDeliveryCity}
              onChange={value => {
                setProductDeliveryCity(value.join(','));
              }}
            />
          </div>
        </div>

        <div className={styles['add-product-item']}>
          <ItemTitle text="是否属于7天无理由退款产品" />
          <div className={styles['prodcut-item-value']}>
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              checked={productType}
              onChange={(checked: boolean) => setProductType(checked)}
            />
          </div>
        </div>

        {/* 新增banner */}
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品banner" />
          <Banner disabled={review} fileList={bannerList} cref={bannerRef} />
        </div>

        {/* 新增视频 */}
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品视频" />
          <Video
            disabled={review}
            cref={videoRef}
            videoData={videoData}
            videoChange={(data: IVideo | undefined) => setVideoData(data)}
          />
        </div>

        {/* 产品主图 */}
        <div className={styles['add-product-item']}>
          <ItemTitle text="产品主图" />
          <MainImg
            disabled={review}
            cref={mainImgRef}
            mainImgData={mainImg}
            mainImgChange={(data: IMainImg | undefined) => setMainImg(data)}
          />
        </div>

        <div
          className={setClassName([
            styles['add-product-item'],
            styles['width-100'],
          ])}
        >
          <ItemTitle text="产品参数" />
          <div className={styles['product-parameter-wrapper']}>
            {productParameterList.map(({ value, key }, index) => (
              <ProductParameterItem
                key={index}
                label={key}
                value={value}
                index={index}
                onChange={productParameterItemOnBlur}
                removeProductParameter={removeProductParameter}
              />
            ))}
            <div className={styles['product-parameter-item']}>
              <Button
                type="primary"
                onClick={() =>
                  setProductParameterList(prev =>
                    prev.concat([{ key: '', value: '' }]),
                  )
                }
              >
                添加产品参数
              </Button>
            </div>
          </div>
        </div>

        <div
          className={setClassName([
            styles['add-product-item'],
            styles['width-100'],
          ])}
        >
          <ItemTitle text="产品配置" />
          <div className={styles['product-parameter-wrapper']}>
            {productConfigList.map((data, index) => (
              <ProductConfigItem
                key={index}
                data={data}
                dataChange={data => productConfigItemDataChange(data, index)}
                removeProductConfig={() => removeProductConfig(index)}
                removeProductConfigChildrenItem={id =>
                  setProductConfigDelList(prev => prev.concat([id]))
                }
              />
            ))}
            <div className={styles['product-parameter-item']}>
              <Button
                type="primary"
                onClick={() =>
                  setProductConfigList(prev =>
                    prev.concat([
                      {
                        title: '',
                        list: [],
                      },
                    ]),
                  )
                }
              >
                添加产品配置
              </Button>
            </div>
          </div>
        </div>

        {/* 编辑器 */}
        <div className={styles['product-editor']}>
          <ItemTitle text="产品详情" />
          <Editor disabled={review} cref={editorRef} content={productDetail} />
        </div>

        <div className={styles['button-wrapper']}>
          {(!review && (
            <Button
              type="primary"
              className={styles['submit']}
              onClick={submit}
            >
              提交
            </Button>
          )) || (
            <>
              <Button
                type="primary"
                className={styles['submit']}
                onClick={() => changeProductStatus(EProductStatus.PUT_ON_SHELF)}
              >
                审核通过
              </Button>
              <Button
                type="primary"
                danger
                className={styles['submit']}
                onClick={() => changeProductStatus(EProductStatus.OFF_SHELF)}
              >
                审核拒绝
              </Button>
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default AddProduct;
