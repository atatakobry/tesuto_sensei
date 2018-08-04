import React, { Component, Fragment } from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Mutation } from 'react-apollo';
import { Form, Button, Row, Col } from 'antd';
import update from 'immutability-helper';

import { UPDATE_TEST } from '../../graphql/tests';
import { withApolloProvider, Modal } from '../../common';

import {
  TestTitle,
  TestDescription,
  ExercisesDraggableList
} from './testEditComponents';
import ExercisesAddToTestModal from '../ExercisesAddToTestModal';

class TestEditModal extends Component {
  initialState = {
    id: '',
    title: '',
    description: '',
    exercises: [],
    exercisesOrder: [],
    isExercisesAddToTestModalVisible: false
  };

  state = {
    ...this.initialState,
    ...this.props.test
  };

  showExercisesAddToTestModal = ({ exercises, exercisesOrder }) => {
    Modal.show({
      modal: (
        <ExercisesAddToTestModal
          exercises={exercises}
          exercisesOrder={exercisesOrder}
        />
      ),
      onDismiss: () => console.log('onDismiss'),
      onConfirm: () => console.log('onConfirm')
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

  render = () => (
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
              <Button type="primary" loading={loading} onClick={updateExercise}>
                Save
              </Button>
            )}
          </Mutation>
        </Fragment>
      }
      // NOTE: pass `onCancel` handler for: close button in top right corner of modal; closable mask
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
              onExercisesAdd={() =>
                this.showExercisesAddToTestModal({
                  exercises: this.state.exercises,
                  exercisesOrder: this.state.exercisesOrder
                })
              }
            />

            <div style={{ marginLeft: 20 }}>
              <em>* You can drag and drop exercises to change their order</em>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default compose(
  withState('isVisible', 'setVisibility', true),
  withHandlers({
    onCancel: ({ setVisibility, onDismiss }) => () => {
      setVisibility(false);
      onDismiss();
    },
    onOk: ({ setVisibility, onConfirm }) => () => {
      setVisibility(false);
      onConfirm();
    }
  }),
  withApolloProvider
)(TestEditModal);
