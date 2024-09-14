import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import { useSelector } from 'react-redux';
function App() {
  const Signup = React.lazy(() => import('./pages/Signup'));
  const Home = React.lazy(() => import('./pages/Home'));

  const token = useSelector(
    state => state.tokenStore.token,
  );

  const AuthExists = ({ children }) => {
   return token ? <Navigate to={'/'} /> : children;
  };

  const RequireAuth = ({ children }) => {
   return token ? children : <Navigate to={'/signup'} />;
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route
          path="/signup"
          element={
            <AuthExists>
              <Signup />
            </AuthExists>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
