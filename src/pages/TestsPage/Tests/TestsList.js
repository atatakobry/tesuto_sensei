import React from 'react';
import { Route } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Button, Divider, Table } from 'antd';

import { DELETE_TEST, GET_TESTS } from '../../../graphql/tests';
import { onTestDeleteConfirm } from '../../../common';

const columns = [
  {
    title: <strong>TITLE</strong>,
    dataIndex: 'title'
  },
  {
    title: <strong>DESCRIPTION</strong>,
    dataIndex: 'description'
  },
  {
    title: <strong>NUMBER OF EXERCISES</strong>,
    width: '200px',
    render: ({ exercises }) => exercises.length
  },
  {
    width: '110px',
    render: ({ id }) => (
      <Route
        render={({ history }) => (
          <div style={{ textAlign: 'center' }}>
            <Mutation
              mutation={DELETE_TEST}
              variables={{ id }}
              update={(cache, { data: { deleteTest } }) => {
                const { tests } = cache.readQuery({
                  query: GET_TESTS
                });

                cache.writeQuery({
                  query: GET_TESTS,
                  data: {
                    tests: tests.filter(({ id }) => id !== deleteTest.id)
                  }
                });
              }}
            >
              {(deleteTest, { loading }) => (
                <Button
                  size="small"
                  type="danger"
                  icon="delete"
                  loading={loading}
                  onClick={() => onTestDeleteConfirm({ onOk: deleteTest })}
                />
              )}
            </Mutation>

            <Divider type="vertical" />

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
