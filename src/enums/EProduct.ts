/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:25:23
 * @LastEditTime: 2020-07-23 14:22:23
 * @FilePath: /koala_background_system/src/enums/EProduct.ts
 */

/**
 * 产品状态
 */
export enum EProductStatus {
  OFF_SHELF = 'OFF_SHELF', // 下架
  UNDER_REVIEW = 'UNDER_REVIEW', // 审核中
  PUT_ON_SHELF = 'PUT_ON_SHELF', // 上架
}

export enum EProductStatusTransVal {
  OFF_SHELF = '下架',
  UNDER_REVIEW = '审核中',
  PUT_ON_SHELF = '上架',
  ALL = '全部',
}

export enum EProductSelectStatus {
  OFF_SHELF = 'OFF_SHELF', // 下架
  UNDER_REVIEW = 'UNDER_REVIEW', // 审核中
  PUT_ON_SHELF = 'PUT_ON_SHELF', // 上架
  ALL = 'ALL', // 全部
}
