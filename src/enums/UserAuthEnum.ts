/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:52:05
 * @LastEditTime: 2020-06-15 17:52:04
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

export enum EUserAuthSelectList {
  ADMIN = 999, // 管理员
  PROXY = 100, // 代理
  ALL = -1, // 全部
}
