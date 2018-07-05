import React from 'react';
import { Route } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Button } from 'antd';

import { DELETE_EXERCISE } from '../../../graphql/exercises';
import { onExerciseDeleteConfirm } from '../../../common';

function ExerciseDelete({ id }) {
  return (
    <Route
      render={({ history }) => (
        <Mutation
          mutation={DELETE_EXERCISE}
          variables={{ id }}
          onCompleted={() => {
            setTimeout(() => history.push('/exercises'), 1000);
          }}
        >
          {(deleteExercise, { loading }) => (
            <Button
              type="danger"
              icon="delete"
              loading={loading}
              onClick={() => onExerciseDeleteConfirm({ onOk: deleteExercise })}
            >
              Delete
            </Button>
          )}
        </Mutation>
      )}
    />
  );
}

export default ExerciseDelete;
