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

export { GET_TESTS, GET_TEST };
