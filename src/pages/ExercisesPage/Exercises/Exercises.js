import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Card, Button } from 'antd';

import { GET_EXERCISES } from '../../../graphql/exercises';
import { exerciseTypes } from '../../../dictionaries';
import { Loader, ExerciseCreateModal } from '../../../common';

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
        query={GET_EXERCISES[this.props.typeUid]}
        variables={{ typeUid: this.props.typeUid }}
      >
        {({ loading, data }) => {
          if (loading) return <Loader />;

          return (
            <Card
              style={{ marginTop: 20 }}
              title={
                <h3 style={{ margin: 0 }}>
                  {exerciseTypes.MAP[this.props.typeUid].name}
                  <code> (uid: {this.props.typeUid})</code>
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
              <ExercisesList exercises={data.exercises} />

              <ExerciseCreateModal
                exercise={{ type: { uid: this.props.typeUid } }}
                isVisible={this.state.isExerciseCreateModalVisible}
                onCancel={this.onExerciseCreateModalClose}
                onOk={this.onExerciseCreateModalClose}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Exercises;
