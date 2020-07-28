/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-23 15:30:19
 * @LastEditTime: 2020-07-24 16:09:28
 * @FilePath: /koala_background_system/src/pages/ProductList/interface.ts
 */

import { EProductStatus } from '@/enums/EProduct';
import { EDefaultSelect } from './components/SearchSelect/enums';

export interface ISelectUserItem {
  userId: number;
  username: string;
}

export interface IRequestProduct {
  categoriesId: string;
  productStatus: EProductStatus | EDefaultSelect;
  userId: EDefaultSelect | number;
  minAmount: number;
  maxAmount: number;
  page: number;
  pageSize: number;
}
