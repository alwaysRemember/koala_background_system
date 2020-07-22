/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 15:07:30
 * @LastEditTime: 2020-07-22 11:13:22
 * @FilePath: /koala_background_system/src/pages/AddProduct/components/CategoriesSelect/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { ICategoriesItem } from '@/pages/Categories/interface';
import { getUsingCategories } from '@/api';
const CategoriesSelect = ({
  selectIdChange,
  defaultValue,
}: {
  selectIdChange: (id: number) => void;
  defaultValue: undefined | number;
}) => {
  const [data, setData] = useState<Array<ICategoriesItem>>([]);
  const [value, setValue] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    setLoading(true);
    try {
      const { list } = await getUsingCategories();
      setData(data => data.concat(list));
      setLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

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
      {data.map((item: ICategoriesItem) => (
        <Select.Option value={item.id} key={item.id}>
          {item.categoriesName}
        </Select.Option>
      ))}
    </Select>
  );
};
export default CategoriesSelect;
