/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:52:05
 * @LastEditTime: 2020-06-08 17:13:37
 * @FilePath: /koala_background_system/src/enums/UserAuthEnum.ts
 */

/**
 * 权限权重 ADMIN > PROXY > PUBLIC
 */
export enum EUserAuth {
  ADMIN = 999, // 管理员
  PROXY = 100, // 代理
  PUBLIC = 0, // 普通用户
}
