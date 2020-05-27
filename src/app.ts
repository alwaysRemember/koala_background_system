/**
 * 修改props参数
 * @param props
 * @param param1
 */
export const modifyRouteProps = (props: any, { route }: any) => {
  const { meta } = route;

  // 设置页面名称
  document.title = meta?.title || 'koala后台管理系统';

  return { ...props };
};
