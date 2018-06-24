import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'antd';

import DeleteUser from './DeleteUser';

import { GET_USERS } from './gql';

function UsersList() {
  return (
    <Query query={GET_USERS}>
      {({ data }) => (
        <List
          size="small"
          header={<strong>USERS:</strong>}
          dataSource={data.users}
          renderItem={({ id, name }) => (
            <List.Item key={id} actions={[<DeleteUser id={id} />]}>
              {name}
            </List.Item>
          )}
        />
      )}
    </Query>
  );
}

export default UsersList;
