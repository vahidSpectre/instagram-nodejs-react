import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './layout/Sidebar';

import './App.css';
function App() {
  const Signup = React.lazy(() => import('./pages/Signup'));
  const Login = React.lazy(() => import('./pages/Login'));
  const Home = React.lazy(() => import('./pages/Home'));
  const Search = React.lazy(() => import('./pages/Search'));
  const Explore = React.lazy(() => import('./pages/Explore'));
  const Direct = React.lazy(() => import('./pages/Direct'));
  const Profile = React.lazy(() => import('./pages/Profile'));

  const token = useSelector(state => state.tokenStore.token);

  const AuthExists = ({ children }) => {
    return token ? <Navigate to={'/'} /> : children;
  };

  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to={'/login'} />;
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route
          path='/signup'
          element={
            <AuthExists>
              <Signup />
            </AuthExists>
          }
        />
        <Route
          path='/login'
          element={
            <AuthExists>
              <Login />
            </AuthExists>
          }
        />
        <Route
          path='/'
          element={
            <RequireAuth>
              <Sidebar />
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path='/search'
          element={
            <RequireAuth>
              <Sidebar />
              <Search />
            </RequireAuth>
          }
        />
        <Route
          path='/explore'
          element={
            <RequireAuth>
              <Sidebar />
              <Explore />
            </RequireAuth>
          }
        />
        <Route
          path='/direct'
          element={
            <RequireAuth>
              <Sidebar />
              <Direct />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Sidebar />
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
