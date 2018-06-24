import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button } from 'antd';

import { GET_USERS, CREATE_USER } from './gql';

class CreateUser extends Component {
  constructor() {
    super();

    this.state = {
      name: ''
    };
  }

  render() {
    const { name } = this.state;

    return (
      <Mutation
        mutation={CREATE_USER}
        variables={{ name }}
        update={(cache, { data: { createUser } }) => {
          const { users } = cache.readQuery({ query: GET_USERS });

          cache.writeQuery({
            query: GET_USERS,
            data: { users: users.concat([createUser]) }
          });
        }}
      >
        {(createUser, { loading }) => (
          <div>
            <Input
              style={{ marginTop: 45 }}
              addonBefore="Name:"
              placeholder="Please enter name for new user..."
              value={name}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />

            <Button
              style={{ marginTop: 6 }}
              type="primary"
              icon="user-add"
              disabled={!name || !name.length}
              loading={loading}
              onClick={() => {
                createUser();
                this.setState({ name: '' });
              }}
            >
              Create user
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateUser;
