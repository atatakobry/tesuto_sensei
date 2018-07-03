import gql from 'graphql-tag';

const GET_EXERCISES = gql`
  {
    exercises {
      id
      task {
        id
        title
      }
      answer
    }
  }
`;

const CREATE_EXERCISE = gql`
  mutation createExercise($task: Task!, $answer: String!) {
    createExercise(data: { task: $task, answer: $answer }) {
      id
      task
      answer
    }
  }
`;

const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(where: { id: $id }) {
      id
    }
  }
`;

export { GET_EXERCISES, CREATE_EXERCISE, DELETE_EXERCISE };
