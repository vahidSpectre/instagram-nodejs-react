import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import UserSearchResult from '../components/UserSearchResult';
import { searchUsers } from '../services/api';

import classes from './SearchPanel.module.css';
const SearchPanel = ({ openDrawer, isClosed, windowSize }) => {
  const [open, setOpen] = useState(false);
  const [userSearchParam, setUserSearchParam] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const token = useSelector(state => state.tokenStore.token);

  useEffect(() => {
    if (openDrawer) setOpen(true);
    else {
      setOpen(false);
    }
  }, [openDrawer]);

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

    if (serverRes.response?.ok) {
      setFoundUsers(serverRes.result.users);
      console.log(serverRes.result.users);
    }
  };

  return (
    <>
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
            />
            <button type='submit' onClick={handleSeachUsers}>
              seach
            </button>
          </form>
        </span>
        <span className={classes.panel_content}>
          {foundUsers.length > 0 &&
            foundUsers.map(user => {
              return <UserSearchResult user={user} key={user._id} />;
            })}
        </span>
      </motion.div>
    </>
  );
};

export default SearchPanel;
