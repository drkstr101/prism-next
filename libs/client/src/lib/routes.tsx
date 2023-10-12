import { Authenticate, PageLayout, RequireAuth } from '@coko/client';
import { Route, Routes } from 'react-router-dom';

import { AntDemo, ImageDemo, NavigationBar, Protected, Root, Teams } from './pages';

export const defaultRoutes = (
  <Authenticate>
    <PageLayout fadeInPages navComponent={NavigationBar} padPages>
      <Routes>
        <Route element={<Root />} path="/" />
        <Route element={<ImageDemo />} path="/imagedemo" />
        <Route element={<AntDemo />} path="/ant" />
        <Route element={<Teams />} path="/teams" />
        <Route
          path="/protected"
          element={
            <RequireAuth notAuthenticatedRedirectTo="/" requireIdentityVerification={false}>
              <Protected />
            </RequireAuth>
          }
        />
      </Routes>
    </PageLayout>
  </Authenticate>
);
