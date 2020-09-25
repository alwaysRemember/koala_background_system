/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-22 16:11:15
 * @LastEditTime: 2020-09-25 18:43:30
 * @FilePath: /koala_background_system/src/hooks/index.ts
 */
import { ICategoriesItem } from '@/pages/Categories/interface';
import { useState, useEffect, useCallback } from 'react';
import { getAllUserList, getUsingCategories } from '@/api';
import { ISelectUserItem } from './interface';
import { IUserDataResponse } from '@/pages/Login/interface';
import { EUserAuth } from '@/enums/UserAuthEnum';
import { useMappedState } from 'redux-react-hook';

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

export const useGetUserList = (): {
  isAdmin: boolean;
  userList: Array<ISelectUserItem>;
} => {
  const { userInfo }: { userInfo: IUserDataResponse } = useMappedState(
    useCallback(state => state, []),
  );

  const isAdmin: boolean = userInfo.userType === EUserAuth.ADMIN; // 是否为管理员

  const [list, setList] = useState<Array<ISelectUserItem>>([]);

  const getData = async () => {
    try {
      const list = await getAllUserList();
      setList(list);
    } catch (e) {}
  };
  useEffect(() => {
    isAdmin && getData();
  }, []);

  return {
    isAdmin,
    userList: list,
  };
};
