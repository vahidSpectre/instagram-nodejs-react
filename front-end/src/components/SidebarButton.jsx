import React from 'react';

import classes from './SidebarButton.module.css';
import { Search } from '@mui/icons-material';
const SidebarButton = ({ compoenent, text, onClick }) => {
  return (
    <div className={classes.main} onClick={onClick}>
          <div className={ classes.icon}>{compoenent}</div>
          <p className={classes.text }>{text}</p>
    </div>
  );
};

export default SidebarButton;
