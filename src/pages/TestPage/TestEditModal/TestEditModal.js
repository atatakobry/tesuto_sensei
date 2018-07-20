import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Form, Button, Row, Col } from 'antd';
import update from 'immutability-helper';

import { UPDATE_TEST } from '../../../graphql/tests';

import {
  TestTitle,
  TestDescription,
  ExercisesDraggableList
} from './testEditComponents';
import ExercisesAddModal from '../ExercisesAddModal';

class TestEditModal extends Component {
  initialState = {
    id: '',
    title: '',
    description: '',
    exercises: [],
    exercisesOrder: [],
    isExercisesAddModalVisible: false
  };

  state = {
    ...this.initialState,
    ...this.props.test
  };

  resetState = () => {
    this.setState({
      ...this.initialState,
      ...this.props.test
    });
  };

  moveExerciseRow = (dragIndex, hoverIndex) => {
    const dragRow = this.state.exercises[dragIndex];

    this.setState(
      update(this.state, {
        exercises: { $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]] },
        exercisesOrder: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow.id]]
        }
      })
    );
  };

  removeExerciseRow = index => {
    this.setState(
      update(this.state, {
        exercises: { $splice: [[index, 1]] },
        exercisesOrder: { $splice: [[index, 1]] }
      })
    );
  };

  render() {
    return (
      <Modal
        width={1360}
        visible={this.props.isVisible}
        title="EDITING TEST"
        footer={
          <Fragment>
            <Button onClick={this.props.onCancel}>Cancel</Button>

            <Mutation
              mutation={UPDATE_TEST}
              variables={{
                test: {
                  title: this.state.title,
                  description: this.state.description,
                  exercises: {
                    connect: this.state.exercises.map(({ id }) => ({ id }))
                  },
                  exercisesOrder: { set: this.state.exercisesOrder }
                },
                where: {
                  id: this.state.id
                }
              }}
              onCompleted={this.props.onOk}
            >
              {(updateExercise, { loading }) => (
                <Button
                  type="primary"
                  loading={loading}
                  onClick={updateExercise}
                >
                  Save
                </Button>
              )}
            </Mutation>
          </Fragment>
        }
        afterClose={this.resetState}
        // NOTE: pass `onCancel` handler for close button in top right corner of modal
        onCancel={this.props.onCancel}
      >
        <Form layout="vertical">
          <Row gutter={20}>
            <Col span={10}>
              <TestTitle
                title={this.state.title}
                onChange={title => this.setState({ title })}
              />

              <TestDescription
                description={this.state.description}
                onChange={description => this.setState({ description })}
              />
            </Col>

            <Col span={14}>
              <ExercisesDraggableList
                exercises={this.state.exercises}
                onRowMove={this.moveExerciseRow}
                onRowRemove={this.removeExerciseRow}
                onExercisesAdd={() => {
                  this.setState({ isExercisesAddModalVisible: true });
                }}
              />

              <div style={{ marginLeft: 20 }}>
                <em>* You can drag and drop exercises to change their order</em>
              </div>
            </Col>
          </Row>
        </Form>

        <ExercisesAddModal
          exercises={this.state.exercises}
          exercisesOrder={this.state.exercisesOrder}
          isVisible={this.state.isExercisesAddModalVisible}
          onCancel={() => {
            this.setState({ isExercisesAddModalVisible: false });
          }}
          onOk={({ exercises, exercisesOrder }) => {
            this.setState({
              exercises,
              exercisesOrder,
              isExercisesAddModalVisible: false
            });
          }}
        />
      </Modal>
    );
  }
}

export default TestEditModal;
