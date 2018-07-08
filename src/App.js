import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import { routes } from './configs';
import { ScrollRestoration, NavMenu, Breadcrumbs, NavRoutes } from './common';

import logo from './logo.svg';

import styles from './App.module.scss';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router className={styles.App}>
        <ScrollRestoration>
          <Layout>
            <Header>
              <img className={styles.Logo} src={logo} alt="テスト" />

              <NavMenu routes={routes} />
            </Header>

            <Content style={{ padding: '24px 50px 0' }}>
              <Breadcrumbs routes={routes} />

              <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
                <NavRoutes routes={routes} />
              </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              テスト © 2018
              <br />
              created by atatakobry
            </Footer>
          </Layout>
        </ScrollRestoration>
      </Router>
    );
  }
}

export default App;
