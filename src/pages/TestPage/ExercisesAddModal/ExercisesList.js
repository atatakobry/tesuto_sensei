import React, { Component, Fragment } from 'react';
import { Button, Switch, Table } from 'antd';

import { exerciseTypes } from '../../../dictionaries';
import { getLowerLatinPrefix } from '../../../common';

import { Context } from './store';

function isExerciseAdded(exercisesOrder = [], exerciseId) {
  return exercisesOrder.includes(exerciseId);
}

const addedColumn = {
  width: '60px',
  dataIndex: '',
  render: exercise => (
    <Context.Consumer>
      {({ exercises, exercisesOrder, addExercise, removeExercise }) => (
        <div style={{ textAlign: 'center' }}>
          <Switch
            size="small"
            checked={isExerciseAdded(exercisesOrder, exercise.id)}
            onChange={isChecked => {
              isChecked
                ? addExercise({ exercise })
                : removeExercise({ exercise });
            }}
          />
        </div>
      )}
    </Context.Consumer>
  )
};

const mainInfoColumn = {
  title: <strong>TITLE / DESCRIPTION</strong>,
  render: ({ title, description }) => (
    <Fragment>
      <div>{title}</div>
      <div>
        <em>{description}</em>
      </div>
    </Fragment>
  )
};

const optionsColumn = {
  title: <strong>OPTIONS</strong>,
  dataIndex: 'options',
  render: options => <pre>{JSON.stringify(options, null, 2)}</pre>
};

const answerColumn = {
  title: <strong>ANSWER</strong>,
  render: ({ answer, options }) => (
    <Fragment>
      {options &&
        options.length >= 1 &&
        getLowerLatinPrefix(options.indexOf(answer))}
      {answer}
    </Fragment>
  )
};

const actionsColumn = {
  width: '50px',
  render: ({ type, id }) => (
    <div style={{ textAlign: 'center' }}>
      <Button
        size="small"
        icon="eye"
        onClick={() => {
          // NOTE: open exercise in new tab; focus on it
          const tab = window.open(`/exercises/${type.uid}/${id}`, '_blank');
          tab.focus();
        }}
      />
    </div>
  )
};

const columns = {
  [exerciseTypes.ET_10]: [
    addedColumn,
    mainInfoColumn,
    answerColumn,
    actionsColumn
  ],
  [exerciseTypes.ET_20]: [
    addedColumn,
    mainInfoColumn,
    optionsColumn,
    answerColumn,
    actionsColumn
  ]
};

class ExercisesList extends Component {
  render() {
    return (
      <Table
        bordered
        size="small"
        rowKey="id"
        columns={columns[this.props.exercises[0].type.uid]}
        dataSource={this.props.exercises}
      />
    );
  }
}

export default ExercisesList;
