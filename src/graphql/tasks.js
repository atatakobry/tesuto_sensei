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

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(where: { id: $id }) {
      id
    }
  }
`;

export { GET_TASKS, CREATE_TASK, DELETE_TASK };
