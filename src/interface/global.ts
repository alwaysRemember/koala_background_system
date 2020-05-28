/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 16:00:38
 * @LastEditTime: 2020-05-28 14:36:51
 * @FilePath: /koala_background_system/src/interface/global.ts
 */
import { IRoute } from 'umi';
import { EUserAuth } from '../enums/UserAuthEnum';

// 路由配置
export interface IRouteData extends IRoute {
  meta: {
    auth: EUserAuth; // 权限
    title: string; // 页面名称
  };
}
