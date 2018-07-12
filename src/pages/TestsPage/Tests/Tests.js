import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Card, Button } from 'antd';

import { GET_TESTS } from '../../../graphql/tests';
import { Loader } from '../../../common';

import TestsList from './TestsList';

class Tests extends Component {
  render() {
    return (
      <Query query={GET_TESTS}>
        {({ loading, data }) => {
          if (loading) return <Loader />;

          return (
            <Card
              style={{ marginTop: 20 }}
              title={<h3 style={{ margin: 0 }}>List of available tests</h3>}
              extra={
                <Button size="small" icon="plus" onClick={() => {}}>
                  New test
                </Button>
              }
            >
              <TestsList tests={data.tests} />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Tests;
