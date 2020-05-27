/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:52:05
 * @LastEditTime: 2020-05-27 17:20:56
 * @FilePath: /backgorund_system/src/enums/UserAuthEnum.ts
 */

/**
 * 权限权重 ADMIN > PROXY > PUBLIC
 */
export enum EUserAuth {
  ADMIN = 999, // 管理员
  PROXY = 100, // 代理
  PUBLIC = 0, // 普通用户
}

