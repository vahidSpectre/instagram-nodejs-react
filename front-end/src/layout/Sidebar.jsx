import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewPost from '../components/NewPost';
import { windowsSize } from '../utils/helpers';

import ss from '../styles/layout.module.css';
import classes from './Sidebar.module.css';
import { Instagram, MoreVert } from '@mui/icons-material';
import { Icon, IconButton, Menu } from '@mui/material';
const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState('');

  const navigate = useNavigate();

  const hadnleCloseModal = () => setOpenModal(false);

  window.addEventListener('resize', () => setSize(windowsSize));

  const routeCheck = () => {
    if (size === 'x-small' || size === 'small') {
      navigate('/new-post');
    } else {
      setOpenModal(true);
      navigate('/');
    }
  };

  return (
    <div className={`${classes.main} ${ss.sb}`}>
      <div className={classes.actions_wrapper}>
        <div className={classes.logo_section}><Instagram/></div>
        <div className={classes.action_section}>
          <button onClick={() => navigate('/')}>home</button>
          <button onClick={() => navigate('/search')}>search</button>
          <button onClick={() => navigate('/explore')}>explore</button>

          {size === 'medium' || size === 'large' || size === 'x-large' ? (
            <>
              <button onClick={() => navigate('/direct')}>direct</button>
              <button onClick={() => navigate('/notifications')}>
                notifications
              </button>
            </>
          ) : (
            ''
          )}
          <button onClick={routeCheck}>create</button>
          <button onClick={() => navigate('/profile')}>profile</button>
        </div>
      </div>
      <div className={classes.menu_section}>
        <IconButton>
          <Menu className={classes.menu} />
        </IconButton>
      </div>
      {size === 'medium' || size === 'large' || size === 'x-large' ? (
        <NewPost open={openModal} onClose={hadnleCloseModal} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;
