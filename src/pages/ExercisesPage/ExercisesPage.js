import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Row, Col, Card } from 'antd';

import { prisma } from '../../configs';

import ExercisesList from './Exercises/ExercisesList';

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

          <Row gutter={20}>
            <Col span={16}>
              <Card>
                <ExercisesList />
              </Card>
            </Col>
          </Row>
        </div>
      </ApolloProvider>
    );
  }
}

export default ExercisesPage;
