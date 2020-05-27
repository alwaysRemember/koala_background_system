/**
 * 修改props参数
 * @param props
 * @param param1
 */
export const modifyRouteProps = (props: any, { route }: any) => {
  const {
    meta: { title },
  } = route;

  // 设置页面名称
  document.title = title;

  return { ...props };
};
