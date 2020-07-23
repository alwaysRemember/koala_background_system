/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-22 16:11:15
 * @LastEditTime: 2020-07-22 16:14:39
 * @FilePath: /koala_background_system/src/hooks/index.ts
 */
import { ICategoriesItem } from '@/pages/Categories/interface';
import { useState, useEffect } from 'react';
import { getUsingCategories } from '@/api';

/**
 * 获取可用的商品分类标签
 */
export const useGetUsingCategories = (): Array<ICategoriesItem> => {
  const [list, setList] = useState<Array<ICategoriesItem>>([]);
  const getData = async () => {
    try {
      const { list } = await getUsingCategories();
      setList(list);
    } catch (e) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return list;
};
