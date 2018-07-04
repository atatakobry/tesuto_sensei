import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import { ExerciseContainer } from './Exercise';

class ExercisePage extends Component {
  constructor() {
    super();

    this.client = new ApolloClient({
      uri: prisma.url,
      addTypename: false
    });
  }

  render() {
    const id = this.props.match.params.id;

    return (
      <ApolloProvider client={this.client}>
        <div>
          <h1>Exercise</h1>

          <ExerciseContainer id={id} />
        </div>
      </ApolloProvider>
    );
  }
}

export default ExercisePage;
