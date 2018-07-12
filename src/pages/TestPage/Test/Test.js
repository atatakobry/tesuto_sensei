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
              title={<h2 style={{ margin: 0 }}>{data.test.title}</h2>}
              extra={
                <Fragment>
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
                </Fragment>
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
