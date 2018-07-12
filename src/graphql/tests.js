import gql from 'graphql-tag';

const GET_TESTS = gql`
  query {
    tests {
      id
      title
      description
      exercises {
        id
        type {
          id
          uid
        }
        title
        description
        options
        answer
      }
    }
  }
`;

const GET_TEST = gql`
  query($id: ID!) {
    test(where: { id: $id }) {
      id
      title
      description
      exercises {
        id
        type {
          id
          uid
        }
        title
        description
        options
        answer
      }
    }
  }
`;

const DELETE_TEST = gql`
  mutation deleteTest($id: ID!) {
    deleteTest(where: { id: $id }) {
      id
    }
  }
`;

export { GET_TESTS, GET_TEST, DELETE_TEST };
