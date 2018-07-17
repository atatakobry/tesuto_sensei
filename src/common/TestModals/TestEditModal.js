import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Form, Button, Row, Col } from 'antd';
import update from 'immutability-helper';

import { UPDATE_TEST } from '../../graphql/tests';

import {
  TitleField,
  DescriptionField,
  ExercisesDraggableList
} from './testFields';

class TestEditModal extends Component {
  initialState = {
    id: '',
    title: '',
    description: '',
    exercises: [],
    exercisesOrder: []
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
    const { isVisible, onCancel, onOk } = this.props;
    const { id, title, description, exercises, exercisesOrder } = this.state;

    // TODO: deal with `TestUpdateInput`, `TestWhereUniqueInput`; idk how it works and why it's so difficult T_T
    // NOTE: do i need to wrap the whole component with `Mutation`? :thinking:
    return (
      <Modal
        width={1360}
        visible={isVisible}
        title="EDITING TEST"
        footer={
          <Fragment>
            <Button onClick={onCancel}>Cancel</Button>

            <Mutation
              mutation={UPDATE_TEST}
              variables={{
                test: {
                  title,
                  description,
                  exercises: { connect: exercises.map(({ id }) => ({ id })) },
                  exercisesOrder: { set: exercisesOrder }
                },
                where: {
                  id
                }
              }}
              onCompleted={onOk}
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
        onCancel={onCancel}
      >
        <Form layout="vertical">
          <Row gutter={20}>
            <Col span={10}>
              <TitleField
                title={title}
                onChange={title => this.setState({ title })}
              />

              <DescriptionField
                description={description}
                onChange={description => this.setState({ description })}
              />
            </Col>

            <Col span={14}>
              <ExercisesDraggableList
                exercises={exercises}
                onRowMove={this.moveExerciseRow}
                onRowRemove={this.removeExerciseRow}
              />

              <div style={{ marginLeft: 20 }}>
                *You can drag and drop exercises to change their order
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default TestEditModal;
