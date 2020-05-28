/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:37:50
 * @LastEditTime: 2020-05-28 15:54:10
 * @FilePath: /koala_background_system/src/api/index.ts
 */
import http from '../axios';
import { IUserData, IUserDataResponse } from '@/pages/Login/interface';

/**
 * 用户登录
 * @param params
 */
export const userLogin = (params: IUserData) =>
  http.request<IUserDataResponse>({
    url: '/user/login',
    method: 'post',
    params,
    contentType: 'json',
  });
