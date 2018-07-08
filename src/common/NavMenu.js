import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

function NavMenu({ location, routes }) {
  // TODO: mb it's be nice to use just `location.pathname`
  const key = '/' + location.pathname.split('/')[1];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[key]}
      style={{ lineHeight: '64px' }}
    >
      {routes.filter(route => !route.hidden).map(({ path, title, icon }) => (
        <Menu.Item key={path}>
          <Link to={path}>
            {icon && <Icon type={icon} />}
            {title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default withRouter(NavMenu);
