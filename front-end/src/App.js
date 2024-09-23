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
  const CreatePost = React.lazy(() => import('./pages/CreatePost'));

  const token = useSelector(state => state.tokenStore.token);

  const AuthExists = ({ children }) => {
    return token ? <Navigate to={'/'} /> : children;
  };

  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to={'/login'} />;
  };

  return (
    <div className='app'>
      <Suspense fallback={<div>loading...</div>}>  <Sidebar />
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
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path='/direct'
            element={
              <RequireAuth>
                <Direct />
              </RequireAuth>
            }
          />
          <Route
            path='/profile'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path='/new-post'
            element={
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
