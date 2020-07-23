import React, { useState, useEffect } from 'react';
import { Descriptions, Button, Select } from 'antd';
import styles from './index.less';
import { ICategoriesItem } from '../Categories/interface';
import CategoriesSelect from '@/components/CategoriesSelect';
import { EProductSelectStatus, EProductStatusTransVal } from '@/enums/EProduct';

const ProductList = () => {
  // 搜索条件
  const [selectCategoriesId, setSelectCategoriesId] = useState<number>(); // 商品分类id
  const [productStatus, setProductStatus] = useState<EProductSelectStatus>(
    EProductSelectStatus.ALL,
  ); // 商品状态

  return (
    <div className={styles['product-list-wrapper']}>
      <div className={styles['search-wrapper']}>
        <Descriptions
          size="middle"
          column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
          layout="vertical"
        >
          <Descriptions.Item label="商品分类">
            <CategoriesSelect
              selectIdChange={(id: number) => setSelectCategoriesId(id)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="商品状态">
            <Select
              style={{ width: 200 }}
              value={productStatus}
              onChange={(status: EProductSelectStatus) =>
                setProductStatus(status)
              }
            >
              {[...Object.values(EProductSelectStatus)].map((value: string) => (
                <Select.Option key={value} value={value}>
                  {EProductStatusTransVal[value as EProductSelectStatus]}
                </Select.Option>
              ))}
            </Select>
          </Descriptions.Item>
          <Descriptions.Item label="商品分类">1</Descriptions.Item>
          <Descriptions.Item label="商品分类">2</Descriptions.Item>
          <Descriptions.Item>
            <Button type="primary" className={styles['btn']}>
              搜索
            </Button>
            <Button type="primary" className={styles['btn']}>
              重置
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default ProductList;
