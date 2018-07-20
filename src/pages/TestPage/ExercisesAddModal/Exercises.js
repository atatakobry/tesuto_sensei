import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Card } from 'antd';

import { GET_EXERCISES } from '../../../graphql/exercises';
import { exerciseTypes } from '../../../dictionaries';
import { Loader } from '../../../common';

import ExercisesList from './ExercisesList';

class Exercises extends Component {
  render() {
    return (
      <Query
        query={GET_EXERCISES[this.props.typeUid]}
        variables={{ typeUid: this.props.typeUid }}
      >
        {({ loading, data }) => {
          if (loading) return <Loader />;

          return (
            <Card
              style={{ marginTop: 20 }}
              title={
                <h4 style={{ margin: 0 }}>
                  {exerciseTypes.MAP[this.props.typeUid].name}
                  <code> (uid: {this.props.typeUid})</code>
                </h4>
              }
            >
              <ExercisesList exercises={data.exercises} />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Exercises;
