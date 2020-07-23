/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 15:07:30
 * @LastEditTime: 2020-07-23 14:35:20
 * @FilePath: /koala_background_system/src/components/CategoriesSelect/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { ICategoriesItem } from '@/pages/Categories/interface';
import { getUsingCategories } from '@/api';
import { useGetUsingCategories } from '@/hooks';
const CategoriesSelect = ({
  selectIdChange,
  defaultValue,
  isSearchSelect = false,
}: {
  isSearchSelect: boolean; // 是否为搜索框中的筛选项
  selectIdChange: (id: number) => void;
  defaultValue?: undefined | number;
}) => {
  const list = useGetUsingCategories();
  const [data, setData] = useState<Array<ICategoriesItem>>([]);
  const [value, setValue] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (list.length) {
      setData(list);
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    value && selectIdChange(value);
  }, [value]);

  useEffect(() => {
    defaultValue && setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Select
      loading={loading}
      value={value}
      onChange={(value: number) => setValue(value)}
      className={styles['select-wrapper']}
    >
      {isSearchSelect && (
        <Select.Option value={'ALL'} key={'ALL'}>
          全部
        </Select.Option>
      )}
      {data.map((item: ICategoriesItem) => (
        <Select.Option value={item.id} key={item.id}>
          {item.categoriesName}
        </Select.Option>
      ))}
    </Select>
  );
};
export default CategoriesSelect;
