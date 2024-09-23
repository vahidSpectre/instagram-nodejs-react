import React, { useState } from 'react';

import classes from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import NewPost from '../components/NewPost';
const Sidebar = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const handleNav = path => {
    navigate(path);
  };

  const hadnleCloseModal = () => setOpenModal(false);

  return (
    <div className={classes.main}>
      <button onClick={() => handleNav('/')}>home</button>
      <button onClick={() => handleNav('/search')}>search</button>
      <button onClick={() => handleNav('/explore')}>explore</button>
      <button onClick={() => handleNav('/direct')}>direct</button>
      <button onClick={() => handleNav('/notifications')}>notifications</button>
      <button onClick={() => setOpenModal(true)}>create</button>
      <button onClick={() => handleNav('/profile')}>profile</button>
      <NewPost open={openModal} onClose={hadnleCloseModal} />
    </div>
  );
};

export default Sidebar;
