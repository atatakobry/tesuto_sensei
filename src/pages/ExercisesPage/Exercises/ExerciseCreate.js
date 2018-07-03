import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Select, Input, Button } from 'antd';

import { GET_TASKS } from '../../../graphql/tasks';
import { GET_EXERCISES, CREATE_EXERCISE } from '../../../graphql/exercises';

const Option = Select.Option;

class ExerciseCreate extends Component {
  constructor() {
    super();

    this.state = {
      taskId: undefined,
      // TODO: different tasks need different fields!
      answer: ''
    };
  }

  render() {
    const { taskId, answer } = this.state;

    return (
      <div>
        <Query query={GET_TASKS}>
          {({ data }) => (
            <Select
              style={{ width: '100%' }}
              allowClear
              placeholder="Select a task..."
              onChange={taskId => this.setState({ taskId })}
            >
              {data &&
                data.tasks &&
                data.tasks.map(({ id, title }) => (
                  <Option key={id}>{title}</Option>
                ))}
            </Select>
          )}
        </Query>

        <Input
          style={{ marginTop: 10 }}
          addonBefore="Answer:"
          placeholder="Please enter correct answer..."
          value={answer}
          onChange={e => {
            this.setState({ answer: e.target.value });
          }}
        />

        <Mutation
          mutation={CREATE_EXERCISE}
          variables={{ answer }}
          update={(cache, { data: { createExercise } }) => {
            const { tasks } = cache.readQuery({ query: GET_EXERCISES });

            cache.writeQuery({
              query: GET_EXERCISES,
              data: { tasks: tasks.concat([createExercise]) }
            });
          }}
        >
          {(createExercise, { loading }) => (
            <Button
              style={{ marginTop: 10 }}
              type="primary"
              icon="plus"
              disabled={!taskId || !answer || !answer.length}
              loading={loading}
              onClick={() => {
                createExercise();
                this.setState({ answer: '' });
              }}
            >
              Create exercise
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default ExerciseCreate;
