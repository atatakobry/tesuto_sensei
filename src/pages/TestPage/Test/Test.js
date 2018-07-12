import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Card, Button, Divider } from 'antd';

import { GET_TEST, DELETE_TEST } from '../../../graphql/tests';
import { Loader, onTestDeleteConfirm } from '../../../common';

import TestDetails from './TestDetails';

class Test extends Component {
  render() {
    return (
      <Query query={GET_TEST} variables={{ id: this.props.id }}>
        {({ loading, data }) => {
          if (loading) return <Loader />;

          return (
            <Card
              title={
                <Fragment>
                  <h2 style={{ margin: 0 }}>{data.test.title}</h2>
                  <div>(number of exercises: {data.test.exercises.length})</div>
                </Fragment>
              }
              extra={
                <div className="ant-card-extra-inner">
                  <Route
                    render={({ history }) => (
                      <Mutation
                        mutation={DELETE_TEST}
                        variables={{ id: this.props.id }}
                        onCompleted={() => {
                          history.push('/tests');
                        }}
                      >
                        {(deleteTest, { loading }) => (
                          <Button
                            size="small"
                            type="danger"
                            icon="delete"
                            loading={loading}
                            onClick={() =>
                              onTestDeleteConfirm({ onOk: deleteTest })
                            }
                          >
                            Delete test
                          </Button>
                        )}
                      </Mutation>
                    )}
                  />

                  <Divider type="vertical" />

                  <Button size="small" icon="edit" onClick={() => {}}>
                    Edit exercise
                  </Button>
                </div>
              }
            >
              <TestDetails test={data.test} />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default Test;
