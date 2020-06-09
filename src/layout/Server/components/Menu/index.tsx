import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { history } from 'umi';
import './index.less';
import { IMenuItem, ISubMenuItem } from '../../interface';
import { menuList } from '../../menuData';

const { SubMenu, Item } = Menu;
const MenuCom = ({ menuClick }: { menuClick?: () => void }) => {
  const {
    location: { pathname },
  } = history;

  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([pathname]); // 当前的菜单项

  /**
   * 菜单项
   * @param data
   */
  const MenuItem = (data: IMenuItem) => (
    <Menu.Item key={data.path}>{data.menuTitle}</Menu.Item>
  );

  /**
   * 菜单组
   * @param data
   */
  const SubMenuCom = (data: ISubMenuItem) => (
    <SubMenu key={data.key} title={data.subMenuTitle}>
      {data.children.map((item: IMenuItem) => MenuItem(item as IMenuItem))}
    </SubMenu>
  );

  /**
   * 菜单点击
   * @param param0
   */
  const menuItemClick = ({ key }: { key: string }) => {
    if (key === selectedKeys[0]) return;
    setSelectedKeys([key]);
    menuClick && menuClick();
    history.push(key);
  };

  return (
    <Menu mode="inline" onClick={menuItemClick} selectedKeys={selectedKeys}>
      {menuList.map((data: IMenuItem | ISubMenuItem) => {
        if ((data as ISubMenuItem).children) {
          return SubMenuCom(data as ISubMenuItem);
        } else {
          return MenuItem(data as IMenuItem);
        }
      })}
    </Menu>
  );
};

export default MenuCom;
