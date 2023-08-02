import React from 'react';
import { Menu } from "antd";

const NavMenu = () => {


  let items = [
    {
      label: 'Edit Meals',
      key: null,
    }
  ];

  return (
  <Menu
    style={{ width: 256 }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
    items={items}
  />
  )
}

export default NavMenu;