/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 16:00:38
 * @LastEditTime: 2020-07-20 14:45:43
 * @FilePath: /koala_background_system/src/interface/Global.ts
 */
import { IRoute } from 'umi';
import { Location } from 'history';
import { EUserAuth } from '../enums/UserAuthEnum';

// 路由配置
export interface IRouteData extends IRoute {
  meta?: {
    auth: EUserAuth; // 权限
    title: string; // 页面名称
  };
}

export interface IReduxAction<T> {
  type: string;
  data: T;
}

export interface ILocation<T> extends Location {
  query: T;
}
