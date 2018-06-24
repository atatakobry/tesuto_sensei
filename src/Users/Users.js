import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Row, Col } from 'antd';

import UsersList from './UsersList';
import CreateUser from './CreateUser';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/atatakobry/tesuto/dev'
});

function Users() {
  return (
    <ApolloProvider client={client}>
      <Row gutter={20}>
        <Col span={18}>
          <UsersList />
        </Col>

        <Col span={6}>
          <CreateUser />
        </Col>
      </Row>
    </ApolloProvider>
  );
}

export default Users;
