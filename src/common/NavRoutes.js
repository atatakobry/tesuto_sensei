import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes } from '../configs';

function NavRoutes() {
  return (
    <div>
      <Switch>
        {routes.map(({ to, component, exact }) => (
          <Route key={to} path={to} component={component} exact={exact} />
        ))}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default NavRoutes;
