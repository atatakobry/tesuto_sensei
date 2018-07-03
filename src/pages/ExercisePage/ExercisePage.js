import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import Exercise from './Exercise/Exercise';

class ExercisePage extends Component {
  constructor() {
    super();

    this.client = new ApolloClient({
      uri: prisma.url
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div>
          <h1>Exercise</h1>

          <Exercise id={this.props.match.params.id} />
        </div>
      </ApolloProvider>
    );
  }
}

export default ExercisePage;
