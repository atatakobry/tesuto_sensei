import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Card, Button, Divider } from 'antd';

import { GET_TEST, DELETE_TEST } from '../../../graphql/tests';
import { Loader, TestEditModal, onTestDeleteConfirm } from '../../../common';

import TestDetails from './TestDetails';

class Test extends Component {
  state = {
    isTestEditModalVisible: false
  };

  onTestEditModalShow = () => {
    this.setState({ isTestEditModalVisible: true });
  };

  onTestEditModalClose = () => {
    this.setState({ isTestEditModalVisible: false });
  };

  render() {
    return (
      <Query query={GET_TEST} variables={{ id: this.props.id }}>
        {({ loading, data }) => {
          if (loading) return <Loader />;

          let { test } = data;
          // NOTE: sort exercises by declared in `exercisesOrder` order
          test = {
            ...test,
            // NOTE: use `[...test.exercises].sort` as immutable sort
            exercises: [...test.exercises].sort(
              (a, b) =>
                test.exercisesOrder.indexOf(a.id) >
                test.exercisesOrder.indexOf(b.id)
            )
          };

          return (
            <Fragment>
              <Card
                title={
                  <Fragment>
                    <h2 style={{ margin: 0 }}>{test.title}</h2>
                    <div>(number of exercises: {test.exercises.length})</div>
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

                    <Button
                      size="small"
                      icon="edit"
                      onClick={this.onTestEditModalShow}
                    >
                      Edit test
                    </Button>
                  </div>
                }
              >
                <TestDetails test={test} />
              </Card>

              <TestEditModal
                test={test}
                isVisible={this.state.isTestEditModalVisible}
                onCancel={this.onTestEditModalClose}
                onOk={this.onTestEditModalClose}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Test;
