import gql from 'graphql-tag';

const GET_EXERCISES = gql`
  {
    exercises {
      id
      taskType
      answer
    }
  }
`;

export { GET_EXERCISES };
