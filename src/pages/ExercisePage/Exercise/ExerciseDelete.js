import React from 'react';
import { Route } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Modal, Button } from 'antd';

import { DELETE_EXERCISE } from '../../../graphql/exercises';

function onExerciseDeleteConfirm(onOk) {
  Modal.confirm({
    title: 'Are you sure want to delete this exercise?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: onOk
  });
}

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
              onClick={() => onExerciseDeleteConfirm(deleteExercise)}
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
