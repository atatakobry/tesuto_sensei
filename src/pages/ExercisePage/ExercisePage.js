import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import { Exercise } from './Exercise';

class ExercisePage extends Component {
  constructor() {
    super();

    this.client = new ApolloClient({
      uri: prisma.url,
      addTypename: false
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div>
          <h1>Exercise</h1>

          <Exercise
            id={this.props.match.params.id}
            typeUid={this.props.match.params.typeUid}
          />
        </div>
      </ApolloProvider>
    );
  }
}

export default ExercisePage;
