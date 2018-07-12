import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import Tests from './Tests';

class TestsPage extends Component {
  client = new ApolloClient({
    uri: prisma.url
  });

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Fragment>
          <h1>Tests</h1>

          <Tests />
        </Fragment>
      </ApolloProvider>
    );
  }
}

export default TestsPage;
