import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import { NavMenu } from './common';

import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import TasksPage from './pages/TasksPage';

import styles from './App.module.scss';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router className={styles.App}>
        <Layout className="layout">
          <Header>
            <div className="logo" />

            <NavMenu />
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/users" component={UsersPage} />
                <Route path="/tasks" component={TasksPage} />
                <Redirect to="/" />
              </Switch>
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            テスト (te-su-to) © 2018
            <br />
            created by atatakobry
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
