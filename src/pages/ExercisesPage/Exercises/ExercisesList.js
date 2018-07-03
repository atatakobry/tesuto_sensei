import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';

import ExerciseDelete from './ExerciseDelete';

import { GET_EXERCISES } from '../../../graphql/exercises';

const columns = [
  {
    title: 'Task',
    dataIndex: 'task.title'
  },
  {
    title: 'Answer',
    dataIndex: 'answer'
  },
  {
    title: '',
    width: '1%',
    render: exercise => <ExerciseDelete id={exercise.id} />
  }
];

function ExercisesList() {
  return (
    <Query query={GET_EXERCISES}>
      {({ data }) => (
        <Table
          bordered
          size="small"
          rowKey="id"
          columns={columns}
          dataSource={data.exercises}
        />
      )}
    </Query>
  );
}

export default ExercisesList;
