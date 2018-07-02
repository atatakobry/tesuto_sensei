import gql from 'graphql-tag';

const GET_EXERCISES = gql`
  {
    exercises {
      id
      task {
        id
        type
        title
      }
      answer
    }
  }
`;

export { GET_EXERCISES };
