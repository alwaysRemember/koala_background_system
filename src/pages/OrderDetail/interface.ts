import { EOrderRefundStatus, EOrderType } from '../OrderList/enum';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-12 16:38:13
 * @LastEditTime: 2020-10-26 16:13:23
 * @FilePath: /koala_background_system/src/pages/OrderDetail/interface.ts
 */
export interface IOrderDetailResponse {
  deliveryInfo: IOrderDetailDeliveryInfo; // 收货信息
  productList: Array<IOrderDetailProductItem>; // 产品列表
  logisticsInfo: null | IOrderLogisticsInfo;
  orderAmount: number; // 订单金额
  orderShopping: number; // 订单运费
  orderType: EOrderType;
  orderId: string;
  refundId: string; // 微信退款单号
  outRefundNo: string; // 商户退款单号
  refundStatus: EOrderRefundStatus; // 退款状态
  refundRecvAccount: string; // 退款入账账户
  refundSuccessTime: string; // 退款成功时间
}

export interface IExpressDataItem {
  context: string; // 快递当前信息
  time: string; // 格式化后的时间
}
export interface IOrderDetailDeliveryInfo {
  name: string;
  phone: string;
  area: string;
  address: string;
}

export interface IOrderDetailProductItem {
  productId: string;
  name: string;
  img: string;
  buyQuantity: number;
  amount: number;
  remark: string;
}

export interface IOrderLogisticsInfo {
  courierName: string; // 快递名称
  courierCode: string; // 快递代码
  courierNum: string; // 快递单号
  signStatus: string; // 快递签收状态
  expressData: Array<IExpressDataItem>; // 快递情况
}

export interface IShipModalConfirmMethodParams {
  code: string;
  num: string;
  name: string;
  isNeedExpress: boolean;
}

export interface IUpdateOrderLogisticsInfoParams
  extends IShipModalConfirmMethodParams {
  orderId: string;
}

export interface IUpdateOrderLogisticsInfoResponse {
  code: string;
  num: string;
  name: string;
  orderType: EOrderType;
}
