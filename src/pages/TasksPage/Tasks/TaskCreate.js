import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button } from 'antd';

import { GET_TASKS, CREATE_TASK } from '../../../graphql/tasks';

class TaskCreate extends Component {
  constructor() {
    super();

    this.state = {
      title: ''
    };
  }

  render() {
    const { title } = this.state;

    return (
      <Mutation
        mutation={CREATE_TASK}
        variables={{ title }}
        update={(cache, { data: { createTask } }) => {
          const { tasks } = cache.readQuery({ query: GET_TASKS });

          cache.writeQuery({
            query: GET_TASKS,
            data: { tasks: tasks.concat([createTask]) }
          });
        }}
      >
        {(createTask, { loading }) => (
          <div>
            <Input
              addonBefore="Title:"
              placeholder="Please enter title for new task..."
              value={title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />

            <Button
              style={{ marginTop: 10 }}
              type="primary"
              icon="plus"
              disabled={!title || !title.length}
              loading={loading}
              onClick={() => {
                createTask();
                this.setState({ title: '' });
              }}
            >
              Create task
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default TaskCreate;
