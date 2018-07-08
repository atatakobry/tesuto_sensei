import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, Form, Select, Input, Button } from 'antd';

import { exerciseTypes } from '../dictionaries';

import { UPDATE_EXERCISE } from '../graphql/exercises';

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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

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
              mutation={UPDATE_EXERCISE}
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
          <Form.Item {...formItemLayout} label="id">
            <Input disabled value={id} />
          </Form.Item>

          <Form.Item {...formItemLayout} label="type">
            <Select
              style={{ width: '100%' }}
              disabled
              defaultValue={typeUid}
              onSelect={typeUid => this.setState({ type: { uid: typeUid } })}
            >
              {exerciseTypes.LIST.map(({ uid, name }) => (
                <Select.Option key={uid} value={uid}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item {...formItemLayout} label="title">
            <Input
              placeholder="Input title..."
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="description">
            <Input.TextArea
              rows={3}
              placeholder="Input description..."
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Item>

          {options.map((option, index) => (
            <Form.Item
              key={index}
              {...formItemLayout}
              label={`option #${index + 1}`}
            >
              <Input
                placeholder={`Input option #${index + 1}...`}
                value={option}
                onChange={e => {
                  const _option = e.target.value;

                  this.setState(({ options }) => {
                    options[index] = _option;
                    return { options };
                  });
                }}
              />
            </Form.Item>
          ))}

          <Form.Item {...formItemLayout} label="answer">
            <Input
              placeholder="Input answer..."
              value={answer}
              onChange={e => this.setState({ answer: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default ExerciseEditModal;
