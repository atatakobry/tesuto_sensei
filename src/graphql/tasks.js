import gql from 'graphql-tag';

const GET_TASKS = gql`
  {
    tasks {
      id
      title
    }
  }
`;

const CREATE_TASK = gql`
  mutation createTask($title: String!) {
    createTask(data: { title: $title }) {
      id
      title
    }
  }
`;

export { GET_TASKS, CREATE_TASK };
