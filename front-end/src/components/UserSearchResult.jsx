import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import classes from './UserSearchResult.module.css';
import Avatar from './Avatar';
const UserSearchResult = ({ user, isClosed }) => {
  const navigate = useNavigate();

  const gotToProfile = id => {
    navigate(`/profile/${id}`);
    isClosed(false);
  };

  return (
    <div className={classes.main} onClick={() => gotToProfile(user._id)}>
      <span className={classes.content}>
        <Avatar profileUrl={user.imageUrl} story={user.story} />
        <span className={classes.text_content}>
          <p className={classes.username}>{user.username}</p>
          <p className={classes.data}>{user.bio}</p>
        </span>
      </span>
    </div>
  );
};

export default UserSearchResult;
