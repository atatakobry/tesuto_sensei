import React, { Fragment } from 'react';

import { Exercise } from './Exercise';

const ExercisePage = () => (
  <Fragment>
    <h1>Exercise</h1>

    <Exercise
      id={this.props.match.params.id}
      typeUid={this.props.match.params.typeUid}
    />
  </Fragment>
);

export default ExercisePage;
