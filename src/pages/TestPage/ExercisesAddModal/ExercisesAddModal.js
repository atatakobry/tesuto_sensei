import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'antd';

import { exerciseTypes } from '../../../dictionaries';

import { Context, Provider } from './store';
import Exercises from './Exercises';

class ExercisesAddModal extends Component {
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

export default ExercisesAddModal;
