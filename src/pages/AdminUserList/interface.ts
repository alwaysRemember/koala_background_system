/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-15 17:46:47
 * @LastEditTime: 2020-06-15 17:54:19
 * @FilePath: /koala_background_system/src/pages/AdminUserList/interface.ts
 */

import { IUserData } from '../Login/interface';
import { EUserAuthSelectList } from '@/enums/UserAuthEnum';

export interface IAdminUserListResponse {
  totalPage: number;
  list: Array<IAdminUserItem>;
}

export interface IAdminUserItem extends IUserData {
  userId: number;
  userType: EUserAuthSelectList;
}

export interface IAdminUserListRequestParams {
  username: string;
  userType: EUserAuthSelectList;
  number: number; // 每页显示多少条数据
  page: number; // 页码
}
