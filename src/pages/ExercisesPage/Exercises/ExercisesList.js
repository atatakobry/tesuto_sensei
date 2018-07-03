import React from 'react';
import { Query } from 'react-apollo';
import { Icon, Table } from 'antd';

import { GET_EXERCISES } from '../../../graphql/exercises';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    render: type => <code>{type}</code>
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: <Icon type="ellipsis" />,
    width: '1%'
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
