/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:37:50
 * @LastEditTime: 2020-07-06 18:18:03
 * @FilePath: /koala_background_system/src/api/index.ts
 */
import http from '../axios';
import { IUserData, IUserDataResponse } from '@/pages/Login/interface';
import { IRequestData } from '@/pages/ChangePassword/interface';
import { IAddAdminData } from '@/pages/AddAdmin/interface';
import {
  IAdminUserListRequestParams,
  IAdminUserListResponse,
  IAdminUserItem,
} from '@/pages/AdminUserList/interface';
import { ICategories, ICategoriesItem } from '@/pages/Categories/interface';

/**
 * 用户登录
 * @param params
 */
export const userLogin = (params: IUserData) =>
  http.request<IUserDataResponse>({
    url: '/backend-user/login',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 修改当前登录用户的密码
 * @param params
 */
export const changeUserPassword = (params: IRequestData) =>
  http.request({
    url: '/backend-user/change-password',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 添加代理
 * @param params
 */
export const addUser = (params: IAddAdminData) =>
  http.request({
    url: '/backend-user/add-user',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 获取代理列表数据
 * @param params
 */
export const getAdminUserList = (params: IAdminUserListRequestParams) =>
  http.request<IAdminUserListResponse>({
    url: '/backend-user/find-user-list',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 修改代理用户
 * @param params
 */
export const updateAdminUser = (params: IAdminUserItem) =>
  http.request({
    url: '/backend-user/update-admin-user',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 删除代理用户
 * @param params
 */
export const deleteAdminUser = (params: { userId: number }) =>
  http.request({
    url: '/backend-user/delete-admin-user',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 获取商品分类数据
 * @param params
 */
export const getCategoriesData = (params: { page: number }) =>
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
export const updateCategories = (params: ICategoriesItem) =>
  http.request({
    url: '/backend-categories/update-categories',
    method: 'post',
    params,
    contentType: 'json',
  });
