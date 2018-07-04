import React from 'react';
import { Query } from 'react-apollo';
import { Card } from 'antd';

import { GET_EXERCISES_BY_TYPE } from '../../../graphql/exercises';

import exerciseColumns from './exerciseColumns';
import ExercisesList from './ExercisesList';

function ExercisesListContainer({ typeUid }) {
  return (
    <Query query={GET_EXERCISES_BY_TYPE} variables={{ typeUid }}>
      {({ loading, data }) => {
        if (loading) return 'Loading...';

        const { uid, name } = data.exercises[0].type;

        return (
          <Card
            style={{ marginTop: 20 }}
            title={
              <h3 style={{ margin: 0 }}>
                {name} <code>(uid: {uid})</code>
              </h3>
            }
          >
            <ExercisesList
              columns={exerciseColumns[uid]}
              exercises={data.exercises}
            />
          </Card>
        );
      }}
    </Query>
  );
}

export default ExercisesListContainer;
