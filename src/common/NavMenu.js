import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

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
      {routes.filter(route => !route.hidden).map(({ path, title }) => (
        <Menu.Item key={path}>
          <Link to={path}>{title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default withRouter(NavMenu);
