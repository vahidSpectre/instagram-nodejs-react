import React from 'react';

import { useDispatch } from 'react-redux';
import { tokenAction } from '../store/store';

import sharedStyles from '../styles/layout.module.css';
import classes from './Home.module.css';
const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(tokenAction.removeToken());
  };
  return (
    <section className={`${classes.main} ${sharedStyles.shared}`}>
      HOme
      <button onClick={handleLogout}>Log out</button>
    </section>
  );
};

export default Home;
