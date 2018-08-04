import React, { Component } from 'react';
import update from 'immutability-helper';

const Context = React.createContext();

class Provider extends Component {
  initialState = {
    exercises: [],
    exercisesOrder: []
  };

  state = {
    ...this.initialState,
    exercises: this.props.exercises,
    exercisesOrder: this.props.exercisesOrder
  };

  componentWillReceiveProps = ({ exercises, exercisesOrder }) => {
    this.setState({ exercises, exercisesOrder });
  };

  resetState = () => {
    this.setState({
      ...this.initialState,
      exercises: this.props.exercises,
      exercisesOrder: this.props.exercisesOrder
    });
  };

  addExercise = ({ exercise }) => {
    this.setState(
      update(this.state, {
        exercises: { $push: [exercise] },
        exercisesOrder: { $push: [exercise.id] }
      })
    );
  };

  removeExercise = ({ exercise }) => {
    this.setState(
      update(this.state, {
        exercises: {
          $splice: [
            [this.state.exercises.findIndex(({ id }) => id === exercise.id), 1]
          ]
        },
        exercisesOrder: {
          $splice: [
            [this.state.exercisesOrder.findIndex(id => id === exercise.id), 1]
          ]
        }
      })
    );
  };

  render = () => (
    <Context.Provider
      value={{
        ...this.state,
        addExercise: this.addExercise,
        removeExercise: this.removeExercise,
        resetState: this.resetState
      }}
    >
      {this.props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
