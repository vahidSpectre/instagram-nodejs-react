import React from 'react';
import { useNavigate } from 'react-router-dom';

import sharedStyles from '../styles/layout.module.css';
import classes from './NotFound.module.css';
import { Button } from '@mui/material';
const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigate = path => {
    navigate(path);
  };
  return (
    <div className={`${classes.main} ${sharedStyles.shared}`}>
      NotFound
      <Button onClick={()=>handleNavigate('/')}>Home</Button>
    </div>
  );
};

export default NotFound;
