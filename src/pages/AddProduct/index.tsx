import React, { useState, useRef } from 'react';
import { Input, Button, Switch, InputNumber, Upload } from 'antd';
import styles from './index.less';
import { EProductStatus } from '@/enums/EProduct';
import CategoriesSelect from './components/CategoriesSelect';
import Editor from '@/components/Editor';
import { IEditor } from '@/components/Editor/interface';
import { IBannerItem } from './interface';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import Banner from './components/Banner';
import { IBannerRef } from './components/Banner/interface';

/**
 *
 * @param param0 ?productId   产品id
 */
const AddProduct = ({
  location: {
    query: { productId },
  },
}: any) => {
  const [bannerList, setBannerList] = useState<Array<IBannerItem>>([]); // banner列表

  const [name, setName] = useState<string>(''); // 产品名
  const [productStatus, setProductStatus] = useState<EProductStatus>(
    EProductStatus.PUT_ON_SHELF,
  ); // 产品状态  default = 上架
  const [categoriresId, setCategoriesId] = useState<number>(); // 产品所属类别
  const [productDetail, setProductDetail] = useState<string>(''); // 产品详情
  const [productBrief, setProductBrief] = useState<string>(''); // 产品简介
  const [productAmount, setProductAmount] = useState<number>(0); // 产品金额 分

  const editorRef = useRef<IEditor>();
  const bannerRef = useRef<IBannerRef>();
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

      {/* 新增banner */}
      <div className={styles['add-product-item']}>
        <ItemTitle text="产品banner" />
        <Banner fileList={bannerList} cref={bannerRef} />
      </div>

      {/* 编辑器 */}
      <div className={styles['product-editor']}>
        <Editor cref={editorRef} content={productDetail} />
      </div>

      <div className={styles['button-wrapper']}>
        <Button type="primary" className={styles['submit']}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
