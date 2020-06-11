/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:37:50
 * @LastEditTime: 2020-06-11 15:25:19
 * @FilePath: /koala_background_system/src/api/index.ts
 */
import http from '../axios';
import { IUserData, IUserDataResponse } from '@/pages/Login/interface';
import { IRequestData } from '@/pages/ChangePassword/interface';
import { IAddAdminData } from '@/pages/AddAdmin/interface';

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
