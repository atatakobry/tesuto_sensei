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
            history.push('/exercises');
          }}
        >
          {(deleteExercise, { loading }) => (
            <Button
              size="small"
              type="danger"
              icon="delete"
              loading={loading}
              onClick={() => onExerciseDeleteConfirm({ onOk: deleteExercise })}
            >
              Delete exercise
            </Button>
          )}
        </Mutation>
      )}
    />
  );
}

export default ExerciseDelete;
