import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Row, Col, Card } from 'antd';

import UsersList from './Users/UsersList';
import UserCreate from './Users/UserCreate';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/atatakobry/tesuto/dev'
});

function Users() {
  return (
    <ApolloProvider client={client}>
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

export default Users;
