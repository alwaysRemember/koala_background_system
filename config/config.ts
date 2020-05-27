/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:36:36
 * @LastEditTime: 2020-05-27 16:58:00
 * @FilePath: /backgorund_system/config/config.ts
 */

import { IConfig } from 'umi-types';
import routes from './routes';
// ref: https://umijs.org/config/
const config: IConfig = {
  publicPath:"./",
  treeShaking: true,
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: true,
        title: 'backgorund_system',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};

export default config;
