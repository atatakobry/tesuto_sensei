import React from 'react';
import { Query } from 'react-apollo';
import { Icon, Table } from 'antd';

import { GET_TASKS } from '../../../graphql/tasks';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type'
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: <Icon type="ellipsis" />,
    width: '1%'
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
