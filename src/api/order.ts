import {
  IGetDataParams,
  IGetOrderListRequest,
  IGetOrderListResponse,
} from '@/pages/OrderList/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-12 14:13:46
 * @LastEditTime: 2020-10-12 14:19:46
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
