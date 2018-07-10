import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Form, Button } from 'antd';

import { UPDATE_EXERCISE } from '../../graphql/exercises';
import { exerciseTypes } from '../../dictionaries/index';

import isFieldVisible from './isFieldVisible';
import {
  IdField,
  TypeField,
  TitleField,
  DescriptionField,
  OptionField,
  AnswerField
} from './exerciseFields';

const fields = {
  [exerciseTypes.ET_10]: ['Id', 'Type', 'Title', 'Description', 'Answer'],
  [exerciseTypes.ET_20]: [
    'Id',
    'Type',
    'Title',
    'Description',
    'Options',
    'Answer'
  ]
};

class ExerciseEditModal extends Component {
  state = {
    id: '',
    type: {
      uid: undefined
    },
    title: '',
    description: '',
    options: ['', '', ''],
    answer: '',
    ...this.props.exercise
  };

  render() {
    const { isVisible, onCancel, onOk } = this.props;
    const { id, type, title, description, options, answer } = this.state;
    const typeUid = type && type.uid;
    const isCurrentFieldVisible = isFieldVisible.bind(null, fields, typeUid);

    // TODO: deal with `ExerciseUpdateInput`, `ExerciseWhereUniqueInput`; idk how it works and why it's so difficult T_T
    // NOTE: do i need to wrap the whole component with `Mutation`? :thinking:
    return (
      <Modal
        visible={isVisible}
        title="EDITING EXERCISE"
        footer={
          <Fragment>
            <Button onClick={onCancel}>Cancel</Button>

            <Mutation
              mutation={UPDATE_EXERCISE[typeUid]}
              // TODO: investigate do i need to prepare variables for different exercise types too or just send the whole data model?
              variables={{
                exercise: {
                  type: { connect: { uid: typeUid } },
                  title,
                  description,
                  options: { set: options },
                  answer
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
        // NOTE: pass `onCancel` handler for close button in top right corner of modal
        onCancel={onCancel}
      >
        <Form>
          {isCurrentFieldVisible('Id') && <IdField id={id} />}

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

export default ExerciseEditModal;
