import React, { useEffect } from 'react';

import classes from './UserSearchResult.module.css';
import Avatar from './Avatar';
const UserSearchResult = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={classes.main}>
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
