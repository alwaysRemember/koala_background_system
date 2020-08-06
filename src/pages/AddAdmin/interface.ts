/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-11 14:35:30
 * @LastEditTime: 2020-08-06 15:47:22
 * @FilePath: /koala_background_system/src/pages/AddAdmin/interface.ts
 */

import { EUserAuth } from '@/enums/UserAuthEnum';

export interface IAddAdminData {
  username: string;
  password: string;
  email: string;
  userType: EUserAuth;
  appletUserId: number | undefined;
}

export interface IAppletUserItem {
  userId: number;
  phone: string;
  nickName: string;
}
