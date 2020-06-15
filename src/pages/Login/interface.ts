/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 18:40:28
 * @LastEditTime: 2020-06-15 17:48:44
 * @FilePath: /koala_background_system/src/pages/Login/interface.ts
 */

import { EUserAuth } from '@/enums/UserAuthEnum';

export interface IUserData {
  username: string;
  password?: string;
}

export interface IUserDataResponse extends IUserData {
  token: string;
  userType: EUserAuth;
}
