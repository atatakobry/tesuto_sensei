import React from 'react';
import { Route } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Card, Button } from 'antd';

import { GET_EXERCISE, DELETE_EXERCISE } from '../../../graphql/exercises';

import convertExercise from './convertExercise';
import exerciseColumns from './exerciseColumns';

import Exercise from './Exercise';

function ExerciseContainer({ id }) {
  return (
    <Query query={GET_EXERCISE} variables={{ id }}>
      {({ loading, data }) => {
        if (loading) return 'Loading...';

        const { uid, name } = data.exercise.type;
        // NOTE: convert object-like exercise into array of `{ key, value }` items with sorting, etc.
        // TODO: add possibility to sort fields in necessary order
        const exercise = convertExercise(data.exercise);

        return (
          <Card
            title={
              <h3 style={{ margin: 0 }}>
                {name} <code>(uid: {uid})</code>
              </h3>
            }
          >
            <Exercise columns={exerciseColumns} exercise={exercise} />

            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <Route
                render={({ history }) => (
                  <Mutation
                    mutation={DELETE_EXERCISE}
                    variables={{ id }}
                    onCompleted={() => {
                      history.push('/exercises');
                    }}
                  >
                    {(deleteUser, { loading }) => (
                      <Button
                        type="danger"
                        icon="delete"
                        loading={loading}
                        onClick={deleteUser}
                      >
                        Delete
                      </Button>
                    )}
                  </Mutation>
                )}
              />
            </div>
          </Card>
        );
      }}
    </Query>
  );
}

export default ExerciseContainer;
