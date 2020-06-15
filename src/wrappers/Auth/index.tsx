import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { history } from 'umi';
import { IUserDataResponse } from '@/pages/Login/interface';

const Auth = (props: any) => {
  const { userInfo }: { userInfo: IUserDataResponse } = useMappedState(
    useCallback(state => state, []),
  );
  const { auth } = props.route.meta;

  // 如果数据为空证明未登录
  if (!Object.keys(userInfo).length) {
    history.replace('/login');
  }

  // 判断页面所需权限是否大于等于用户当前权限
  if (userInfo.userType < auth) {
    history.replace('/deniend');
  }

  return <>{props.children}</>;
};

export default Auth;
