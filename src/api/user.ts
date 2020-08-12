/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-12 17:55:20
 * @LastEditTime: 2020-08-12 18:01:52
 * @FilePath: /koala_background_system/src/api/user.ts
 */

import http from '../axios';
import { IAddAdminData } from '@/pages/AddAdmin/interface';
import {
  IAdminUserListRequestParams,
  IAdminUserListResponse,
  IAdminUserItem,
} from '@/pages/AdminUserList/interface';
import { ISelectUserItem } from '@/pages/ProductList/interface';
import { IBindAppletUser } from '@/pages/AdminUserList/components/BindAppletUserModal/interface';

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
 * 获取所有用户
 */
export const getAllUserList = () =>
  http.request<Array<ISelectUserItem>>({
    method: 'get',
    url: '/backend-user/get-all-user-list',
  });

/**
 * 关联管理员和小程序用户
 * @param params
 */
export const bindAppletUser = (params: IBindAppletUser) =>
  http.request({
    url: '/backend-user/bind-applet-user',
    params,
    method: 'post',
    contentType: 'json',
  });
