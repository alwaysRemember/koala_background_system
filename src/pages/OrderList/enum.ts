/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-25 14:19:58
 * @LastEditTime: 2020-10-21 17:25:41
 * @FilePath: /koala_background_system/src/pages/OrderList/enum.ts
 */
export enum EOrderType {
  PENDING_PAYMENT = 'PENDING_PAYMENT', // 待付款
  TO_BE_DELIVERED = 'TO_BE_DELIVERED', // 待发货
  TO_BE_RECEIVED = 'TO_BE_RECEIVED', // 待收货
  REFUNDING = 'REFUNDING', // 退款中
  SUCCESS_RETURN = 'SUCCESS_RETURN', // 退款成功
  COMMENT = 'COMMENT', // 待评价
  FINISHED = 'FINISHED', // 已完结
  CANCEL = 'CANCEL', // 已取消
}

export enum EOrderTypeTransferVal {
  PENDING_PAYMENT = '待付款',
  TO_BE_DELIVERED = '待发货',
  TO_BE_RECEIVED = '待收货',
  SUCCESS_RETURN = '交易关闭',
  REFUNDING = '退款中',
  COMMENT = '待评价',
  FINISHED = '已完结',
  CANCEL = '已取消',
}

export enum EOrderTypeTransferColor {
  PENDING_PAYMENT = 'magenta',
  TO_BE_DELIVERED = 'cyan',
  TO_BE_RECEIVED = 'volcano',
  REFUNDING = 'volcano',
  SUCCESS_RETURN = 'volcano',
  COMMENT = 'orange',
  FINISHED = 'green',
  CANCEL = 'red',
}

export enum EOrderAmountSelectType {
  HUNDRED = '百',
  THOUSAND = '千',
  TEN_THOUSAND = '万',
  ONE_HUNDRED_THOUSAND = '十万',
}

// 订单退款状态
export enum EOrderRefundStatus {
  NULL = 'NULL',
  SUCCESS = 'SUCCESS', // 退款成功
  REFUNDCLOSE = 'REFUNDCLOSE', // 退款关闭
  PROCESSING = 'PROCESSING', // 退款处理中
  CHANGE = 'CHANGE', // 退款异常
}

// 订单退款资金来源
export enum EOrderRefundAccount {
  NULL = 'NULL', // 未进行退款
  REFUND_SOURCE_RECHARGE_FUNDS = 'REFUND_SOURCE_RECHARGE_FUNDS', // 可用余额退款/基本账户
  REFUND_SOURCE_UNSETTLED_FUNDS = 'REFUND_SOURCE_UNSETTLED_FUNDS', // 未结算资金退款
}
