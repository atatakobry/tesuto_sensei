import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Card, Button, Divider } from 'antd';

import { GET_TEST, DELETE_TEST } from '../../../graphql/tests';
import { Modal, Loader } from '../../../common';
import { TestEditModal } from '../../../modals';

import TestDetails from './TestDetails';

class Test extends Component {
  showTestDeleteConfirm = ({ onOk }) => {
    Modal.confirm({
      title: 'Are you sure want to delete this test?',
      cancelText: 'No',
      okText: 'Yes',
      okType: 'danger',
      onOk: onOk
    });
  };

  showTestEditModal = ({ test, onConfirm }) => {
    Modal.show({
      modal: <TestEditModal test={test} />,
      onConfirm
    });
  };

  render = () => (
    <Query query={GET_TEST} variables={{ id: this.props.id }}>
      {({ loading, data, refetch }) => {
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
                            this.showTestDeleteConfirm({ onOk: deleteTest })
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
                  onClick={() =>
                    this.showTestEditModal({
                      test,
                      // NOTE: update test after editing
                      // TODO: mb find the way to manually update cache, w/o gql request
                      onConfirm: refetch
                    })
                  }
                >
                  Edit test
                </Button>
              </div>
            }
          >
            <TestDetails test={test} />
          </Card>
        );
      }}
    </Query>
  );
}

export default Test;
