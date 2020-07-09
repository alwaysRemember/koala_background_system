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
  if (
    !Object.keys(userInfo).length ||
    (!userInfo.token && !userInfo.username)
  ) {
    history.replace('/login');
  } else if (userInfo.userType < auth) {
    // 判断页面所需权限是否大于等于用户当前权限
    history.replace('/deniend');
  } else {
    return <>{props.children}</>;
  }

  return '';
};

export default Auth;
