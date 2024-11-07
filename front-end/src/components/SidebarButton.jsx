import React, { forwardRef, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import classes from './SidebarButton.module.css';
const SidebarButton = ({ compoenent, text, onClick, path, className }) => {
  const location = useLocation().pathname.split('/').at(1);
  const r = useRef();
  const SidebarState = useSelector(state => state.sidebarStore.fullWidth);

  return (
    <button
      className={`${classes.main} ${
        location === path ? classes.active : ''
      } ${className}`}
      onClick={onClick}
      style={{
        justifyContent: `${!SidebarState ? 'center' : ''}`,
        width: `${!SidebarState ? '80%' : '90%'}`,
      }}
      ref={r}
    >
      <div className={classes.icon}>{compoenent}</div>
      {SidebarState && text && <p className={classes.text}>{text}</p>}
    </button>
  );
};

export default SidebarButton;
