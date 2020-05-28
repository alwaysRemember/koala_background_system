/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 13:36:22
 * @LastEditTime: 2020-05-28 14:44:34
 * @FilePath: /koala_background_system/src/app.tsx
 */
import routerList from './routes';
import { IRoute } from 'umi';

/**
 * 动态添加路由
 * @param param0
 */
export const patchRoutes = ({ routes }: { routes: Array<IRoute> }) => {
  routerList.map((route: IRoute) => {
    routes.push(route);
  });
};

/**
 * 路由切换
 * @param param0
 */
export const onRouteChange = ({ matchedRoutes }: { matchedRoutes: any }) => {
  const {
    meta: { title },
  } = matchedRoutes[0].route;
  document.title = title;
};
