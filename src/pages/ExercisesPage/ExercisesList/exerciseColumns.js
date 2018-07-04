import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'antd';

import { exerciseTypes } from '../../../dictionaries';

const exerciseColumns = {
  [exerciseTypes.ET_10]: [
    {
      title: (
        <code>
          <strong>Answer</strong>
        </code>
      ),
      dataIndex: 'answer',
      render: answer => <code>{answer}</code>
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
  ],
  [exerciseTypes.ET_20]: [
    {
      title: (
        <code>
          <strong>Options</strong>
        </code>
      ),
      dataIndex: 'options',
      render: options => <pre>{JSON.stringify(options, null, 2)}</pre>
    },
    {
      title: (
        <code>
          <strong>Answer</strong>
        </code>
      ),
      dataIndex: 'answer',
      render: answer => <code>{answer}</code>
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
  ]
};

export default exerciseColumns;
