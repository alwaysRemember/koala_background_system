/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:25:23
 * @LastEditTime: 2020-07-23 17:00:48
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
}

export enum EDefaultCategorie {
  ALL = 'ALL',
}

export enum EDefaultCategorieTransVal {
  ALL = '全部',
}
