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
      exercisesOrder
    }
  }
`;

const UPDATE_TEST = gql`
  mutation updateTest($test: TestUpdateInput!, $where: TestWhereUniqueInput!) {
    updateTest(data: $test, where: $where) {
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
      exercisesOrder
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

export { GET_TESTS, GET_TEST, UPDATE_TEST, DELETE_TEST };
