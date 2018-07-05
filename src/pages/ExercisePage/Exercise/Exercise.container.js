import React from 'react';
import { Query } from 'react-apollo';
import { Card } from 'antd';

import { GET_EXERCISE } from '../../../graphql/exercises';

import convertExercise from './convertExercise';
import exerciseColumns from './exerciseColumns';

import Exercise from './Exercise';
import ExerciseDelete from './ExerciseDelete';

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
              <ExerciseDelete id={id} />
            </div>
          </Card>
        );
      }}
    </Query>
  );
}

export default ExerciseContainer;
