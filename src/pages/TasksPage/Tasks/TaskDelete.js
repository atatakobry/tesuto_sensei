import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'antd';

import { GET_TASKS, DELETE_TASK } from '../../../graphql/tasks';

function TaskDelete({ id }) {
  // TODO: mb use `update` instead of `refetchQueries`; needs to be investigated later
  return (
    <Mutation
      mutation={DELETE_TASK}
      variables={{ id }}
      refetchQueries={[
        {
          query: GET_TASKS
        }
      ]}
    >
      {(deleteTask, { loading }) => (
        <Button
          type="danger"
          size="small"
          icon="close"
          loading={loading}
          onClick={deleteTask}
        >
          Delete
        </Button>
      )}
    </Mutation>
  );
}

export default TaskDelete;
