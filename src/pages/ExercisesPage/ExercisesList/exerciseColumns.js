import React from 'react';
import { Route } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Button, Divider } from 'antd';

import { exerciseTypes } from '../../../dictionaries';
import {
  DELETE_EXERCISE,
  GET_EXERCISES_BY_TYPE
} from '../../../graphql/exercises';
import { onExerciseDeleteConfirm } from '../../../common';

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
                    query: GET_EXERCISES_BY_TYPE,
                    variables: { typeUid: type.uid }
                  });

                  cache.writeQuery({
                    query: GET_EXERCISES_BY_TYPE,
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
                  history.push(`/exercises/${id}`);
                }}
              />
            </div>
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
                    query: GET_EXERCISES_BY_TYPE,
                    variables: { typeUid: type.uid }
                  });

                  cache.writeQuery({
                    query: GET_EXERCISES_BY_TYPE,
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
                  history.push(`/exercises/${id}`);
                }}
              />
            </div>
          )}
        />
      )
    }
  ]
};

export default exerciseColumns;
