import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Instagram } from '@mui/icons-material';

import { modalActions } from '../store/store';

import NewPost from '../components/NewPost';
import { windowsSize } from '../utils/helpers';

import ss from '../styles/layout.module.css';
import classes from './Sidebar.module.css';
const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalState = useSelector(state => state.modalStore.modal);

  const hadnleCloseModal = () => {
    setOpenModal(modalState);
    dispatch(modalActions.closeModal());
  };

  window.addEventListener('resize', () => setSize(windowsSize));

  const routeCheck = () => {
    if (size === 'x-small' || size === 'small') {
      navigate('/new-post');
    } else {
      dispatch(modalActions.openModal());
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('load', setSize(windowsSize));
  }, []);

  useEffect(() => {
    if (modalState) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [modalState]);

  return (
    <div className={`${classes.main} ${ss.sb}`}>
      <div className={classes.actions_wrapper}>
        <div className={classes.logo_section}>
          <Instagram />
        </div>
        <div className={classes.action_section}>
          <button onClick={() => navigate('/')}>home</button>
          <button onClick={() => navigate('/search')}>search</button>
          <button onClick={() => navigate('/explore')}>explore</button>

          {size === 'm' || size === 'l' || size === 'xl' ? (
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
      {/* <div className={classes.menu_section}>
        <Menu className={classes.menu} open={true } />
      </div> */}
      {size === 'm' || size === 'l' || size === 'xl' ? (
        <NewPost open={openModal} onClose={hadnleCloseModal} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;
