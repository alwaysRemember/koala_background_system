/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 15:07:30
 * @LastEditTime: 2020-07-23 15:20:30
 * @FilePath: /koala_background_system/src/components/CategoriesSelect/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { ICategoriesItem } from '@/pages/Categories/interface';
import { useGetUsingCategories } from '@/hooks';
import { EDefaultCategorie, EDefaultCategorieTransVal } from '@/enums/EProduct';
const CategoriesSelect = ({
  selectIdChange,
  defaultValue,
  isSearchSelect = false,
}: {
  isSearchSelect?: boolean; // 是否为搜索框中的筛选项
  selectIdChange: (id: string) => void;
  defaultValue?: undefined | string;
}) => {
  const list = useGetUsingCategories();
  const [data, setData] = useState<Array<ICategoriesItem>>([]);
  const [value, setValue] = useState<string>();

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
    if (defaultValue) {
      setValue(defaultValue);
    } else {
      if (isSearchSelect) {
        setValue(EDefaultCategorie.ALL);
      }
    }
  }, [defaultValue]);

  return (
    <Select
      loading={loading}
      value={value}
      onChange={(value: string) => setValue(value)}
      className={styles['select-wrapper']}
    >
      {/* 渲染默认的选择项 */}
      {isSearchSelect &&
        [...Object.values(EDefaultCategorie)].map((value: string) => (
          <Select.Option value={value} key={value}>
            {EDefaultCategorieTransVal[value as EDefaultCategorie]}
          </Select.Option>
        ))}
      {data.map((item: ICategoriesItem) => (
        <Select.Option value={item.id} key={item.id}>
          {item.categoriesName}
        </Select.Option>
      ))}
    </Select>
  );
};
export default CategoriesSelect;
