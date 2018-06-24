import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

function NavRoutes({ routes }) {
  return (
    <div>
      <Switch>
        {routes.map(({ link, component, exact }) => (
          <Route key={link} path={link} component={component} exact={exact} />
        ))}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default NavRoutes;
