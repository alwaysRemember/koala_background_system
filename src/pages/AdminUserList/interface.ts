/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-15 17:46:47
 * @LastEditTime: 2020-06-18 14:16:03
 * @FilePath: /koala_background_system/src/pages/AdminUserList/interface.ts
 */

import { IUserData } from '../Login/interface';
import { EUserAuthSelectList } from '@/enums/UserAuthEnum';

export interface IAdminUserListResponse {
  total: number;
  list: Array<IAdminUserItem>;
}

export interface IAdminUserItem extends IUserData {
  userId: number;
  userType: EUserAuthSelectList;
  createTime?: Date;
  updateTime?: Date;
}

export interface IAdminUserListRequestDefaultParams {
  username: string;
  userType: EUserAuthSelectList;
}

export interface IAdminUserListRequestParams
  extends IAdminUserListRequestDefaultParams {
  number: number; // 每页显示多少条数据
  page: number; // 页码
}
