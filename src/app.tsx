/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 13:36:22
 * @LastEditTime: 2020-06-08 17:47:08
 * @FilePath: /koala_background_system/src/app.tsx
 */
import routerList from './routes';
import { IRoute } from 'umi';
import React from 'react';
import { StoreContext } from 'redux-react-hook';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

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
  if (!matchedRoutes[0]) return;
  const { meta } = matchedRoutes[0].route;
  document.title = meta?.title || 'KOALA 管理系统';
};

/**
 * 嵌套根组件
 * @param container 应用根组件
 */
export function rootContainer(container: any) {
  const ProviderContainer = React.createElement(
    StoreContext.Provider,
    { value: store },
    container,
  );
  const PrsistGateContainer = React.createElement(
    PersistGate,
    { loading: null, persistor },
    ProviderContainer,
  );
  return PrsistGateContainer;
}

export const render = (oldRender: any) => {
  oldRender();
};
