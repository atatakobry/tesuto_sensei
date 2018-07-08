import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import { exerciseTypes } from '../../dictionaries';

import { Exercises } from './Exercises';

class ExercisesPage extends Component {
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
          <h1>Exercises</h1>

          {exerciseTypes.LIST.map(type => (
            <Exercises key={type.uid} type={type} />
          ))}
        </div>
      </ApolloProvider>
    );
  }
}

export default ExercisesPage;
