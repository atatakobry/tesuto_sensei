import React from 'react';
import { Link, matchPath, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

function Breadcrumbs({ location, routes }) {
  // NOTE: based on example of antd breadcrumbs with react-router 4
  const parts = location.pathname.split('/').filter(i => i);
  const paths = parts.map(
    (_, index) => `/${parts.slice(0, index + 1).join('/')}`
  );

  // NOTE: don't show breadcrumbs for top-level pages
  if (paths && paths.length < 2) {
    return null;
  }

  return (
    <Breadcrumb style={{ padding: '0 0 16px' }}>
      {paths.map(path => {
        const currentRoute = routes.find(route => matchPath(path, route));

        if (!currentRoute) {
          return null;
        }

        return (
          <Breadcrumb.Item key={path}>
            {location.pathname === path ? (
              // NOTE: display title of current page in breadcrumbs as plain text, not link
              <span>{currentRoute.title}</span>
            ) : (
              // NOTE: using `path` instead of `currentRoute.path` allows to link to `path/param`, not `path/:param`
              <Link to={path}>{currentRoute.title}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default withRouter(Breadcrumbs);
