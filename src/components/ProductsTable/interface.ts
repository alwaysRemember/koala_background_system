/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-28 14:37:47
 * @LastEditTime: 2020-07-29 18:28:29
 * @FilePath: /koala_background_system/src/components/ProductsTable/interface.ts
 */

import { ColumnsType } from 'antd/lib/table';
import { EProductStatus } from '@/enums/EProduct';
import { MutableRefObject } from 'react';

export interface IProductsTable {
  tableData: Array<IProductItem>;
  total: number;
  pageSize: number;
  page: number;
  pageChange: (page: number) => void;
  pageSizeChange: (pageSize: number) => void;
  columns?: ColumnsType<IProductItem>;
  cref: MutableRefObject<IProductsTableRef | undefined>;
  changeTable: () => void;
}

export interface IProductsTableRef {
  setLoading: (loading: boolean) => void;
}
export interface IProductItem {
  productId: string;
  productName: string;
  productMainImg: string;
  productStatus: EProductStatus;
  username: string;
  categoriesName: string;
  productAmount: number;
  productBrief: string;
  createTime: Date;
  updateTime: Date;
}
