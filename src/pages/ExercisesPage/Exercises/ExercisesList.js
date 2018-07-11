import React from 'react';
import { Route } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Button, Divider, Table } from 'antd';

import { DELETE_EXERCISE, GET_EXERCISES } from '../../../graphql/exercises';
import { exerciseTypes } from '../../../dictionaries';
import { onExerciseDeleteConfirm } from '../../../common';

const optionsColumn = {
  title: (
    <code>
      <strong>Options</strong>
    </code>
  ),
  dataIndex: 'options',
  render: options => <pre>{JSON.stringify(options, null, 2)}</pre>
};

const answerColumn = {
  title: (
    <code>
      <strong>Answer</strong>
    </code>
  ),
  dataIndex: 'answer',
  render: answer => <code>{answer}</code>
};

const actionsColumn = {
  width: '110px',
  render: ({ type, id }) => (
    <Route
      render={({ history }) => (
        <div style={{ textAlign: 'center' }}>
          <Mutation
            mutation={DELETE_EXERCISE}
            variables={{ id }}
            update={(cache, { data: { deleteExercise } }) => {
              const { exercises } = cache.readQuery({
                query: GET_EXERCISES[type.uid],
                variables: { typeUid: type.uid }
              });

              cache.writeQuery({
                query: GET_EXERCISES[type.uid],
                variables: { typeUid: type.uid },
                data: {
                  exercises: exercises.filter(
                    ({ id }) => id !== deleteExercise.id
                  )
                }
              });
            }}
          >
            {(deleteExercise, { loading }) => (
              <Button
                size="small"
                type="danger"
                icon="delete"
                loading={loading}
                onClick={() =>
                  onExerciseDeleteConfirm({ onOk: deleteExercise })
                }
              />
            )}
          </Mutation>

          <Divider type="vertical" />

          <Button
            size="small"
            icon="eye"
            onClick={() => {
              history.push(`/exercises/${type.uid}/${id}`);
            }}
          />
        </div>
      )}
    />
  )
};

const columns = {
  [exerciseTypes.ET_10]: [answerColumn, actionsColumn],
  [exerciseTypes.ET_20]: [optionsColumn, answerColumn, actionsColumn]
};

const ExercisesList = ({ exercises }) => (
  <Table
    bordered
    size="small"
    rowKey="id"
    columns={columns[exercises[0].type.uid]}
    dataSource={exercises}
  />
);

export default ExercisesList;
