import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';

import { GET_TASKS } from '../../../graphql/tasks';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type'
  },
  {
    title: 'Title',
    dataIndex: 'title'
  }
];

function TasksList() {
  return (
    <Query query={GET_TASKS}>
      {({ data }) => (
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={data.tasks}
        />
      )}
    </Query>
  );
}

export default TasksList;
