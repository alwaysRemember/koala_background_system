/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 13:36:22
 * @LastEditTime: 2020-05-28 15:56:39
 * @FilePath: /koala_background_system/config/config.ts
 */

import { defineConfig } from 'umi';
// import routes from '../src/routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: './',
  routes: [
    {
      path: '/',
      component: '@/pages/Home',
      meta: {
        title: 'koala',
        auth: 0,
      },
    },
  ],
  mock: {},
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
});
