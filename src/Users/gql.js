import gql from 'graphql-tag';

const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($name: String!) {
    createUser(data: { name: $name }) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(where: { id: $id }) {
      id
    }
  }
`;

export { GET_USERS, CREATE_USER, DELETE_USER };
