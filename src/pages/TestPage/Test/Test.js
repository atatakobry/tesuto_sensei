import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Card } from 'antd';

import { GET_TEST } from '../../../graphql/tests';
import { Loader } from '../../../common';

import TestDetails from './TestDetails';

class Test extends Component {
  render() {
    return (
      <Query query={GET_TEST} variables={{ id: this.props.id }}>
        {({ loading, data }) => {
          if (loading) return <Loader />;

          return (
            <Card title={<h2 style={{ margin: 0 }}>{data.test.title}</h2>}>
              <TestDetails test={data.test} />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Test;
