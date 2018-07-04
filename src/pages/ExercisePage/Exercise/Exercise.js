import React from 'react';
import { Table } from 'antd';

function Exercise({ columns, exercise }) {
  return (
    <Table
      bordered
      size="small"
      pagination={false}
      rowKey="key"
      columns={columns}
      dataSource={exercise}
    />
  );
}

export default Exercise;
