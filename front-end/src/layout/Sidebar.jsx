import React, { useEffect, useState, memo } from 'react';
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

import { modalActions } from '../store/store';

import NewPost from '../components/NewPost';
import SearchPanel from './SearchPanel';
import SidebarButton from '../components/SidebarButton';

import { ReactComponent as inIcon } from '../assets/instagram-black-white.svg';

import ss from '../styles/layout.module.css';
import classes from './Sidebar.module.css';
import { Avatar } from '@mui/material';

const Sidebar = ({ windowSize }) => {
  const [openModal, setOpenModal] = useState(false);
  const [size, setSize] = useState('');
  const [searchPanel, setSearchPanel] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalState = useSelector(state => state.modalStore.modal);

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

  return (
    <div className={`${classes.main} ${ss.sb}`}>
      <div className={classes.actions_wrapper}>
        <div className={classes.logo_section}>
          {/* <SvgIcon component={inIcon} viewBox='0 0 35 35' /> */}
        </div>
        <div className={classes.action_section}>
          <SidebarButton
            compoenent={<Cottage fontSize='large' />}
            text={'Home'}
            onClick={() => handleNav('/')}
          />
          {size === 'm' || size === 'l' || size === 'xl' ? (
            <SidebarButton
              compoenent={<Search fontSize='large' />}
              text={'Search'}
              onClick={() => setSearchPanel(!searchPanel)}
            />
          ) : (
            ''
          )}
          <SidebarButton
            compoenent={<Explore fontSize='large' />}
            text={'Explore'}
            onClick={() => handleNav('/explore')}
          />
          {size === 'm' || size === 'l' || size === 'xl' ? (
            <>
              <SidebarButton
                compoenent={
                  <Send fontSize='large' sx={{ transform: 'rotate(-45deg)' }} />
                }
                text={'Direct'}
                onClick={() => handleNav('/direct')}
              />
              <SidebarButton
                compoenent={<FavoriteBorder fontSize='large' />}
                text={'Notifications'}
                // onClick={}
              />
            </>
          ) : (
            ''
          )}
          <SidebarButton
            compoenent={<AddBox fontSize='large' />}
            text={'Create'}
            onClick={routeCheck}
          />
          <SidebarButton
            compoenent={<Avatar sx={{width:'40px',height:'40px'}} story={true} />}
            text={'Profile'}
          />
        </div>
      </div>
      {/* <div className={classes.menu_section}>
        <Menu className={classes.menu} open={true } />
      </div> */}
      {size === 'm' || size === 'l' || size === 'xl' ? (
        <NewPost
          open={openModal}
          onClose={hadnleCloseModal}
          windowSize={size}
        />
      ) : (
        ''
      )}
      <SearchPanel
        openDrawer={searchPanel}
        windowSize={windowSize}
        isClosed={setSearchPanel}
      />
    </div>
  );
};

export default memo(Sidebar);
