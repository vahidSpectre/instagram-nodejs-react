import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import UserSearchResult from '../components/UserSearchResult';
import { searchUsers } from '../services/api';
import { sidebarAction } from '../store/store';

import classes from './SearchPanel.module.css';
import { useLocation } from 'react-router-dom';
const SearchPanel = ({ openDrawer, isClosed, windowSize }) => {
  const [open, setOpen] = useState(false);
  const [userSearchParam, setUserSearchParam] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [errorText, setErrorText] = useState('');

  const searchInputRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation()

  const token = useSelector(state => state.tokenStore.token);

  useEffect(() => {
    if (openDrawer) {
      setOpen(true);
      dispatch(sidebarAction.close());
    } else {
      setOpen(false);
      resetSearch();
      if (location.pathname==='/direct') {
         dispatch(sidebarAction.close());
      } else {
        dispatch(sidebarAction.open());
      }
    }
  }, [openDrawer, searchInputRef]);

  const initial = {
    width: '0',
    border: 'none',
  };

  const panelSize = () => {
    if (windowSize === 'xl') return '30vw';
    if (windowSize === 'l') return '40vw';
    if (windowSize === 'm') return '50vw';
  };

  const animatePanel = () => {
    if (!open) {
      return;
    } else {
      return {
        width: panelSize(),
        borderRight: '1px solid var(--x29xchp)',
      };
    }
  };

  const animateBackdrop = () => {
    if (!open) {
      return;
    } else {
      return {
        width: '100vw',
      };
    }
  };

  const handleSeachUsers = async e => {
    e.preventDefault();
    const serverRes = await searchUsers(token, userSearchParam);
    if (!serverRes.response.ok) {
      return setErrorText(serverRes.result.message);
    }
    setFoundUsers(serverRes.result.users);
    setErrorText('');
  };

  const resetSearch = () => {
    searchInputRef.current.value = '';
    setErrorText('');
    setFoundUsers([]);
    // dispatch(sidebarAction.open())
  };

  return (
    <form>
      <motion.div
        initial={initial}
        animate={animateBackdrop}
        transition={{ ease: 'backIn', duration: 0.2, delay: 0.1 }}
        className={classes.backdrop}
        onClick={() => isClosed(false)}
      />
      <motion.div
        initial={initial}
        animate={animatePanel}
        className={classes.panel}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      >
        <span className={classes.panel_header}>
          <form action=''>
            <input
              type='text'
              onChange={e => setUserSearchParam(e.target.value)}
              ref={searchInputRef}
            />
            <button type='submit' onClick={handleSeachUsers}>
              seach
            </button>
          </form>
        </span>
        <span className={classes.panel_content}>
          {foundUsers.length > 0 && errorText === '' ? (
            foundUsers.map(user => {
              return (
                <UserSearchResult
                  user={user}
                  key={user._id}
                  isClosed={() => isClosed()}
                />
              );
            })
          ) : (
            <p style={{ color: 'white' }}>{errorText}</p>
          )}
        </span>
      </motion.div>
    </form>
  );
};

export default SearchPanel;
