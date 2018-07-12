import React, { Fragment } from 'react';

import { exerciseTypes } from '../../../dictionaries';
import { getLowerLatinPrefix } from '../../../common';

import styles from './TestDetails.module.scss';

const Title = ({ index, title }) => (
  <div className={styles.Title}>
    <h3>
      {index + 1}. {title}
    </h3>
  </div>
);

const Description = ({ description }) => (
  <div className={styles.Description}>{description}</div>
);

const Options = ({ options }) => (
  <div className={styles.Options}>
    <strong>Options:</strong>
    <ul>{options.map((option, index) => <li key={index}>{option}</li>)}</ul>
  </div>
);

const Answer = ({ options, answer }) => (
  <div className={styles.Answer}>
    <strong>Answer:</strong>
    <div>
      {options &&
        options.length >= 1 &&
        getLowerLatinPrefix(options.indexOf(answer))}
      {answer}
    </div>
  </div>
);

const renderExercise = ({
  index,
  exercise: { type, title, description, options, answer }
}) => {
  if (type.uid === exerciseTypes.ET_10) {
    return (
      <div key={index} className={styles.Exercise}>
        <Title index={index} title={title} />
        <Description description={description} />
        <Answer options={options} answer={answer} />
      </div>
    );
  }

  if (type.uid === exerciseTypes.ET_20) {
    return (
      <div key={index} className={styles.Exercise}>
        <Title index={index} title={title} />
        <Description description={description} />
        <Options options={options} />
        <Answer options={options} answer={answer} />
      </div>
    );
  }

  return null;
};

const TestDetails = ({ test }) => (
  <Fragment>
    {test.description && (
      <div className={styles.TestDescription}>{test.description}</div>
    )}

    {test.exercises &&
      test.exercises.length >= 1 && (
        <div className={styles.Exercises}>
          {test.exercises.map((exercise, index) =>
            renderExercise({ index, exercise })
          )}
        </div>
      )}
  </Fragment>
);

export default TestDetails;
