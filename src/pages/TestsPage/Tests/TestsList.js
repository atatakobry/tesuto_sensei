import React from 'react';
import { Route } from 'react-router-dom';
import { Button, Table } from 'antd';

const columns = [
  {
    title: (
      <code>
        <strong>Title</strong>
      </code>
    ),
    dataIndex: 'title',
    render: title => <code>{title}</code>
  },
  {
    title: (
      <code>
        <strong>Description</strong>
      </code>
    ),
    dataIndex: 'description',
    render: description => <code>{description}</code>
  },
  {
    width: '110px',
    render: ({ id }) => (
      <Route
        render={({ history }) => (
          <div style={{ textAlign: 'center' }}>
            <Button
              size="small"
              icon="eye"
              onClick={() => {
                history.push(`/tests/${id}`);
              }}
            />
          </div>
        )}
      />
    )
  }
];

const TestsList = ({ tests }) => (
  <Table
    bordered
    size="small"
    rowKey="id"
    columns={columns}
    dataSource={tests}
  />
);

export default TestsList;
