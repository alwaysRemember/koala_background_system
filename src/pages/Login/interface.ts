/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 18:40:28
 * @LastEditTime: 2020-05-28 16:04:05
 * @FilePath: /koala_background_system/src/pages/Login/interface.ts
 */

import { EUserAuth } from '@/enums/UserAuthEnum';

export interface IUserData {
  username: string;
  password: string;
}

export interface IUserDataResponse extends IUserData {
  token: string;
  auth: EUserAuth;
}
