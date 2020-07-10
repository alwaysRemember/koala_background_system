/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-10 14:22:04
 * @LastEditTime: 2020-07-10 14:24:40
 * @FilePath: /koala_background_system/src/pages/AppletUsers/interface.ts
 */

export interface IAppletUsers {
  total: number;
  list: Array<IAppletUserItem>;
}

export interface IAppletUserItem {
  userId: number;
  nickName: number;
  avatarUrl: string;
  gender: number;
  country: string;
  province: string;
  city: string;
  createTime: Date;
  updateTime: Date;
}
