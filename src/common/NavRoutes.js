import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

function NavRoutes({ routes }) {
  return (
    <div>
      <Switch>
        {routes.map(({ path, component, exact }) => (
          <Route key={path} path={path} component={component} exact={exact} />
        ))}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default NavRoutes;
