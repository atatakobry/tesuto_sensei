import gql from 'graphql-tag';

const GET_EXERCISES = gql`
  query {
    exercises {
      id
      type {
        id
        uid
        name
      }
      title
      description
      options
      answer
    }
  }
`;

const GET_EXERCISES_BY_TYPE = gql`
  query($typeUid: Int!) {
    exercises(where: { type: { uid: $typeUid } }) {
      id
      type {
        id
        uid
        name
      }
      title
      description
      options
      answer
    }
  }
`;

const GET_EXERCISE = gql`
  query($id: ID!) {
    exercise(where: { id: $id }) {
      id
      type {
        id
        uid
        name
      }
      title
      description
      options
      answer
    }
  }
`;

const CREATE_EXERCISE = gql`
  mutation createExercise($exercise: ExerciseCreateInput!) {
    createExercise(data: $exercise) {
      id
      type {
        id
      }
      title
      description
      options
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

export {
  GET_EXERCISES,
  GET_EXERCISES_BY_TYPE,
  GET_EXERCISE,
  CREATE_EXERCISE,
  DELETE_EXERCISE
};
