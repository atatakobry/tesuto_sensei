import React, { Component } from 'react';
import update from 'immutability-helper';

const Context = React.createContext();

class Provider extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    exercises: [],
    exercisesOrder: [],
    ...this.props.test
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
    <Context.Provider
      value={{
        ...this.state,
        setState: this.setState.bind(this),
        moveExerciseRow: this.moveExerciseRow,
        removeExerciseRow: this.removeExerciseRow
      }}
    >
      {this.props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
