/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-19 14:23:48
 * @LastEditTime: 2020-08-19 18:22:21
 * @FilePath: /koala_background_system/src/pages/AddProduct/components/ProductConfigItem/interface.ts
 */

import { IProductConfigList } from '../../interface';

export interface IProductConfigItem {
  data: IProductConfigList;
  dataChange: (data: IProductConfigList) => void;
  removeProductConfig: () => void;
  removeProductConfigChildrenItem: (id: number) => void;
}
