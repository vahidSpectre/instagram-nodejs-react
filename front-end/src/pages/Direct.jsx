import React from 'react';
import { useSelector } from 'react-redux';

import sharedStyles from '../styles/layout.module.css';
import classes from './Direct.module.css';
const Direct = () => {
    const SidebarState = useSelector(state => state.sidebarStore.fullWidth);
  return (
    <section
      className={`${classes.main} ${sharedStyles.shared}  ${
        SidebarState ? sharedStyles.normal : sharedStyles.full
      }`}
    >
      <div className={classes.content}>
        <div className={classes.contacts_wrapper}></div>
        <div className={classes.messages_wrapper}></div>
      </div>
    </section>
  );
};

export default Direct;
