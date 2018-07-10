import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Button, Card, Divider } from 'antd';

import { GET_EXERCISE, DELETE_EXERCISE } from '../../../graphql/exercises';
import { exerciseTypes } from '../../../dictionaries';
import {
  Loader,
  ExerciseEditModal,
  onExerciseDeleteConfirm
} from '../../../common';

import ExerciseDetails from './ExerciseDetails';

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
      <Query
        query={GET_EXERCISE[this.props.typeUid]}
        variables={{ id: this.props.id }}
      >
        {({ loading, data }) => {
          if (loading) return <Loader />;

          return (
            <Card
              title={
                <h3 style={{ margin: 0 }}>
                  {exerciseTypes.MAP[this.props.typeUid].name}
                  <code> (uid: {this.props.typeUid})</code>
                </h3>
              }
              extra={
                <Fragment>
                  <Route
                    render={({ history }) => (
                      <Mutation
                        mutation={DELETE_EXERCISE}
                        variables={{ id: this.props.id }}
                        onCompleted={() => {
                          history.push('/exercises');
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
                          >
                            Delete exercise
                          </Button>
                        )}
                      </Mutation>
                    )}
                  />

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
              <ExerciseDetails exercise={data.exercise} />

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
