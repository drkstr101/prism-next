import { Authenticate, PageLayout, RequireAuth } from '@coko/client';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AntDemo, ImageDemo, NavigationBar, Protected, Root, Teams } from './pages';

const routes = (
  <Authenticate>
    <PageLayout fadeInPages navComponent={NavigationBar} padPages>
      <Switch>
        <Route component={Root} exact path="/" />
        <Route component={ImageDemo} exact path="/imagedemo" />
        <Route component={AntDemo} exact path="/ant" />
        <Route component={Teams} exact path="/teams" />

        <Route
          exact
          path="/protected"
          render={() => (
            <RequireAuth notAuthenticatedRedirectTo="/" requireIdentityVerification={false}>
              <Protected />
            </RequireAuth>
          )}
        />
      </Switch>
    </PageLayout>
  </Authenticate>
);

export default routes;
