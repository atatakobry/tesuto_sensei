import gql from 'graphql-tag';

const GET_TASKS = gql`
  {
    tasks {
      id
      type
      title
    }
  }
`;

export { GET_TASKS };
