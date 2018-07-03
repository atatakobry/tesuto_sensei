import gql from 'graphql-tag';

const GET_EXERCISES = gql`
  {
    exercises {
      id
      type
      title
      description
    }
  }
`;

const GET_EXERCISE = gql`
  query($id: ID!) {
    exercise(where: { id: $id }) {
      id
      type
      title
      description
    }
  }
`;

export { GET_EXERCISES, GET_EXERCISE };
