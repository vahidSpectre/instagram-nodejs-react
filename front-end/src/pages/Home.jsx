import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { tokenAction } from '../store/store';

import sharedStyles from '../styles/layout.module.css';
import classes from './Home.module.css';
const Home = () => {
  const token = useSelector(state => state.tokenStore.token);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(tokenAction.removeToken());
  };

  const handleCom = async () => {
    const res = await fetch('http://192.168.1.10:8080/comment/new', {
      method:"POST",
      headers: { Authorization: 'bearer ' + token },
      body:{}
    });
  };
  return (
    <section className={`${classes.main} ${sharedStyles.shared}`}>
      HOme
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleCom}>com</button>
    </section>
  );
};

export default Home;
