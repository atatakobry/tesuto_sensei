import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Button, Card, Divider } from 'antd';

import { GET_EXERCISE } from '../../../graphql/exercises';

import { Loader, ExerciseEditModal } from '../../../common';

import convertExercise from './convertExercise';
import exerciseColumns from './exerciseColumns';

import ExerciseDetails from './ExerciseDetails';
import ExerciseDelete from './ExerciseDelete';

class Exercise extends Component {
  state = {
    isExerciseEditModalVisible: false
  };

  onExerciseEditModalShow = () => {
    this.setState({ isExerciseEditModalVisible: true });
  };

  onExerciseEditModalClose = () => {
    this.setState({ isExerciseEditModalVisible: false });
  };

  render() {
    return (
      <Query query={GET_EXERCISE} variables={{ id: this.props.id }}>
        {({ loading, data }) => {
          if (loading) return <Loader />;

          const { uid, name } = data.exercise.type;
          // NOTE: convert object-like exercise into array of `{ key, value }` items with sorting, etc.
          // TODO: add possibility to sort fields in necessary order
          const _exercise = convertExercise(data.exercise);

          return (
            <Card
              title={
                <h3 style={{ margin: 0 }}>
                  {name} <code>(uid: {uid})</code>
                </h3>
              }
              extra={
                <Fragment>
                  <ExerciseDelete id={this.props.id} />

                  <Divider type="vertical" />

                  <Button
                    size="small"
                    icon="edit"
                    onClick={this.onExerciseEditModalShow}
                  >
                    Edit exercise
                  </Button>
                </Fragment>
              }
            >
              <ExerciseDetails columns={exerciseColumns} exercise={_exercise} />

              <ExerciseEditModal
                exercise={data.exercise}
                isVisible={this.state.isExerciseEditModalVisible}
                onCancel={this.onExerciseEditModalClose}
                onOk={this.onExerciseEditModalClose}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Exercise;
