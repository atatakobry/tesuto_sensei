import React from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Button, Table } from 'antd';

import { GET_EXERCISES } from '../../../graphql/exercises';

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
  },
  {
    width: '1%',
    render: ({ id }) => (
      <Route
        render={({ history }) => (
          <Button
            size="small"
            icon="eye"
            onClick={() => {
              history.push(`/exercises/${id}`);
            }}
          />
        )}
      />
    )
  }
];

function ExercisesList() {
  return (
    <Query query={GET_EXERCISES}>
      {({ loading, data }) => {
        if (loading) return 'Loading...';

        return (
          <Table
            bordered
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={data.exercises}
          />
        );
      }}
    </Query>
  );
}

export default ExercisesList;
