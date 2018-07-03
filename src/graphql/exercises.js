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

export { GET_EXERCISES };
