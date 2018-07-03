import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Row, Col, Card } from 'antd';

import { prisma } from '../../configs';

import ExercisesList from './Exercises/ExercisesList';
import ExerciseCreate from './Exercises/ExerciseCreate';

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
            <Col span={14}>
              <Card>
                <ExercisesList />
              </Card>
            </Col>

            <Col span={10}>
              <Card>
                <ExerciseCreate />
              </Card>
            </Col>
          </Row>
        </div>
      </ApolloProvider>
    );
  }
}

export default ExercisesPage;
