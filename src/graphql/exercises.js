import gql from 'graphql-tag';

import { exerciseTypes } from '../dictionaries';

const GET_EXERCISES = {
  [exerciseTypes.ET_10]: gql`
    query($typeUid: Int!) {
      exercises(where: { type: { uid: $typeUid } }) {
        id
        type {
          uid
        }
        answer
      }
    }
  `,
  [exerciseTypes.ET_20]: gql`
    query($typeUid: Int!) {
      exercises(where: { type: { uid: $typeUid } }) {
        id
        type {
          uid
        }
        options
        answer
      }
    }
  `
};

const GET_EXERCISE = {
  [exerciseTypes.ET_10]: gql`
    query($id: ID!) {
      exercise(where: { id: $id }) {
        id
        type {
          id
          uid
        }
        title
        description
        answer
      }
    }
  `,
  [exerciseTypes.ET_20]: gql`
    query($id: ID!) {
      exercise(where: { id: $id }) {
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
  `
};

const CREATE_EXERCISE = {
  [exerciseTypes.ET_10]: gql`
    mutation createExercise($exercise: ExerciseCreateInput!) {
      createExercise(data: $exercise) {
        id
        type {
          id
          uid
        }
        answer
      }
    }
  `,
  [exerciseTypes.ET_20]: gql`
    mutation createExercise($exercise: ExerciseCreateInput!) {
      createExercise(data: $exercise) {
        id
        type {
          id
          uid
        }
        options
        answer
      }
    }
  `
};

const UPDATE_EXERCISE = {
  [exerciseTypes.ET_10]: gql`
    mutation updateExercise(
      $exercise: ExerciseUpdateInput!
      $where: ExerciseWhereUniqueInput!
    ) {
      updateExercise(data: $exercise, where: $where) {
        id
        type {
          id
          uid
        }
        title
        description
        answer
      }
    }
  `,
  [exerciseTypes.ET_20]: gql`
    mutation updateExercise(
      $exercise: ExerciseUpdateInput!
      $where: ExerciseWhereUniqueInput!
    ) {
      updateExercise(data: $exercise, where: $where) {
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
  `
};

const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(where: { id: $id }) {
      id
    }
  }
`;

export {
  GET_EXERCISES,
  GET_EXERCISE,
  CREATE_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE
};
