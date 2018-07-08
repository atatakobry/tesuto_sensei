import React from 'react';
import { Table } from 'antd';

function ExercisesList({ columns, exercises }) {
  return (
    <Table
      bordered
      size="small"
      rowKey="id"
      columns={columns}
      dataSource={exercises}
    />
  );
}

export default ExercisesList;
