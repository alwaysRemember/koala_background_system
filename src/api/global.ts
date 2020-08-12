/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-12 17:53:34
 * @LastEditTime: 2020-08-12 18:00:42
 * @FilePath: /koala_background_system/src/api/user.ts
 */
import { IUserData, IUserDataResponse } from '@/pages/Login/interface';
import http from '../axios';
import { IRequestData } from '@/pages/ChangePassword/interface';
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
