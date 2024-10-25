import React from 'react';

import classes from './Spinner.module.css';
const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <div className={classes.spinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
