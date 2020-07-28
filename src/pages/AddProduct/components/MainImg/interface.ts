/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-28 16:51:51
 * @LastEditTime: 2020-07-28 17:27:00
 * @FilePath: /koala_background_system/src/pages/AddProduct/components/MainImg/interface.ts
 */

import { UploadFile } from 'antd/lib/upload/interface';

export interface IFileItem extends UploadFile {
  id: string;
}

export interface IMainImgRef {
  getDelMainImgIdList: () => Array<string>;
}
