import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'antd';

import UserDelete from './UserDelete';

import { GET_USERS } from '../gql';

function UsersList() {
  return (
    <Query query={GET_USERS}>
      {({ data }) => (
        <List
          size="small"
          bordered
          dataSource={data.users}
          renderItem={({ id, name }) => (
            <List.Item key={id} actions={[<UserDelete id={id} />]}>
              {name}
            </List.Item>
          )}
        />
      )}
    </Query>
  );
}

export default UsersList;
