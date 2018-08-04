import React, { Component, Fragment } from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Button } from 'antd';

import { exerciseTypes } from '../../dictionaries';
import { withApolloProvider, Modal } from '../../common';

import { Context, Provider } from './store';
import Exercises from './Exercises';

class ExercisesAddToTestModal extends Component {
  render() {
    return (
      <Provider
        exercises={this.props.exercises}
        exercisesOrder={this.props.exercisesOrder}
      >
        <Context.Consumer>
          {({ exercises, exercisesOrder, resetState }) => (
            <Modal
              width={1360}
              visible={this.props.isVisible}
              title="ADDING EXERCISES TO TEST"
              footer={
                <Fragment>
                  <Button onClick={this.props.onCancel}>Cancel</Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      this.props.onOk({ exercises, exercisesOrder });
                    }}
                  >
                    Save
                  </Button>
                </Fragment>
              }
              afterClose={resetState}
              // NOTE: pass `onCancel` handler for close button in top right corner of modal
              onCancel={this.props.onCancel}
            >
              <div style={{ marginBottom: 20 }}>
                <em>
                  Note: the order of exercises in test depends on the order you
                  adding / removing exercises below
                </em>
              </div>

              {exerciseTypes.LIST.map(({ uid }) => (
                <Exercises key={uid} typeUid={uid} />
              ))}
            </Modal>
          )}
        </Context.Consumer>
      </Provider>
    );
  }
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
)(ExercisesAddToTestModal);
