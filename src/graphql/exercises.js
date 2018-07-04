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

export { GET_EXERCISES, GET_EXERCISES_BY_TYPE, GET_EXERCISE };
