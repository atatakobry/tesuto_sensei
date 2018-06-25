import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'antd';

import { GET_USERS, DELETE_USER } from '../gql';

function UserDelete({ id }) {
  // TODO: mb use `update` instead of `refetchQueries`; needs to be investigated later
  return (
    <Mutation
      mutation={DELETE_USER}
      variables={{ id }}
      refetchQueries={[
        {
          query: GET_USERS
        }
      ]}
    >
      {(deleteUser, { loading }) => (
        <Button
          type="danger"
          size="small"
          icon="close"
          loading={loading}
          onClick={deleteUser}
        />
      )}
    </Mutation>
  );
}

export default UserDelete;
