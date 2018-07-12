import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import Test from './Test';

class TestPage extends Component {
  client = new ApolloClient({
    uri: prisma.url
  });

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Fragment>
          <h1>Test</h1>

          <Test id={this.props.match.params.id} />
        </Fragment>
      </ApolloProvider>
    );
  }
}

export default TestPage;
