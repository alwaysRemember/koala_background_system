/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 16:00:38
 * @LastEditTime: 2020-05-27 16:03:34
 * @FilePath: /backgorund_system/src/interface/global.ts
 */
import { IRoute } from 'umi-types';
import { EUserAuth } from '../enums/UserAuthEnum';

// 路由配置
export interface IRouteData extends IRoute {
  meta: {
    auth: EUserAuth; // 权限
    title: string; // 页面名称
  };
}
