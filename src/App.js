import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import styles from './App.module.scss';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Layout className="layout">
          <Header>
            <div className="logo" />

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
              Content
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            テスト (te-su-to) © 2018
            <br />
            created by atatakobry
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
