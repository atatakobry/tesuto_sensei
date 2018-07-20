import React, { Fragment } from 'react';
import { Form, Input, Table, Button, Divider } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { getLowerLatinPrefix, DraggableBodyRow } from '../../../common';

const TestTitle = ({ title, onChange }) => (
  <Form.Item label="TITLE">
    <Input
      placeholder="Input title..."
      value={title}
      onChange={e => onChange(e.target.value)}
    />
  </Form.Item>
);

const TestDescription = ({ description, onChange }) => (
  <Form.Item label="DESCRIPTION">
    <Input.TextArea
      rows={3}
      placeholder="Input description..."
      value={description}
      onChange={e => onChange(e.target.value)}
    />
  </Form.Item>
);

const renderExercise = ({ title, description, options, answer }) => {
  return (
    <Fragment>
      <div>{title}</div>
      <div>
        <em>{description}</em>
      </div>
      <div>
        {options &&
          options.length >= 1 &&
          getLowerLatinPrefix(options.indexOf(answer))}
        {answer}
      </div>
    </Fragment>
  );
};

const ExercisesList = ({
  exercises,
  onRowMove,
  onRowRemove,
  onExercisesAdd
}) => (
  <Table
    style={{ position: 'relative', top: '-8px' }}
    size="small"
    pagination={false}
    rowKey="id"
    components={{ body: { row: DraggableBodyRow } }}
    columns={[
      {
        width: '50px',
        dataIndex: 'id',
        render: (text, record, index) => (
          <div style={{ textAlign: 'right' }}>{index + 1}.</div>
        )
      },
      {
        title: 'EXERCISES*',
        render: renderExercise
      },
      {
        title: (
          <Button size="small" icon="plus" onClick={onExercisesAdd}>
            Add exercises
          </Button>
        ),
        width: '145px',
        render: ({ type, id }, record, index) => (
          <div style={{ textAlign: 'center' }}>
            <Button
              size="small"
              type="danger"
              icon="close"
              onClick={() => onRowRemove(index)}
            />

            <Divider type="vertical" />

            <Button
              size="small"
              icon="eye"
              onClick={() => {
                // NOTE: open exercise in new tab; focus on it
                const tab = window.open(
                  `/exercises/${type.uid}/${id}`,
                  '_blank'
                );
                tab.focus();
              }}
            />
          </div>
        )
      }
    ]}
    dataSource={exercises}
    onRow={(record, index) => ({ index, moveRow: onRowMove })}
  />
);

const ExercisesDraggableList = DragDropContext(HTML5Backend)(ExercisesList);

export { TestTitle, TestDescription, ExercisesDraggableList };
