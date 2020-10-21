/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-12 14:13:46
 * @LastEditTime: 2020-10-21 17:08:10
 * @FilePath: /koala_background_system/src/api/order.ts
 */
import {
  IOrderDetailResponse,
  IUpdateOrderLogisticsInfoParams,
  IUpdateOrderLogisticsInfoResponse,
} from '@/pages/OrderDetail/interface';
import {
  IGetDataParams,
  IGetOrderListRequest,
  IGetOrderListResponse,
} from '@/pages/OrderList/interface';
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

// 更新订单物流信息
export const updateOrderLogisticsInfo = (
  params: IUpdateOrderLogisticsInfoParams,
) =>
  http.request<IUpdateOrderLogisticsInfoResponse>({
    url: '/order/update-order-logistics-info',
    params,
    method: 'post',
    contentType: 'json',
  });

// 申请微信退款
export const returnOfGoods = (params: { orderId: string }) =>
  http.request({
    url: '/order/return-of-goods',
    params,
    method: 'post',
    contentType: 'json',
  });
