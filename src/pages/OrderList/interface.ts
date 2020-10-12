/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-25 14:14:21
 * @LastEditTime: 2020-10-12 15:43:35
 * @FilePath: /koala_background_system/src/pages/OrderList/interface.ts
 */
import { EDefaultSelect } from '@/components/SearchSelect/enums';
import { EOrderType } from './enum';

export interface IGetOrderListRequest extends IGetDataParams {
  page: number;
  pageSize: number;
}

export interface IGetDataParams {
  orderId: string;
  minOrderAmount: number;
  maxOrderAmount: number;
  minOrderCreateDate: string;
  maxOrderCreateDate: string;
  orderType: EOrderType | EDefaultSelect;
  userId: number | EDefaultSelect;
}

export interface IGetOrderListResponse {
  total: number;
  list: Array<IOrderItem>;
}

export interface IOrderItem {
  orderId: string;
  payAmount: number;
  orderType: EOrderType;
  createTime: Date;
  updateTime: Date;
  orderShopping: number;
  shoppingAddress: string;
}
