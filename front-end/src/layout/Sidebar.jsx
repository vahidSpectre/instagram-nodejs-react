import React, { useEffect, useState, memo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddBox,
  Cottage,
  Explore,
  FavoriteBorder,
  Instagram,
  Search,
  Send,
} from '@mui/icons-material';
import { Avatar, Menu } from '@mui/material';

import { modalActions, sidebarAction } from '../store/store';

import NewPost from '../components/NewPost';
import SearchPanel from './SearchPanel';
import SidebarButton from '../components/SidebarButton';

import ss from '../styles/layout.module.css';
import classes from './Sidebar.module.css';

const Sidebar = ({ windowSize }) => {
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState('');
  const [searchPanel, setSearchPanel] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalState = useSelector(state => state.modalStore.modal);
  const userId = useSelector(state => state.userStore.user._id);
  const SidebarState = useSelector(state => state.sidebarStore.fullWidth);

  const hadnleCloseModal = () => {
    setOpenModal(modalState);
    dispatch(modalActions.closeModal());
  };

  const routeCheck = () => {
    if (size === 'x-small' || size === 'small') {
      navigate('/new-post');
    } else {
      dispatch(modalActions.openModal());
      navigate('/');
    }
  };

  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  useEffect(() => {
    if (modalState) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [modalState]);

  const handleNav = path => {
    navigate(path);
    setSearchPanel(false);
  };

  const handleSearchPanel = () => {
    setSearchPanel(!searchPanel);
    if (SidebarState) {
      dispatch(sidebarAction.close());
    } else {
      dispatch(sidebarAction.open());
    }
  };

  return (
    <div
      className={`${classes.main} ${ss.sb}`}
      style={{ width: `${SidebarState ? '' : 'var(--sidebar-width-close)'}` }}
    >
      <div className={classes.actions_wrapper_big}>
        <div className={classes.logo_section}></div>
        <div className={classes.action_section}>
          <SidebarButton
            compoenent={<Cottage fontSize='large' />}
            text={'Home'}
            onClick={() => handleNav('/')}
            path={''}
          />
          <SidebarButton
            compoenent={<Search fontSize='large' />}
            text={'Search'}
            onClick={handleSearchPanel}
          />

          <SidebarButton
            compoenent={<Explore fontSize='large' />}
            text={'Explore'}
            onClick={() => handleNav('/explore')}
            path={'explore'}
          />
          <SidebarButton
            compoenent={
              <Send fontSize='large' sx={{ transform: 'rotate(-45deg)' }} />
            }
            text={'Direct'}
            onClick={() => handleNav('/direct')}
            path={'direct'}
          />
          <SidebarButton
            compoenent={<FavoriteBorder fontSize='large' />}
            text={'Notifications'}
            // onClick={}
          />

          <SidebarButton
            compoenent={<AddBox fontSize='large' />}
            text={'Create'}
            onClick={routeCheck}
          />
          <SidebarButton
            compoenent={<Avatar sx={{ width: '40px', height: '40px' }} />}
            text={'Profile'}
            onClick={() => navigate(`/profile/${userId}`)}
            path={'profile'}
          />
        </div>
        <NewPost
          open={openModal}
          onClose={hadnleCloseModal}
          windowSize={size}
        />

        <SearchPanel
          openDrawer={searchPanel}
          windowSize={windowSize}
          isClosed={setSearchPanel}
        />
      </div>
      <div className={classes.actions_wrapper_mobile}>
        <SidebarButton
          compoenent={<Cottage fontSize='large' />}
          onClick={() => handleNav('/')}
        />
        <SidebarButton
          compoenent={<Explore fontSize='large' />}
          onClick={() => handleNav('/explore')}
        />
        <SidebarButton
          compoenent={<AddBox fontSize='large' />}
          //Add Create Component
          // onClick={''}
        />
        <SidebarButton
          compoenent={<FavoriteBorder fontSize='large' />}
          text={'Notifications'}
          // onClick={}
        />
        <SidebarButton
          compoenent={<Avatar sx={{ width: '40px', height: '40px' }} />}
          onClick={() => navigate(`/profile/${userId}`)}
        />
      </div>
    </div>
  );
};

export default memo(Sidebar);
