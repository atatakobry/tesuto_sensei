import React from 'react';
import { Table } from 'antd';

import convertExercise from './convertExercise';

function renderFn(value) {
  // NOTE: if array or object
  if (Array.isArray(value) || (value !== null && typeof value === 'object')) {
    return <pre>{JSON.stringify(value, null, 2)}</pre>;
  }

  // NOTE: default view
  return <code>{value}</code>;
}

const columns = [
  {
    title: (
      <code>
        <strong>Key</strong>
      </code>
    ),
    dataIndex: 'key',
    render: key => (
      <code>
        <strong>{key}</strong>
      </code>
    )
  },
  {
    title: (
      <code>
        <strong>Value</strong>
      </code>
    ),
    dataIndex: 'value',
    render: renderFn
  }
];

const ExerciseDetails = ({ exercise }) => (
  <Table
    bordered
    size="small"
    pagination={false}
    rowKey="key"
    columns={columns}
    // NOTE: convert object-like exercise into array of `{ key, value }` items with sorting, etc.
    // TODO: add possibility to sort fields in necessary order
    dataSource={convertExercise(exercise)}
  />
);

export default ExerciseDetails;
