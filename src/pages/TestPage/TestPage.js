import React, { Fragment } from 'react';

import Test from './Test';

const TestPage = ({ match }) => (
  <Fragment>
    <h1>Test</h1>

    <Test id={match.params.id} />
  </Fragment>
);

export default TestPage;
