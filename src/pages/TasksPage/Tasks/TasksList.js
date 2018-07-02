import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';

import { GET_TASKS } from '../../../graphql/tasks';

const columns = [
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
          bordered
          size="small"
          rowKey="id"
          columns={columns}
          dataSource={data.tasks}
        />
      )}
    </Query>
  );
}

export default TasksList;
