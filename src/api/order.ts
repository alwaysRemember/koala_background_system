import { IOrderDetailResponse } from '@/pages/OrderDetail/interface';
import {
  IGetDataParams,
  IGetOrderListRequest,
  IGetOrderListResponse,
} from '@/pages/OrderList/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-12 14:13:46
 * @LastEditTime: 2020-10-13 16:17:40
 * @FilePath: /koala_background_system/src/api/order.ts
 */
import http from '../axios';

// 获取订单列表
export const getOrderList = (params: IGetOrderListRequest) =>
  http.request<IGetOrderListResponse>({
    url: '/order/get-order-list',
    params,
    method: 'POST',
    contentType: 'json',
  });

// 获取订单详情
export const getOrderDetail = (params: { orderId: string }) =>
  http.request<IOrderDetailResponse>({
    url: '/order/get-order-detail',
    params,
    method: 'post',
    contentType: 'json',
  });
