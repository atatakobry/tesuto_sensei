import React from 'react';
import { Form, Select, Input } from 'antd';

import { exerciseTypes } from '../../dictionaries/index';

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

const IdField = ({ id }) => (
  <Form.Item {...formItemLayout} label="id">
    <Input disabled value={id} />
  </Form.Item>
);

const TypeField = ({ typeUid, onChange }) => (
  <Form.Item {...formItemLayout} label="type">
    <Select
      style={{ width: '100%' }}
      disabled
      defaultValue={typeUid}
      onSelect={typeUid => onChange(typeUid)}
    >
      {exerciseTypes.LIST.map(({ uid, name }) => (
        <Select.Option key={uid} value={uid}>
          {name}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

const TitleField = ({ title, onChange }) => (
  <Form.Item {...formItemLayout} label="title">
    <Input
      placeholder="Input title..."
      value={title}
      onChange={e => onChange(e.target.value)}
    />
  </Form.Item>
);

const DescriptionField = ({ description, onChange }) => (
  <Form.Item {...formItemLayout} label="description">
    <Input.TextArea
      rows={3}
      placeholder="Input description..."
      value={description}
      onChange={e => onChange(e.target.value)}
    />
  </Form.Item>
);

const AnswerField = ({ answer, onChange }) => (
  <Form.Item {...formItemLayout} label="answer">
    <Input
      placeholder="Input answer..."
      value={answer}
      onChange={e => onChange(e.target.value)}
    />
  </Form.Item>
);

const OptionField = ({ index = 0, option, onChange }) => (
  <Form.Item {...formItemLayout} label={`option #${index + 1}`}>
    <Input.TextArea
      autosize
      placeholder={`Input option #${index + 1}...`}
      value={option}
      onChange={e => onChange(e.target.value)}
    />
  </Form.Item>
);

export {
  IdField,
  TypeField,
  TitleField,
  DescriptionField,
  OptionField,
  AnswerField
};
