/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-12 17:56:20
 * @LastEditTime: 2020-08-12 17:57:56
 * @FilePath: /koala_background_system/src/api/categories.ts
 */

import http from '../axios';
import {
  ICategories,
  IUpdateCategories,
  ICategoriesItem,
} from '@/pages/Categories/interface';

/**
 * 获取商品分类数据
 * @param params
 */
export const getCategoriesData = (params: { page: number; pageSize: number }) =>
  http.request<ICategories>({
    url: '/backend-categories/get-categories',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 更新商品分类数据
 * @param params
 */
export const updateCategories = (params: IUpdateCategories) =>
  http.request({
    url: '/backend-categories/update-categories',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 创建商品分类标签
 * @param params
 */
export const createCategories = (params: FormData) =>
  http.request({
    url: '/backend-categories/add-categories',
    method: 'post',
    params,
    contentType: 'formData',
  });

/**
 * 获取使用中的产品标签
 * @param params
 */
export const getUsingCategories = () =>
  http.request<{ list: Array<ICategoriesItem> }>({
    method: 'get',
    url: '/backend-categories/get-using-categories',
    contentType: 'json',
  });
