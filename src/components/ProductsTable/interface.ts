/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-28 14:37:47
 * @LastEditTime: 2020-07-28 15:03:19
 * @FilePath: /koala_background_system/src/components/ProductsTable/interface.ts
 */

import { ColumnsType } from 'antd/lib/table';

export interface IProductsTable {
  tableData: Array<IProductItem>;
  total: number;
  pageSize: number;
  page: number;
  pageChange: (page: number) => void;
  pageSizeChange: (pageSize: number) => void;
  columns?: ColumnsType<IProductItem>;
  loading: boolean;
}
export interface IProductItem {
  productId: string;
  productName: string;
  username: string;
  categoriesName: string;
  productAmount: number;
  productBrief: string;
  createTime: Date;
  updateTime: Date;
}
