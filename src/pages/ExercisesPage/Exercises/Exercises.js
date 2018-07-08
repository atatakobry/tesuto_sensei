import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Card, Button } from 'antd';

import { GET_EXERCISES_BY_TYPE } from '../../../graphql/exercises';

import { ExerciseCreateModal } from '../../../common';

import exerciseColumns from './exerciseColumns';

import ExercisesList from './ExercisesList';

class Exercises extends Component {
  state = {
    isExerciseCreateModalVisible: false
  };

  onExerciseCreateModalShow = () => {
    this.setState({ isExerciseCreateModalVisible: true });
  };

  onExerciseCreateModalClose = () => {
    this.setState({ isExerciseCreateModalVisible: false });
  };

  render() {
    return (
      <Query
        query={GET_EXERCISES_BY_TYPE}
        variables={{ typeUid: this.props.type.uid }}
      >
        {({ loading, data }) => {
          if (loading) return 'Loading...';

          return (
            <Card
              style={{ marginTop: 20 }}
              title={
                <h3 style={{ margin: 0 }}>
                  {this.props.type.name}{' '}
                  <code>(uid: {this.props.type.uid})</code>
                </h3>
              }
              extra={
                <Button
                  size="small"
                  icon="plus"
                  onClick={this.onExerciseCreateModalShow}
                >
                  New exercise
                </Button>
              }
            >
              <ExercisesList
                columns={exerciseColumns[this.props.type.uid]}
                exercises={data.exercises}
              />

              <ExerciseCreateModal
                defaults={{ typeUid: this.props.type.uid }}
                isVisible={this.state.isExerciseCreateModalVisible}
                onOk={this.onExerciseCreateModalClose}
                onCancel={this.onExerciseCreateModalClose}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Exercises;
