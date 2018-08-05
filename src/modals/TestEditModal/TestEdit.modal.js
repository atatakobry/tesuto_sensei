import React, { Component, Fragment } from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Mutation } from 'react-apollo';
import { Form, Button, Row, Col } from 'antd';

import { UPDATE_TEST } from '../../graphql/tests';
import { withApolloProvider, Modal } from '../../common';

import { Context, Provider } from './store';
import {
  TestTitle,
  TestDescription,
  ExercisesDraggableList
} from './testEditComponents';
import ExercisesAddToTestModal from '../ExercisesAddToTestModal';

class TestEditModal extends Component {
  showExercisesAddToTestModal = ({ exercises, exercisesOrder, onConfirm }) => {
    Modal.show({
      modal: (
        <ExercisesAddToTestModal
          exercises={exercises}
          exercisesOrder={exercisesOrder}
        />
      ),
      onConfirm
    });
  };

  render = () => (
    <Provider test={this.props.test}>
      <Context.Consumer>
        {({
          id,
          title,
          description,
          exercises,
          exercisesOrder,
          setState,
          moveExerciseRow,
          removeExerciseRow
        }) => (
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
                      title,
                      description,
                      exercises: {
                        connect: exercises.map(({ id }) => ({ id }))
                      },
                      exercisesOrder: { set: exercisesOrder }
                    },
                    where: { id }
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
            // NOTE: pass `onCancel` handler for: close button in top right corner of modal; closable mask
            onCancel={this.props.onCancel}
          >
            <Form layout="vertical">
              <Row gutter={20}>
                <Col span={10}>
                  <TestTitle
                    title={title}
                    onChange={title => setState({ title })}
                  />

                  <TestDescription
                    description={description}
                    onChange={description => setState({ description })}
                  />
                </Col>

                <Col span={14}>
                  <ExercisesDraggableList
                    exercises={exercises}
                    onRowMove={moveExerciseRow}
                    onRowRemove={removeExerciseRow}
                    onExercisesAdd={() =>
                      this.showExercisesAddToTestModal({
                        exercises,
                        exercisesOrder,
                        // NOTE: update test's exercises after editing
                        onConfirm: ({ exercises, exercisesOrder }) =>
                          setState({ exercises, exercisesOrder })
                      })
                    }
                  />

                  <div style={{ marginLeft: 20 }}>
                    <em>
                      * You can drag and drop exercises to change their order
                    </em>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal>
        )}
      </Context.Consumer>
    </Provider>
  );
}

export default compose(
  withState('isVisible', 'setVisibility', true),
  withHandlers({
    onCancel: ({ setVisibility }) => () => setVisibility(false),
    onOk: ({ setVisibility, onConfirm }) => () => {
      setVisibility(false);
      onConfirm();
    }
  }),
  withApolloProvider
)(TestEditModal);
