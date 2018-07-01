import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';

import { GET_EXERCISES } from '../gql';

const columns = [
  {
    title: 'Task Type',
    dataIndex: 'taskType'
  },
  {
    title: 'Answer',
    dataIndex: 'answer'
  }
];

function ExercisesList() {
  return (
    <Query query={GET_EXERCISES}>
      {({ data }) => (
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={data.exercises}
        />
      )}
    </Query>
  );
}

export default ExercisesList;
