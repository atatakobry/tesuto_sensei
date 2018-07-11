import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Form, Button } from 'antd';

import { CREATE_EXERCISE, GET_EXERCISES } from '../../graphql/exercises';
import { exerciseTypes } from '../../dictionaries/index';

import isFieldVisible from './isFieldVisible';
import {
  TypeField,
  TitleField,
  DescriptionField,
  OptionField,
  AnswerField
} from './exerciseFields';

const fields = {
  [exerciseTypes.ET_10]: ['Type', 'Title', 'Description', 'Answer'],
  [exerciseTypes.ET_20]: ['Type', 'Title', 'Description', 'Options', 'Answer']
};

class ExerciseCreateModal extends Component {
  initialState = {
    type: {
      uid: undefined
    },
    title: '',
    description: '',
    options: ['', '', ''],
    answer: ''
  };

  state = {
    ...this.initialState,
    ...this.props.exercise
  };

  resetState = () => {
    this.setState({
      ...this.initialState,
      ...this.props.exercise
    });
  };

  render() {
    const { isVisible, onCancel, onOk } = this.props;
    const { type, title, description, options, answer } = this.state;
    const typeUid = type && type.uid;
    const isCurrentFieldVisible = isFieldVisible.bind(null, fields, typeUid);

    // TODO: deal with `ExerciseCreateInput`; idk how it works and why it's so difficult T_T
    // NOTE: do i need to wrap the whole component with `Mutation`? :thinking:
    return (
      <Modal
        visible={isVisible}
        title="NEW EXERCISE"
        footer={
          <Fragment>
            <Button onClick={onCancel}>Cancel</Button>

            <Mutation
              mutation={CREATE_EXERCISE[typeUid]}
              // TODO: investigate do i need to prepare variables for different exercise types too or just send the whole data model?
              variables={{
                exercise: {
                  type: { connect: { uid: typeUid } },
                  title,
                  description,
                  options: { set: options },
                  answer
                }
              }}
              update={(cache, { data: { createExercise } }) => {
                const { exercises } = cache.readQuery({
                  query: GET_EXERCISES[typeUid],
                  variables: { typeUid }
                });

                cache.writeQuery({
                  query: GET_EXERCISES[typeUid],
                  variables: { typeUid },
                  data: {
                    exercises: [].concat(exercises, createExercise)
                  }
                });
              }}
              onCompleted={onOk}
            >
              {(createExercise, { loading }) => (
                <Button
                  type="primary"
                  loading={loading}
                  onClick={createExercise}
                >
                  Create
                </Button>
              )}
            </Mutation>
          </Fragment>
        }
        afterClose={this.resetState}
        // NOTE: pass `onCancel` handler for close button in top right corner of modal
        onCancel={onCancel}
      >
        <Form>
          {isCurrentFieldVisible('Type') && (
            <TypeField
              typeUid={typeUid}
              onChange={typeUid => this.setState({ type: { uid: typeUid } })}
            />
          )}

          {isCurrentFieldVisible('Title') && (
            <TitleField
              title={title}
              onChange={title => this.setState({ title })}
            />
          )}

          {isCurrentFieldVisible('Description') && (
            <DescriptionField
              description={description}
              onChange={description => this.setState({ description })}
            />
          )}

          {isCurrentFieldVisible('Options') &&
            options.map((option, index) => (
              <OptionField
                key={index}
                index={index}
                option={option}
                onChange={option =>
                  this.setState(({ options }) => ({
                    options: Object.assign([...options], { [index]: option })
                  }))
                }
              />
            ))}

          {isCurrentFieldVisible('Answer') && (
            <AnswerField
              answer={answer}
              onChange={answer => this.setState({ answer })}
            />
          )}
        </Form>
      </Modal>
    );
  }
}

export default ExerciseCreateModal;
