import React from 'react';

import sharedStyles from '../styles/layout.module.css';
import classes from './Home.module.css';
const Home = () => {
  return (
    <section className={`${classes.main} ${sharedStyles.shared}`}>Home</section>
  );
};

export default Home;
