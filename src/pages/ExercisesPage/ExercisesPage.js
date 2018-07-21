import React, { Fragment } from 'react';

import { exerciseTypes } from '../../dictionaries';

import { Exercises } from './Exercises';

const ExercisesPage = () => (
  <Fragment>
    <h1>Exercises</h1>

    {exerciseTypes.LIST.map(({ uid }) => <Exercises key={uid} typeUid={uid} />)}
  </Fragment>
);

export default ExercisesPage;
