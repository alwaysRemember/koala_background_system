import React, { useState, useRef } from 'react';
import { Input, Button, Switch, InputNumber } from 'antd';
import styles from './index.less';
import { IBannerItem, IVideo } from './interface';
import { EProductStatus } from '@/enums/EProduct';
import CategoriesSelect from './components/CategoriesSelect';
import Editor from '@/components/Editor';
import { IEditor } from '@/components/Editor/interface';

/**
 *
 * @param param0 ?productId   产品id
 */
const AddProduct = ({
  location: {
    query: { productId },
  },
}: any) => {
  const [defaultBannerList, setDefaultBannerList] = useState<
    Array<IBannerItem>
  >([]); // 从后台获取的banner信息
  const [showBannerList, setShowBannerList] = useState<Array<IBannerItem>>([]); // banner显示列表
  const [addBannerList, setAddBannerList] = useState<Array<File>>([]); // 新增的banner图
  const [delBannerList, setDelBannerLiist] = useState<Array<number>>([]); // 删除的banner 存储字段为banner id

  const [defaultVideo, setDefaultVideo] = useState<IVideo>(); // 从后台获取的视频数据
  const [showVideo, setShowVideo] = useState<IVideo>(); // 视频显示数据
  const [addVideo, setAddVideo] = useState<File>(); // 新增的视频
  const [delVideo, setDelVideo] = useState<number>(); // 删除的视频 存储字段为video id

  const [name, setName] = useState<string>(''); // 产品名

  const [productStatus, setProductStatus] = useState<EProductStatus>(
    EProductStatus.PUT_ON_SHELF,
  ); // 产品状态  default = 上架

  const [categoriresId, setCategoriesId] = useState<number>(); // 产品所属类别
  const [productDetail, setProductDetail] = useState<string>(''); // 产品详情
  const [productBrief, setProductBrief] = useState<string>(''); // 产品简介
  const [productAmount, setProductAmount] = useState<number>(0); // 产品金额 分

  const editorRef = useRef<IEditor>();
  /**
   * 分类标题
   * @param param0
   */
  const ItemTitle = ({ text }: { text: string }) => (
    <div className={styles['item-title']}>{text}</div>
  );

  return (
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
            defaultValue={categoriresId}
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

      <div className={styles['product-editor']}>
        <Editor cref={editorRef} content={productDetail} />
      </div>
    </div>
  );
};

export default AddProduct;
