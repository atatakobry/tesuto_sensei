import React from 'react';

const exerciseColumns = [
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

function renderFn(value) {
  // NOTE: if array or object
  if (Array.isArray(value) || (value !== null && typeof value === 'object')) {
    return <pre>{JSON.stringify(value, null, 2)}</pre>;
  }

  // NOTE: default view
  return <code>{value}</code>;
}

export default exerciseColumns;
