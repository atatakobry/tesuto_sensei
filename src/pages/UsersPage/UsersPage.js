import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Row, Col, Card } from 'antd';

import { prisma } from '../../configs';

import UsersList from './Users/UsersList';
import UserCreate from './Users/UserCreate';

class UsersPage extends Component {
  constructor() {
    super();

    this.client = new ApolloClient({
      uri: prisma.url
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div>
          <h1>Users</h1>

          <Row gutter={20}>
            <Col span={16}>
              <Card>
                <UsersList />
              </Card>
            </Col>

            <Col span={8}>
              <Card>
                <UserCreate />
              </Card>
            </Col>
          </Row>
        </div>
      </ApolloProvider>
    );
  }
}

export default UsersPage;
