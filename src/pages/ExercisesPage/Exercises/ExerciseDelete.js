import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'antd';

import { GET_EXERCISES, DELETE_EXERCISE } from '../../../graphql/exercises';

function ExerciseDelete({ id }) {
  // TODO: mb use `update` instead of `refetchQueries`; needs to be investigated later
  return (
    <Mutation
      mutation={DELETE_EXERCISE}
      variables={{ id }}
      refetchQueries={[
        {
          query: GET_EXERCISES
        }
      ]}
    >
      {(deleteExercise, { loading }) => (
        <Button
          type="danger"
          size="small"
          icon="close"
          loading={loading}
          onClick={deleteExercise}
        >
          Delete
        </Button>
      )}
    </Mutation>
  );
}

export default ExerciseDelete;
