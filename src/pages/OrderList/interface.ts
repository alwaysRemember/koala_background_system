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
