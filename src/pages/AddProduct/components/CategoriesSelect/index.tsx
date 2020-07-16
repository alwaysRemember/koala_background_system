/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 15:07:30
 * @LastEditTime: 2020-07-14 17:28:49
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

  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(true);
  const [isRequest, setIsRequest] = useState<boolean>(true);

  const getData = async () => {
    setLoading(true);
    try {
      const { total, list } = await getUsingCategories({ page, pageSize });
      setTotalPage(Math.ceil(total / pageSize));
      setData(data => data.concat(list));

      // 请求完毕判断是否为最后一次请求
      page >= total && setIsRequest(false);
      setLoading(false);
    } catch (e) {}
  };

  const onPopupScroll = (e: any) => {
    e.persist();
    const {
      target: { scrollTop, offsetHeight, scrollHeight },
    } = e;
    if (scrollTop + offsetHeight >= scrollHeight && page < totalPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    isRequest && getData();
  }, [page]);

  useEffect(() => {
    value && selectIdChange(value);
  }, [value]);

  return (
    <Select
      loading={loading}
      defaultValue={defaultValue}
      value={value}
      onChange={(value: number) => setValue(value)}
      className={styles['select-wrapper']}
      onPopupScroll={onPopupScroll}
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
