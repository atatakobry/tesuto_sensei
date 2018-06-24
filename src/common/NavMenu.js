import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

import { routes } from '../configs';

class NavMenu extends Component {
  render() {
    // TODO: mb it's be nice to use just `this.props.location.pathname`
    const key = '/' + this.props.location.pathname.split('/')[1];

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[key]}
        style={{ lineHeight: '64px' }}
      >
        {routes.map(({ to, title }) => (
          <Menu.Item key={to}>
            <Link to={to}>{title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default withRouter(NavMenu);
