import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'antd';

import { GET_EXERCISE } from '../../../graphql/exercises';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: id => <code>{id}</code>
  },
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
  }
];

function Exercise({ id }) {
  return (
    <Query query={GET_EXERCISE} variables={{ id }}>
      {({ loading, data }) => {
        if (loading) return 'Loading...';

        return (
          <Table
            bordered
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={[data.exercise]}
          />
        );
      }}
    </Query>
  );
}

export default Exercise;
