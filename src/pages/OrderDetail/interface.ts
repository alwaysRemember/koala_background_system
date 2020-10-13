import { EOrderType } from '../OrderList/enum';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-12 16:38:13
 * @LastEditTime: 2020-10-13 17:39:44
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
  courierNum: string; // 快递单号
}
