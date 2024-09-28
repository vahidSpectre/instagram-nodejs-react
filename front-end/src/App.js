import React, { Suspense, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './layout/Sidebar';
import Spinner from './components/Spinner';

import './App.css';

function App() {
  const [size, setSize] = useState('');

  const Signup = React.lazy(() => import('./pages/Signup'));
  const Login = React.lazy(() => import('./pages/Login'));
  const Home = React.lazy(() => import('./pages/Home'));
  const Explore = React.lazy(() => import('./pages/Explore'));
  const Direct = React.lazy(() => import('./pages/Direct'));
  const Profile = React.lazy(() => import('./pages/Profile'));
  const CreatePost = React.lazy(() => import('./pages/CreatePost'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));

  const token = useSelector(state => state.tokenStore.token);

  const AuthExists = ({ children }) => {
    return token ? <Navigate to={'/'} /> : children;
  };

  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to={'/login'} />;
  };

  const windowsSize = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      return 'xs';
    }
    if (width > 576 && width <= 768) {
      return 's';
    }
    if (width > 768 && width <= 1024) {
      return 'm';
    }
    if (width > 1024 && width <= 1440) {
      return 'l';
    }
    if (width > 1440) {
      return 'xl';
    }
  };

  window.addEventListener('load', () => setSize(windowsSize));
  window.addEventListener('resize', () => setSize(windowsSize));

  return (
    <div className='app'>
      <Suspense
        fallback={
          <div className='spinner_backdrop'>
            <Spinner />
          </div>
        }
      >
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
                <Sidebar windowSize={size} />
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/explore'
            element={
              <RequireAuth>
                <Sidebar windowSize={size} />
                <Explore windowSize={size} />
              </RequireAuth>
            }
          />
          <Route
            path='/direct'
            element={
              <RequireAuth>
                <Sidebar windowSize={size} />
                <Direct />
              </RequireAuth>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <RequireAuth>
                <Sidebar windowSize={size} />
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path='/new-post'
            element={
              <RequireAuth>
                <Sidebar windowSize={size} />
                <CreatePost />
              </RequireAuth>
            }
          />
          <Route
            path='/*'
            element={
              <RequireAuth>
                <Sidebar windowSize={size} />
                <NotFound />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
