/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-25 14:19:58
 * @LastEditTime: 2020-09-25 16:15:21
 * @FilePath: /koala_background_system/src/pages/OrderList/enum.ts
 */
export enum EOrderType {
  PENDING_PAYMENT = 'PENDING_PAYMENT', // 待付款
  TO_BE_DELIVERED = 'TO_BE_DELIVERED', // 待发货
  TO_BE_RECEIVED = 'TO_BE_RECEIVED', // 待收货
  COMMENT = 'COMMENT', // 待评价
  FINISHED = 'FINISHED', // 已完结
  CANCEL = 'CANCEL', // 已取消
}

export enum EOrderTypeTransferVal {
  PENDING_PAYMENT = '待付款',
  TO_BE_DELIVERED = '待发货',
  TO_BE_RECEIVED = '待收货',
  COMMENT = '待评价',
  FINISHED = '已完结',
  CANCEL = '已取消',
}

export enum EOrderAmountSelectType {
  HUNDRED = '百',
  THOUSAND = '千',
  TEN_THOUSAND = '万',
  ONE_HUNDRED_THOUSAND = '十万',
}
