/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 13:36:22
 * @LastEditTime: 2020-12-08 14:56:59
 * @FilePath: /koala_background_system/config/config.ts
 */

import { defineConfig } from 'umi';
// import routes from '../src/routes';
export default defineConfig({
  path: '/system',
  nodeModulesTransform: {
    type: 'none',
  },
  // publicPath: './',
  routes: [
    {
      path: '/',
      component: '@/pages/Home',
      meta: {
        title: 'koala',
        auth: 0,
      },
      redirect: '/server',
    },
  ],
  hash: true,
  mock: false,
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
});
