import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { prisma } from '../../configs';

import TasksList from './Tasks/TasksList';

class TasksPage extends Component {
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
          <h1>Tasks</h1>

          <TasksList />
        </div>
      </ApolloProvider>
    );
  }
}

export default TasksPage;
