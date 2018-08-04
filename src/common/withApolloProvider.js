import React, { Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../configs';

const withApolloProvider = BaseComponent => {
  class WithApolloProvider extends Component {
    client = new ApolloClient({
      uri: prisma.url
    });

    render = () => (
      <ApolloProvider client={this.client}>
        <BaseComponent {...this.props} />
      </ApolloProvider>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withApolloProvider'))(
      WithApolloProvider
    );
  }

  return WithApolloProvider;
};

export default withApolloProvider;
